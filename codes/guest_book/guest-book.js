import {
  register,
  getGuestbook,
  next,
  deleteGuestbookItem,
  updateGuestbookItem,
} from "./firebase.js";

const selector = (element) => document.querySelector(element);
const guestbookTemplate = (id, author, content) => {
  selector(
    "#itemList"
  ).innerHTML += `<div class="item" id="${id}"><p class="author">${author}</p><img class="cancle" src="../../photos/cancle.svg" alt="${author}의 방명록 수정을 취소하는 아이콘"><img class="insert" src="../../photos/pencil.svg" alt="${author}의 방명록을 수정하는 아이콘"><img class="update" src="../../photos/send.svg" alt="${author}의 수정한 방명록을 등록하는 아이콘"><img class="delete" src="../../photos/trash.svg" alt="${author}의 방명록을 삭제하는 아이콘"><p class="content">${content}</p></div>`;
};
let isLoading = true;
let isCreateTextarea = false;
let prevContent;

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

window.addEventListener("DOMContentLoaded", async () => {
  const author = getCookie("user");

  if (author === undefined || author === "") {
    return (location.href = "../login/login.html");
  }

  selector("#author").innerText = author;

  const docs = await getGuestbook();

  docs.forEach((doc) => {
    const id = doc.id;
    const row = doc.data();

    guestbookTemplate(id, row["author"], row["content"]);
  });

  const deleteItems = document.querySelectorAll(".delete");
  deleteItems.forEach((item) => {
    item.addEventListener("click", async function () {
      const user = getCookie("user");
      const author = this.parentNode.childNodes[0].textContent;

      if (user !== author) {
        return alert("삭제 권한이 없습니다.");
      }

      const result = confirm("정말 삭제하시겠습니까?");

      if (result) {
        await deleteGuestbookItem(this.parentNode.id);

        window.location.reload();
      }
    });
  });

  const insertItems = document.querySelectorAll(".insert");
  insertItems.forEach((item) => {
    item.addEventListener("click", function () {
      const user = getCookie("user");
      const author = item.parentNode.firstChild.innerText;

      if (user !== author) {
        return alert("수정 권한이 없습니다.");
      }

      if (
        item.parentNode.lastChild.className === "content" &&
        isCreateTextarea === false
      ) {
        prevContent = item.parentNode.lastChild.textContent;

        item.parentNode.removeChild(item.parentNode.lastChild);

        item.previousSibling.style.display = "block";
        item.nextSibling.style.display = "block";
        item.style.display = "none";

        isCreateTextarea = true;

        const textBox = document.createElement("textarea");

        textBox.setAttribute("class", "content");
        textBox.setAttribute("cols", 30);
        textBox.setAttribute("rows", 10);
        textBox.innerText = prevContent;

        item.parentNode.appendChild(textBox);
      }
    });
  });
});

document.addEventListener("click", async (e) => {
  if (e.target.className === "update") {
    const content = e.target.parentNode.lastChild.value;
    const id = e.target.parentNode.id;

    if (content === "") {
      return alert("내용을 입력해주세요.");
    }

    if (prevContent === content) {
      return window.location.reload();
    }

    const data = {
      content: content,
    };

    await updateGuestbookItem(id, data);

    isCreateTextarea = false;

    window.location.reload();
  }

  if (e.target.className === "cancle") {
    e.target.style.display = "none";
    e.target.parentNode.childNodes[2].style.display = "block";
    e.target.parentNode.childNodes[3].style.display = "none";

    e.target.parentNode.removeChild(e.target.parentNode.lastChild);

    const pBox = document.createElement("p");

    pBox.setAttribute("class", "content");
    pBox.innerText = prevContent;

    e.target.parentNode.appendChild(pBox);

    isCreateTextarea = false;
  }
});

selector("#send").addEventListener("click", async (e) => {
  e.preventDefault();

  const currentDate = new Date();
  const formattedDateTime = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const doc = {
    author: selector("#author").innerText,
    content: selector("#content").value,
    createdAt: formattedDateTime,
  };

  if (doc.content === "") {
    return alert("내용을 입력해주세요.");
  }

  await register(doc);
  window.location.reload();
});

window.addEventListener("scroll", async function () {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.offsetHeight;

  if (scrollTop + 200 >= documentHeight - windowHeight && isLoading === true) {
    const docs = await next();

    isLoading = false;

    if (docs !== undefined) {
      docs.forEach((doc) => {
        let row = doc.data();

        guestbookTemplate(row["author"], row["content"]);
      });

      setTimeout(() => {
        isLoading = true;
      }, 1000);
    }
  }
});

let usernameSignedIn = getCookie("user");

$("#signButton").text(
  typeof usernameSignedIn !== "undefined" && usernameSignedIn.length !== 0
    ? "로그아웃"
    : "로그인"
);

$("#signButton").click(async function () {
  if (
    typeof usernameSignedIn !== "undefined" &&
    usernameSignedIn.length !== 0
  ) {
    document.cookie = "user=; Max-Age=-99999999" + "; path=/";
    location.href = "../mainpage/mainpage.html";
  } else location.href = "../login/login.html";
});
