async function listarSetoresSelect () {
    const response = await fetch('http://localhost:3000/vaga-setor');
    const data = await response.json();
    const dropdown = document.getElementById("filtro-setor");

    const valorSelecionado = dropdown.value;

    dropdown.innerHTML = "";
    
    data.data.forEach(vaga => {
        const opcao = document.createElement("option");
        opcao.textContent = `Setor: ${vaga.setor}`;
        opcao.value = vaga.setor;
        opcao.classList.add("opcao");
        dropdown.appendChild(opcao);
    });

    for (let i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value === valorSelecionado) {
            dropdown.value = valorSelecionado;
            break;
        };
    };
};

async function listarVagas () {
    const setor = document.getElementById("filtro-setor").value;

    const response = await fetch(`http://localhost:3000/vaga/${setor}`);
    const data = await response.json();
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    
    data.data.forEach(vaga => {
        dataFormatada = null;
        if (vaga.dataEntrada != null) {
            const dataInsercao = new Date(vaga.dataEntrada);
            dataFormatada = dataInsercao.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }).replace(",", "");
        }
        
        const opcao = document.createElement("div");
        opcao.innerHTML = `
        <section class="informacoes">
                <div class="caixa">
                    <p>${vaga.setor}${vaga.numero}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p class="${vaga.isEspecial == 0 ? ' ' : 'especial'}">${vaga.isEspecial ? "Especial" : "Comum"}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p class="${vaga.isOcupada == 0 ? 'livre' : 'ocupada'}">${vaga.isOcupada ? "Ocupada" : "Livre"}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p>${vaga.placaVeiculo ?? "-"}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p>${vaga.marca ?? "-"}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p>${vaga.modelo ?? "-"}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p>${vaga.cor ?? "-"}</p>
                </div>
                <hr class="linha-vertical">
                <section class="horario">
                    <p>${dataFormatada == null ? "-" : dataFormatada.split(" ")[0]}</p>
                    <p>${dataFormatada == null ? "" : dataFormatada.split(" ")[1]}</p>
                </section>
                <hr class="linha-vertical">
                <section class="botoes">
                    <button class="botao-editar ${vaga.placaVeiculo == null ? 'desativado' : ''}" onclick="telaEditar(${vaga.idCarro}, ${vaga.idVaga}, '${vaga.setor}', ${vaga.numero}, ${vaga.isEspecial}, '${vaga.placaVeiculo}', '${vaga.marca}', '${vaga.modelo}', '${vaga.cor}')">Editar</button>
                    <button class="botao-excluir ${vaga.placaVeiculo == null ? 'desativado' : ''}" onclick="excluirCarro(${vaga.idCarro}, ${vaga.idVaga}, '${vaga.setor}', ${vaga.isEspecial}, ${vaga.numero}, '${vaga.placaVeiculo}', '${vaga.marca}', '${vaga.modelo}', '${vaga.cor}', '${vaga.dataEntrada}')">Excluir</button>
                </section>
            </section>
            <hr class="linha-horizontal">
        `;
        lista.appendChild(opcao);
    });
};

async function atualizarFiltro() {
    await listarSetoresSelect();
    await listarVagas();
}

document.getElementById("filtro-setor").addEventListener("change", () => {
    atualizarFiltro();
});

atualizarFiltro();

function telaEditar (idCarro, idVaga, setor, numero, isEspecial, placaVeiculo, marca, modelo, cor) {
    document.getElementById("editar-carro").style.display = "flex";
    document.getElementById("blur").style.display = "block";
    document.body.classList.add("no-scroll");

    document.getElementById("id-carro").value = idCarro;
    document.getElementById("id-vaga").value = idVaga;
    document.getElementById("placa-editar").value = placaVeiculo;
    document.getElementById("marca-editar").value = marca;
    document.getElementById("modelo-editar").value = modelo;
    document.getElementById("cor-editar").value = cor;
    document.getElementById("setor-editar").value = setor;
    document.getElementById("vaga-editar").value = numero;

    if (isEspecial) {
        document.getElementById("especial-editar").checked = true;

        const vagaSelect = document.getElementById("vaga-editar");

        vagaSelect.innerHTML = "";

        for (let i = 4; i <= 6; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            vagaSelect.appendChild(option);
        }
    } else {
        document.getElementById("especial-editar").checked = false;
    };
}

function fecharTelaEditar () {
    document.getElementById("editar-carro").style.display = "none";
    document.getElementById("blur").style.display = "none";
    document.body.classList.remove("no-scroll");
}

async function listarSetores () {
    const response = await fetch('http://localhost:3000/vaga-setor');
    const data = await response.json();
    const dropdown = document.getElementById("setor-editar");
    
    data.data.forEach(vaga => {
        const opcao = document.createElement("option");
        opcao.textContent = `${vaga.setor}`;
        opcao.value = vaga.setor;
        dropdown.appendChild(opcao);
    });
};

