

async function authorize() {
    window.location.href = "/login";
}

async function register() {

    let name = document.querySelector(".username").value
    let pass = document.querySelector(".password").value
    let conf = document.querySelector(".confirm_password").value
    let email = document.querySelector(".email").value

    let response = await fetch('/user/register', {
        method: 'POST',
        body: JSON.stringify({ name: name, email: email, password: pass, confirm: conf }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let result = await response.json();

    if (result.statusCode == 400) {
        document.querySelector(".password_alert").innerHTML = "Длина пароля > 8 символов.<br/>Пароль должен содержать 1 заглавную букву, 1 прописную и цифру.<br/>Пароли должны совпадать."
        document.querySelector(".username_alert").innerHTML = "Имя и email не должны быть пустыми"
    } else if (result.name_message) {
        document.querySelector(".username_alert").innerHTML = result.name_message;
    } else {
        let response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username: name, password: pass }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = "/";
    }
}
