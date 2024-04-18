if (0 < document.cookie.length) {
    alert("이미 로그인 된 상태입니다.\n메인화면으로 이동합니다.");
    location.href = '../mainpage/mainpage.html';
}

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import firebaseConfig from "../fbconfig.js";

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$('#signup_btn').click(async function () {
    let name = $('#signup_name').val();
    let id = $('#signup_user_id').val();
    let pass = $('#signup_password').val();
    let cpass = $('#cpass').val();

    if (0 == name.length || 0 == id.length || 0 == pass.length || 0 == cpass.length) {
        alert("모든 칸을 채워주세요.");
        return false;
    }

    if (pass != cpass) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return false;
    }
    let login_col = collection(db, "members");

    let user = await getDoc(doc(login_col, id));
    if (user.exists()) {
        alert("이미 존재하는 유저입니다.");
        return false;
    }

    let nowdoc = {
        'name': name,
        'pw': pass,
    };
    await setDoc(doc(login_col, id), nowdoc);

    alert("회원가입 완료!");
    location.reload();
});

$('#login_btn').click(async function () {
    let id = $('#login_user_id').val();
    let pass = $('#login_password').val();

    if (0 == id.length || 0 == pass.length) {
        alert("모든 칸을 채워주세요.");
        return false;
    }

    let login_col = collection(db, "members");

    let user = await getDoc(doc(login_col, id));
    if (false == user.exists()) {
        alert("아이디가 존재하지 않습니다.");
        return false;
    }

    if (pass != user.data()['pw']) {
        alert("비밀번호가 틀렸습니다.");
        return false;
    }

    alert("로그인 성공!");
    document.cookie = "user=" + id + "; path=/";
    location.assign('../mainpage/mainpage.html');
});

$('#findpass_btn').click(async function () {
    let id = $('#findpass_user_id').val();

    if (0 == id.length) {
        alert("모든 칸을 채워주세요.");
        return false;
    }

    let login_col = collection(db, "members");
    let user = await getDoc(doc(login_col, id));
    if (false == user.exists()) {
        alert("아이디가 존재하지 않습니다.");
        return false;
    }

    alert("비밀번호는 " + user.data()['pw'] + " 입니다.");
    location.reload();
});