async function listarVagasSelect() {
    const response = await fetch('http://localhost:3000/vaga-numero');
    const data = await response.json();
    const dropdown = document.getElementById("vaga-editar");
    const especial = document.getElementById("especial-editar");

    dropdown.innerHTML = "<option value='' disabled>Selecione uma opção</option>";

    data.data.forEach(vaga => {
        dropdown.innerHTML += `<option value='${vaga.numero}' ${especial.checked != vaga.isEspecial ? "disabled" : ""}>${vaga.numero}</option>`;
    });
}

listarSetores();
listarVagasSelect();
document.getElementById("especial-editar").addEventListener("change", listarVagasSelect);

async function editarCarro () {
    const idCarro = document.getElementById("id-carro").value;
    const idVaga = document.getElementById("id-vaga").value;
    const placaVeiculo = document.getElementById("placa-editar").value.toUpperCase();
    const marca = document.getElementById("marca-editar").value;
    const modelo = document.getElementById("modelo-editar").value;
    const cor = document.getElementById("cor-editar").value;
    const setor = document.getElementById("setor-editar").value;
    const numero = document.getElementById("vaga-editar").value;

    const responseVaga = await fetch(`http://localhost:3000/verificar-vaga/${setor}/${numero}`);
    const resultVaga = await responseVaga.json();
    const idVagaNova = resultVaga.data[0]["idVaga"];

    const responseCarro = await fetch(`http://localhost:3000/carro/${idCarro}`);
    const resultCarro = await responseCarro.json();
    const idVagaCarro = resultCarro.data[0]["idVaga"];

    // Se o carro permanecer na mesma vaga, não contará como vaga já ocupada
    if (idVagaCarro != idVagaNova) {
        if (!resultVaga.success) {
            alert(resultVaga.message);
            return;
        };
    }

    if (idVaga != idVagaNova) {
        const vagaAntiga = {
            isOcupada: false,
            idVaga: idVaga
        };
        const responseVagaAntiga = await fetch("http://localhost:3000/vaga/status", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vagaAntiga)
        });
        const resultVagaAntiga = await responseVagaAntiga.json();
        if (!resultVagaAntiga.success) {
            alert(resultVagaAntiga.message);
            return;
        };

        const vagaNova = {
            isOcupada: true,
            idVaga: idVagaNova
        };
        const responseVagaNova = await fetch("http://localhost:3000/vaga/status", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vagaNova)
        });
        const resultVagaNova = await responseVagaNova.json();
        if (!resultVagaNova.success) {
            alert(resultVagaNova.message);
            return;
        };
    }

    const carro = {
        placaVeiculo,
        marca,
        modelo,
        cor,
        "idVaga": idVagaNova,
        idCarro
    };

    const responseEditarCarro = await fetch("http://localhost:3000/carro", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carro)
    });

    const resultEditarCarro = await responseEditarCarro.json();
    if (resultEditarCarro.success) {
        alert(resultEditarCarro.message);
        window.location.reload();
    } else {
        alert(resultEditarCarro.message);
    }
}

async function excluirCarro (idCarro, idVaga, setor, isEspecial, numero, placaVeiculo, marca, modelo, cor, dataEntrada) {
    const dataInsercao = new Date(dataEntrada);
    const dataFormatada = dataInsercao.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).replace(",", "");

    const [data, hora] = dataFormatada.split(" ");
    const [dia, mes, ano] = data.split("/");
    const dataFinal = `${ano}-${mes}-${dia} ${hora}`;

    const historico = {
        numero,
        setor,
        isEspecial,
        placaVeiculo,
        marca,
        modelo,
        cor,
        dataEntrada: dataFinal
    };
    
    const responseHistorico = await fetch("http://localhost:3000/historico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historico)
    });

    const resultHistorico = await responseHistorico.json();

    if (!resultHistorico.success) {
        alert(resultHistorico.message);
        return;
    };

    const responseExcluir = await fetch(`http://localhost:3000/carro/${idCarro}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });

    const resultExcluir = await responseExcluir.json();

    if (!resultExcluir.success) {
        alert(resultExcluir.message);
        return;
    };

    const isOcupada = false;

    const vaga = {
        setor,
        numero,
        isEspecial,
        isOcupada,
        idVaga
    };

    const responseOcupada = await fetch("http://localhost:3000/vaga", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(vaga)
    });

    const resultOcupada = await responseOcupada.json();

    if (resultOcupada.success) {
        alert(resultExcluir.message);
        window.location.reload();
    } else {
        alert(resultExcluir.message);
    }
};