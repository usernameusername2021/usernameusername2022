async function authorize() {
    let name = document.querySelector(".username").value
    let pass = document.querySelector(".password").value

    let response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username: name, password: pass }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let result = await response.json();

    if (result.authentificated) {
        window.location.href = "/";
    } else {
        console.log(result)
        document.querySelector(".password_alert").innerHTML = "Пользователя с таким именем или паролем не существует."
    }


}

async function register() {
    window.location.href = "/registration";
} 