async function logout() {
    let response = await fetch('/logout', {
        method: 'GET',
    })
    let result = await response.json();

    if (result.logout) {
        window.location.href = "/";
    } else {
        console.log(result)
    }
}