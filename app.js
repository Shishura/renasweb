const API_URL = 'http://localhost:3000';

const loginSection = document.getElementById('login-section');
const ticketsSection = document.getElementById('tickets-section');
const ticketsList = document.getElementById('ticket-list');
const loginMessage = document.getElementById('login-message');
const ticketsMessage = document.getElementById('ticket-message');
const registerMessage = document.getElementById('register-message');

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.auth && data.token) {
            localStorage.setItem('token', data.token);
            loginSection.style.display = 'none';
            ticketsSection.style.display = 'block';
            await loadTickets();
        } else {
            loginMessage.textContent = 'Login falhou.';
        }
    } catch (error) {
        loginMessage.textContent = error.message;
    }
}

async function register() {
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            registerMessage.textContent = "Usuário cadastrado com sucesso!";
        } else {
            registerMessage.textContent = data.message || "Erro ao cadastrar.";
        }
    } catch (error) {
        registerMessage.textContent = error.message;
    }
}

function logout() {
    localStorage.removeItem('token');
    ticketsSection.style.display = 'none';
    loginSection.style.display = 'block';
}

async function loadTickets() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/tickets`, {
            method: 'GET',
            headers: {
                'x-auth-token': `${token}`
            },
        });
        const tickets = await response.json();
        ticketsList.innerHTML = '';
        tickets.forEach(ticket => {
            const li = document.createElement('li');
            li.textContent = `Titulo: ${ticket.titulo}, Descrição: ${ticket.descricao}, Data de abertura: ${ticket.dataABertura}, Resolvido: ${ticket.resolvido}`;
            ticketsList.appendChild(li);
        });
    } catch (error) {
        ticketsMessage.textContent = error.message;
    }
}

async function addTicket() {
    const token = localStorage.getItem('token');
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const resolved = document.getElementById('resolved').checked;

    try {
        const response = await fetch(`${API_URL}/tickets/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${token}`
            },
            body: JSON.stringify({
                titulo: title,
                descricao: description,
                dataABertura: date,
                resolvido: resolved
            })
        });

        const ticket = await response.json();
        ticketsMessage.textContent = `Ticket adicionado: ${ticket.titulo}`;
        await loadTickets();
    } catch (error) {
        ticketsMessage.textContent = error.message;
    }
}
