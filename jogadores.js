let jogadores = JSON.parse(localStorage.getItem('ninja_players')) || [];
let editIndex = -1;

function atualizar() {
    localStorage.setItem('ninja_players', JSON.stringify(jogadores));
    listar();
}

function listar() {
    const lista = document.getElementById('lista');

    lista.innerHTML = jogadores.map((j, i) => `
        <li>
            <span>${j.nome}</span>
            <div class="acoes">
                <button class="btn-edit" onclick="editar(${i})">EDITAR</button>
                <button class="btn-del" onclick="remover(${i})">X</button>
            </div>
        </li>
    `).join('');
}

function salvarJogador() {
    const input = document.getElementById('nome');
    const btn = document.getElementById('btn-salvar');
    const nome = input.value.trim();

    if (!nome) return;

    if (editIndex < 0) jogadores.push({ nome });
    else {
        jogadores[editIndex].nome = nome;
        editIndex = -1;
        btn.innerText = '+';
    }

    input.value = '';
    atualizar();
}

function editar(i) {
    document.getElementById('nome').value = jogadores[i].nome;
    editIndex = i;
    document.getElementById('btn-salvar').innerText = 'OK';
}

function remover(i) {
    jogadores.splice(i, 1);
    atualizar();
}

listar();