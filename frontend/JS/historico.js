async function listarCarros () {
    const response = await fetch(`http://localhost:3000/historico`);
    const data = await response.json();
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    
    data.data.forEach(carro => {
        dataFormatadaEntrada = null;
        if (carro.dataEntrada != null) {
            const dataInsercaoEntrada = new Date(carro.dataEntrada);
            dataFormatadaEntrada = dataInsercaoEntrada.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }).replace(",", "");
        }

        dataFormatadaSaida = null;
        if (carro.dataSaida != null) {
            const dataInsercaoSaida = new Date(carro.dataSaida);
            dataFormatadaSaida = dataInsercaoSaida.toLocaleString("pt-BR", {
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
                    <p>${carro.placaVeiculo}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p>${carro.marca}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p>${carro.modelo}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p>${carro.cor}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p>${carro.setor}${carro.numero}</p>
                </div>
                <hr class="linha-vertical">
                <div class="caixa">
                    <p class="${carro.isEspecial == 0 ? ' ' : 'especial'}">${carro.isEspecial ? "Especial" : "Comum"}</p>
                </div>
                <hr class="linha-vertical">
                <section class="horario">
                    <p>${dataFormatadaEntrada.split(" ")[0]}</p>
                    <p>${dataFormatadaEntrada.split(" ")[1]}</p>
                </section>
                <hr class="linha-vertical">
                <section class="horario">
                    <p>${dataFormatadaSaida.split(" ")[0]}</p>
                    <p>${dataFormatadaSaida.split(" ")[1]}</p>
                </section>
            </section>
            <hr class="linha-horizontal">
        `;
        lista.appendChild(opcao);
    });
};

listarCarros();