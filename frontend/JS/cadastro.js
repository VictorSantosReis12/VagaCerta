async function listarSetoresSelect () {
    const response = await fetch('http://localhost:3000/vaga-setor');
    const data = await response.json();
    const dropdown = document.getElementById("setor");
    
    data.data.forEach(vaga => {
        const opcao = document.createElement("option");
        opcao.textContent = `${vaga.setor}`;
        opcao.value = vaga.setor;
        dropdown.appendChild(opcao);
    });
};

listarSetoresSelect();

async function listarVagasSelect() {
    const response = await fetch('http://localhost:3000/vaga-numero');
    const data = await response.json();
    const dropdown = document.getElementById("vaga");
    const especial = document.getElementById("especial");

    dropdown.innerHTML = "<option value='' disabled selected>Selecione uma opção</option>";

    data.data.forEach(vaga => {
        dropdown.innerHTML += `<option value='${vaga.numero}' ${especial.checked != vaga.isEspecial ? "disabled" : ""}>${vaga.numero}</option>`;
    });
}

listarVagasSelect();
document.getElementById("especial").addEventListener("change", listarVagasSelect);

document.getElementById("form-carro").addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrarCarro();
});

async function cadastrarCarro() {
    const placaVeiculo = document.getElementById("placa").value.toUpperCase();
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const cor = document.getElementById("cor").value;
    const setor = document.getElementById("setor").value;
    const numero = parseInt(document.getElementById("vaga").value);
    const isEspecial = document.getElementById("especial").checked;

    const responseVaga = await fetch(`http://localhost:3000/verificar-vaga/${setor}/${numero}`);
    const resultVaga = await responseVaga.json();

    if (!resultVaga.success) {
        alert(resultVaga.message);
        return;
    };

    const idVaga = resultVaga.data[0]["idVaga"];

    const carro = {
        placaVeiculo,
        marca,
        modelo,
        cor,
        idVaga
    };
    
    const responseCadastro = await fetch("http://localhost:3000/carro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carro)
    });

    const resultCadastro = await responseCadastro.json();

    if (!resultCadastro.success) {
        alert(resultCadastro.message);
        return;
    }

    const isOcupada = true;

    const vaga = {
        setor,
        numero,
        isEspecial,
        isOcupada,
        idVaga
    };

    const responseOcupada = await fetch("http://localhost:3000/vaga", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vaga)
    });

    const resultOcupada = await responseOcupada.json();

    if (!resultOcupada.success) {
        alert(resultOcupada.message);
        return;
    };

    if (resultCadastro.success) {
        alert(resultCadastro.message);
        window.location.reload();
    } else {
        alert(resultCadastro.message);
    }
}