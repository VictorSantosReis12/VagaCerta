const express = require("express");
const cors = require("cors");

const connection = require("./db_config");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

// Hello, world!

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Rotas Carro

// POST
app.post("/carro", (req, res) => {
    const { placaVeiculo, marca, modelo, cor, idVaga } = req.body;

    const params = [
        placaVeiculo, 
        marca,
        modelo,
        cor,
        idVaga
    ];

    const query = "INSERT INTO Carros (placaVeiculo, marca, modelo, cor, idVaga) VALUES (?, ?, ?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if (err) {
            res.status(500).json({success: false, message: "Erro no servidor.", data: err});
        } else {
            res.json({success: true, message: "Carro cadastrado com sucesso.", data: results});
        }
    });
});

// GET
app.get("/carro", (req, res) => {
    const query = "SELECT * FROM Carros";

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: "Erro no servidor."});
        };

        if (results.length > 0) {
            res.json({success: true, message: "Carros selecionados com sucesso.", data: results});
        }
    });
});

app.get("/carro/:id", (req, res) => {
    const id = req.params.id;

    const query = "SELECT * FROM Carros WHERE idCarro = ?";

    const params = [id];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: "Erro no servidor."});
        };

        if (results.length > 0) {
            res.json({success: true, message: "Carro selecionado com sucesso.", data: results});
        }
    });
});

// PUT
app.put("/carro", (req, res) => {
    const { placaVeiculo, marca, modelo, cor, idVaga, idCarro } = req.body;

    const params = [
        placaVeiculo, 
        marca,
        modelo,
        cor,
        idVaga,
        idCarro
    ];

    const query = "UPDATE Carros SET placaVeiculo = ?, marca = ?, modelo = ?, cor = ?, idVaga = ? WHERE idCarro = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: "Erro no servidor."});
        } else {
            res.json({success: true, message: "Carro alterado com sucesso.", data: results});
        }
    });
});

// DELETE
app.delete("/carro/:id", (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM Carros WHERE idCarro = ?";

    const params = [id];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: "Erro no servidor."});
        } else {
            res.json({success: true, message: "Carro excluído com sucesso.", data: results});
        }
    });
});

// Rotas Vaga

// POST
app.post("/vaga", (req, res) => {
    const { setor, numero, isEspecial } = req.body;

    if (!setor || !numero) {
        res.status(400).json({ success: false, message: "Setor e numeração são obrigatórios." });
        return;
    }

    const params = [setor, numero, isEspecial, false]; // false pois a vaga não é ocupada

    const query = "INSERT INTO Vagas (setor, numero, isEspecial, isOcupada) VALUES (?, ?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: "Erro no servidor.", data: err });
        } else {
            res.json({ success: true, message: "Vaga cadastrada com sucesso.", data: results });
        }
    });
});


// GET
app.get("/vaga/:setor", (req, res) => {
    const { setor } = req.params;

    const query = "SELECT * FROM Vagas v LEFT JOIN Carros c ON c.idVaga = v.idVaga WHERE v.setor = ?";

    connection.query(query, [setor], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: "Erro no servidor.", data: err });
        } else {
            res.json({ success: true, message: "Vaga filtrada com sucesso.", data: results });
        }
    });
});

// PUT
app.put("/vaga", (req, res) => {
    const { setor, numero, isEspecial, isOcupada, idVaga } = req.body;

    const params = [
        setor,
        numero,
        isEspecial,
        isOcupada,
        idVaga
    ];

    const query = "UPDATE Vagas SET setor = ?, numero = ?, isEspecial = ?, isOcupada = ? WHERE idVaga = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: "Erro no servidor."});
        } else {
            res.json({success: true, message: "Vaga alterada com sucesso.", data: results});
        }
    });
});

app.put("/vaga/status", (req, res) => {
    const { isOcupada, idVaga } = req.body;

    const params = [
        isOcupada,
        idVaga
    ];

    const query = "UPDATE Vagas SET isOcupada = ? WHERE idVaga = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: "Erro no servidor."});
        } else {
            res.json({success: true, message: "Status da vaga alterada com sucesso.", data: results});
        }
    });
});

// DELETE
app.delete("/vaga/:id", (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM Vagas WHERE idVaga = ?";

    const params = [id];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: "Erro no servidor."});
        } else {
            res.json({success: true, message: "Vaga excluída com sucesso.", data: results});
        }
    });
});

// Rotas Setor e Número

// GET

app.get("/vaga-setor", (req, res) => {
    const query = "SELECT DISTINCT setor FROM Vagas";

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: "Erro no servidor.", data: err });
        } else {
            res.json({ success: true, message: "Setores carregados com sucesso.", data: results });
        }
    });
});

app.get("/vaga-numero", (req, res) => {
    const query = "SELECT DISTINCT numero, isEspecial FROM Vagas";

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: "Erro no servidor.", data: err });
        } else {
            res.json({ success: true, message: "Números carregados com sucesso.", data: results });
        }
    });
});

app.get("/verificar-vaga/:setor/:numero", (req, res) => {
    const { setor, numero } = req.params;

    const query = "SELECT isOcupada, idVaga FROM Vagas WHERE setor = ? AND numero = ?";

    connection.query(query, [setor, numero], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Erro no servidor.", data: err });
        }

        if (results.length > 0) {
            const isOcupada = results[0].isOcupada;
            
            if (isOcupada) {
                return res.json({ success: false, message: "Vaga já está ocupada.", data: results });
            } else {
                return res.json({ success: true, message: "Vaga disponível.", data: results });
            }
        } else {
            return res.status(404).json({ success: false, message: "Vaga não encontrada." });
        }
    });
});

// Rotas Histórico

//POST
app.post("/historico", (req, res) => {
    const { numero, setor, isEspecial, placaVeiculo, marca, modelo, cor, dataEntrada } = req.body;

    const params = [
        numero,
        setor,
        isEspecial,
        placaVeiculo, 
        marca,
        modelo,
        cor,
        dataEntrada
    ];

    const query = "INSERT INTO Historico (numero, setor, isEspecial, placaVeiculo, marca, modelo, cor, dataEntrada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if (err) {
            res.status(500).json({success: false, message: "Erro no servidor.", data: err});
        } else {
            res.json({success: true, message: "Carro cadastrado no histórico com sucesso.", data: results});
        }
    });
});

//GET
app.get("/historico", (req, res) => {
    const query = "SELECT * FROM Historico";

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: "Erro no servidor."});
        };

        if (results.length > 0) {
            res.json({success: true, message: "Carros do histórico selecionados com sucesso.", data: results});
        }
    });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));