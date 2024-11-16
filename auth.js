document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    localStorage.setItem(username, JSON.stringify({ password }));
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem(username));
    if (user && user.password === password) {
        alert('Login bem-sucedido!');
        window.location.href = 'main.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
});