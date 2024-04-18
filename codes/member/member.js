// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


import firebaseConfig from "../fbconfig.js";


// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const myCollection = collection(db, "members");


const querySnapshot = await getDocs(myCollection)
querySnapshot.forEach(doc => {
    const teamname = doc.data().name
    const isTeam = doc.data().isTeam
    var teamList = $('.list')

    if(doc.data().isTeam==true)
    {
        var button = $('<button>').attr('type', 'button').addClass('teambtn').attr('val', teamname).text(teamname);
        teamList.append(button);
    }
})

const defaults = {
    mbti: 'null',
    techStack: 'null',
    intro: 'null',
    hobby: 'null',
    goodBad: 'null',
    coopStyle: 'null',
    oneWord: 'null',
    github: null,
    blog: null,
    email: null,
    photo: 'https://ifh.cc/g/DF0RCK.png'
}


const buttons = document.querySelectorAll('.teambtn')

buttons.forEach(button => {
    button.addEventListener('click', async () => {
        const value = button.textContent

        try {
            if (!querySnapshot.empty) {
                querySnapshot.forEach(doc => {
                    const data = doc.data()
                    if (data.name == value) {
                        //ᓚᘏᗢ
                        if (data.name == '정혜린') {
                            $('#dog').attr('src', 'https://ifh.cc/g/l91wKc.png')
                        } else {
                            $('#dog').attr('src', 'https://ifh.cc/g/0wNK7k.png')
                        }

                        const filledData = {
                            name: data.name,
                            mbti: data.mbti || defaults.mbti,
                            techStack: data.techStack || defaults.techStack,
                            intro: data.intro || defaults.intro,
                            hobby: data.hobby || defaults.hobby,
                            goodBad: data.goodBad || defaults.goodBad,
                            coopStyle: data.coopStyle || defaults.coopStyle,
                            oneWord: data.oneWord || defaults.oneWord,
                            github: data.github || null,
                            blog: data.blog || null,
                            email: data.email || null,
                            photo: data.photo || defaults.photo
                        }

                        $('#name').text(filledData.name)
                        $('#mbti').text(filledData.mbti)
                        $('#intro').text(filledData.intro)
                        $('#hobby').text(filledData.hobby)
                        $('#goodbad').text(filledData.goodBad)
                        $('#stack').text(filledData.techStack)
                        $('#coop').text(filledData.coopStyle)
                        $('#oneword').text(filledData.oneWord)

                        if (filledData.github) {
                            const githubUrlPattern = /^(https?:\/\/)/
                            const isExist = githubUrlPattern.test(filledData.github)

                            if (isExist) {
                                console.log("yes protocol")
                            } else {
                                console.log("no protocol")
                                if(filledData.github ="\0")
                                {
                                    filledData.github=null
                                }
                                else{
                                    filledData.github = "https://" + filledData.github
                                }
                            }
                        } else {
                            console.log("no data")
                        }

                        if (filledData.blog) {
                            const blogUrlPattern = /^(https?:\/\/)/
                            const isExist = blogUrlPattern.test(filledData.blog)

                            if (isExist) {
                                console.log("yes protocol")
                            } else {
                                console.log("no protocol")
                                if(filledData.blog.length==0)
                                {
                                    filledData.blog=null
                                }
                                else{
                                    filledData.blog = "https://" + filledData.blog
                                }
                            }
                        } else {
                            console.log("no data")
                        }

                        $('#github').attr('href', filledData.github)
                        $('#blog').attr('href', filledData.blog)

                        if (filledData.email) {
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            const isValidEmail = emailPattern.test(filledData.email)

                            if (isValidEmail) {
                                const emailLink = "mailto:" + filledData.email
                                $('#email').attr('href', emailLink)
                            } else {
                                console.log("not acceptable data")
                            }
                        } else {
                            console.log("no data")
                            filledData.email=null
                        }

                        $('#photo').attr('src', filledData.photo)

                    }

                })
            } else {
                console.log('data empty')
            }
        } catch (error) {
            console.error('get error', error)
        }
    })
})



// 쿠키 처리 -> 로그인 용 (code by : 유채우님)

function getCookie(cookieName) {
    let matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
            cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined
}

let usernameSignedIn = getCookie("user")

$("#signButton").text(
    typeof usernameSignedIn !== "undefined" && usernameSignedIn.length !== 0
        ? "로그아웃"
        : "로그인"
)

$("#signButton").click(async function () {
    if (
        typeof usernameSignedIn !== "undefined" &&
        usernameSignedIn.length !== 0
    ) {
        document.cookie = 'user=; expires=Thu, 01 Jan 1999 00:00:10 GMT; path=/';
        location.href = "../mainpage/mainpage.html";
    } else location.href = "../login/login.html";
})