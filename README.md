# VagaCerta

Este projeto é um sistema para gerenciar um estacionamento, permitindo o controle de carros estacionados, suas vagas e um histórico de veículos. O site possui um frontend desenvolvido em HTML, CSS e JavaScript, e um backend em Node.js com Express, utilizando um banco de dados MySQL para armazenamento das informações.

## Índice
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [Processo de Instalação e Configuração](#processo-de-instalacao-e-configuracao)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Design e Interface](#design-e-interface)
- [Endpoints da API](#endpoints-da-api)

## Requisitos Funcionais

- **Cadastro de veículos**: O sistema deve possuir um registro de informações dos veículos com placa, modelo, cor, marca, vaga estacionada e horário de entrada.
- **Gerenciamento de vagas**: O sistema deve haver um controle das vagas disponíveis e ocupadas, incluindo diferenciação entre vagas comuns e especiais.
- **Edição de registros**: O sistema deve permitir edição das informações dos veículos e das vagas.
- **Remoção de registros**: O sistema deve permitir remover registros de veículos e de vagas.
- **Histórico de veículos**: O sistema deve possuir um registro detalhado dos veículos que passaram pelo estacionamento.

## Requisitos Não Funcionais

- **Usuabilidade**: A experiência do usuário deve ser simples e intuitiva, facilitando a navegação e a interação com o sistema.
- **Desempenho**: O sistema deve ser rápido e ágil, sem apresentar qualquer tipo de lentidão ou atraso nas operações.
- **Portabilidade**: O sistema deve ser executável em diferentes sistemas operacionais, como Windows, Linux, macOS.

## Processo de Instalação e Configuração

1. Clone o repositório:
   ```sh
   git clone https://github.com/VictorSantosReis12/VagaCerta.git
   cd VagaCerta
   ```
2. Instale as dependências necessárias do backend:
   ```sh
   cd backend
   npm i
   ```
3. Configure o banco de dados MySQL utilizando o script disponível em `backend/db.sql`.
4. Ajuste as credenciais de conexão do banco de dados no arquivo `backend/src/db_config.js`.

## Como Usar

### Iniciar o Backend

```sh
cd backend
npm start
```

### Iniciar o Frontend

Abra o arquivo `index.html` no navegador.

## Estrutura do Projeto

```
/VagaCerta
├── frontend/
│   ├── CSS/
│   │   └── style.css
│   ├── HTML/
│   │   ├── index.html
│   │   ├── cadastro.html
│   │   └── historico.html
│   ├── JS/
│   │   ├── main.js
│   │   ├── cadastro.js
│   │   └── historico.js
├── backend/
│   ├── src/
│   │   ├── db_config.js
│   │   └── server.js
│   ├── db.sql
│   ├── package-lock.json
│   └── package.json
├── .gitignore
└── README.md
```

## Design e Interface

A interface do estacionamento foi criada no Figma.
[Figma - VagaCerta](https://www.figma.com/design/JeJvMOAHu2Hhyhy5KrSKwg/Sistema-de-Estacionamento-de-Carros?node-id=0-1&t=qszwYdrdWf30zl2r-1)

## Endpoints da API

### Veículos
- `POST /carro` – Cadastrar um novo carro no estacionamento.
- `GET /carro` – Listar todos os veículos cadastrados.
- `GET /carro/:id` – Requisitar um veículo pelo ID.
- `PUT /carro` – Atualizar informações de um carro.
- `DELETE /carro/:id` – Remover um carro do estacionamento pelo ID, movendo-o para o histórico.

### Vagas
- `POST /vaga` – Cadastrar uma nova vaga no estacionamento. Como não está disponível na interface, pode ser utilizada pelo Thunder Client.
- `GET /vaga/:setor` – Listar todas as vagas de um setor específico, junto com as informações dos carros estacionados em cada uma.
- `PUT /vaga` – Atualizar informações de uma vaga. Como não está disponível na interface, pode ser utilizada pelo Thunder Client.
- `PUT /vaga/status` – Atualizar o status de uma vaga, indicando se está ocupada ou livre.
- `DELETE /vaga/:id` – Remover uma vaga pelo ID. Como não está disponível na interface, pode ser utilizada pelo Thunder Client.

### Setor e Número
- `GET /vaga-setor` – Listar todos os setores disponíveis no estacionamento.
- `GET /vaga-numero` – Listar todos os números disponíveis no estacionamento, juntamente com a classificação dentre comum ou especial.
- `GET /verificar-vaga/:setor/:numero` – Obter o status e ID da vaga pelo setor e número.

### Histórico
- `POST /historico` – Cadastrar um carro no histórico.
- `GET /historico` – Listar todos os veículos cadastrados no histórico.
