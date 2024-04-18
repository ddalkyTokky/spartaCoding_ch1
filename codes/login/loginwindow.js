function labelUp(input) {
    input.parentElement.children[0].setAttribute("class", "change_label");
}

// call when focus out on input
function labelDown(input) {
    if (input.value.length === 0) {
        input.parentElement.children[0].classList.remove("change_label");
    }

}

// show & hide password
var eye_icon_signup = document.getElementById('eye_icon_signup');
var eye_icon_login = document.getElementById('eye_icon_login');
var eye_icon_signup_confirm = document.getElementById('eye_icon_signup_confirm');
var sign_up_password = document.getElementById("signup_password");
var login_password = document.getElementById("login_password");
var sign_up_confirm_password = document.getElementById("cpass");
eye_icon_signup.addEventListener('click', () => {
    hideAndShowPass(eye_icon_signup, signup_password);
});
eye_icon_login.addEventListener('click', () => {
    hideAndShowPass(eye_icon_login, login_password);
});
eye_icon_signup_confirm.addEventListener('click', () => {
    hideAndShowPass(eye_icon_signup_confirm, sign_up_confirm_password);
});

const hideAndShowPass = (eye_icon, password) => {
    if (eye_icon.classList.contains("fa-eye-slash")) {
        eye_icon.classList.remove('fa-eye-slash');
        eye_icon.classList.add('fa-eye');
        password.setAttribute('type', 'text');
    }
    else {
        eye_icon.classList.remove('fa-eye');
        eye_icon.classList.add('fa-eye-slash');
        password.setAttribute('type', 'password');
    }
};


// Sign Up & Sign In & find password
let signup_to_login = document.getElementById('signup_to_login');
let signup_to_findpass = document.getElementById('signup_to_findpass');
let login_to_signup = document.getElementById('login_to_signup');
let login_to_findpass = document.getElementById('login_to_findpass');
let findpass_to_login = document.getElementById('findpass_to_login');
let findpass_to_signup = document.getElementById('findpass_to_signup');
login_to_signup.addEventListener('click', function () {
    let_to_signup();
    login_clear();
});
findpass_to_signup.addEventListener('click', function () {
    let_to_signup();
    find_password_clear();
});
signup_to_login.addEventListener('click', function () {
    let_to_login();
    signup_clear();
});
findpass_to_login.addEventListener('click', function () {
    let_to_login();
    find_password_clear();
});
signup_to_findpass.addEventListener('click', function () {
    let_find_password();
    signup_clear();
});
login_to_findpass.addEventListener('click', function () {
    let_find_password();
    login_clear();
});

const let_to_login = () => {
    let login = document.getElementById('login');
    login.style.display = 'block';
    let signup = document.getElementById('signup');
    signup.style.display = 'none';
    let findpass = document.getElementById('findpass');
    findpass.style.display = 'none';
}

const let_to_signup = () => {
    let login = document.getElementById('login');
    login.style.display = 'none';
    let signup = document.getElementById('signup');
    signup.style.display = 'block';
    let findpass = document.getElementById('findpass');
    findpass.style.display = 'none';
}

const let_find_password = () => {
    let login = document.getElementById('login');
    login.style.display = 'none';
    let signup = document.getElementById('signup');
    signup.style.display = 'none';
    let findpass = document.getElementById('findpass');
    findpass.style.display = 'block';
}

let login_user_id = document.getElementById('login_user_id');
let signup_name = document.getElementById('signup_name');
let signup_user_id = document.getElementById('signup_user_id');
let find_password_user_id = document.getElementById('find_password_user_id');
const login_clear = () => {
    login_user_id.value = '';
    login_password.value = '';
    labelDown(login_user_id);
    labelDown(login_password);
}
const signup_clear = () => {
    signup_name.value = '';
    signup_user_id.value = '';
    signup_password.value = '';
    sign_up_confirm_password.value = '';
    labelDown(signup_name);
    labelDown(signup_user_id);
    labelDown(signup_password);
    labelDown(sign_up_confirm_password);
}

const find_password_clear = () => {
    find_password_user_id.value = '';
    labelDown(find_password_user_id);
}
