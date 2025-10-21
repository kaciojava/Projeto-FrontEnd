// ===== SISTEMA DE LOGIN E REGISTRO LOCAL =====

// Seleciona elementos
const loginCard = document.querySelector(".login-card");
const registerCard = document.querySelector(".register");
const openRegisterBtn = document.getElementById("openRegister");

// Mostrar tela de registro
if (openRegisterBtn) {
    openRegisterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginCard.hidden = true;
        registerCard.hidden = false;
    });
}

// Botão "Voltar" dentro da tela de registro
const backButtons = document.querySelectorAll(".register .back");
backButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        registerCard.hidden = true;
        loginCard.hidden = false;
    });
});

// Registrar nova conta
const registerForm = registerCard?.querySelector("form");
registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("new-email").value.trim();
    const password = document.getElementById("new-password").value.trim();

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Salva no localStorage
    const user = { email, password };
    localStorage.setItem("userData", JSON.stringify(user));

    alert("Conta criada com sucesso! Você já pode fazer login.");

    // Volta para o login
    registerCard.hidden = true;
    loginCard.hidden = false;
});

// Login
const loginForm = loginCard?.querySelector("form");
loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser) {
        alert("Nenhuma conta cadastrada. Crie uma antes de entrar.");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html"; // Redireciona para a página principal
    } else {
        alert("E-mail ou senha incorretos.");
    }
});

// Mantém usuário logado
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
        console.log("Usuário já logado");
    }
});

//LIGHT & DARK MODE
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.checked = false;
} else {
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function () {
    if (this.checked) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
});
// ===== CURSOR PERSONALIZADO =====
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
});

// Efeito de clique
document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
});
document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
});
