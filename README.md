
# SGHSS - Backend

**Sistema de Gestão Hospitalar e de Serviços de Saúde (SGHSS)**  
Projeto da Trilha Back-end 

## 🔧 Tecnologias Utilizadas

- Node.js
- Express
- SQLite (via Knex.js)
- JWT para autenticação
- Bcrypt para hash de senhas

---

## 🚀 Como Rodar o Projeto

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Rode o servidor**
   ```bash
   npm start
   ```

3. Acesse a API em:
   ```
   http://localhost:3000
   ```

   Ou, se estiver usando o Replit:
   ```
   https://sghss-backend.<seu-usuário>.repl.co
   ```

---

## 📌 Estrutura do Banco de Dados

O banco de dados `sghss.sqlite` será criado automaticamente com três tabelas:

- **pacientes**
- **consultas**
- **prontuarios**

As tabelas estão relacionadas por `paciente_id`, com *onDelete: CASCADE* para manter integridade referencial.

---

## 📮 Documentação de Endpoints

### 🧍‍♂️ Pacientes

#### POST `/pacientes/signup`  
Cadastrar um novo paciente

- **Body JSON:**
```json
{
  "nome": "João da Silva",
  "cpf": "12345678900",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

- **Resposta:**
```json
{
  "id": 1,
  "nome": "João da Silva",
  "email": "joao@email.com"
}
```

---

#### POST `/pacientes/login`  
Autenticar paciente e retornar token JWT

- **Body JSON:**
```json
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

- **Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

#### GET `/pacientes`  
Listar todos os pacientes

- **Resposta:**
```json
[
  {
    "id": 1,
    "nome": "João da Silva",
    "cpf": "12345678900",
    "email": "joao@email.com"
  }
]
```

---

#### DELETE `/pacientes/:id`  
Excluir paciente por ID

- **Resposta:**
```json
{
  "message": "Paciente excluído com sucesso!"
}
```

---

### 📅 Consultas

#### POST `/consultas`  
Agendar uma nova consulta

- **Body JSON:**
```json
{
  "paciente_id": 1,
  "data": "2025-07-10",
  "descricao": "Consulta de rotina"
}
```

- **Resposta:**
```json
{
  "id": 1,
  "paciente_id": 1,
  "data": "2025-07-10",
  "descricao": "Consulta de rotina"
}
```

---

#### GET `/consultas`  
Listar todas as consultas

- **Resposta:**
```json
[
  {
    "id": 1,
    "paciente_id": 1,
    "data": "2025-07-10",
    "descricao": "Consulta de rotina"
  }
]
```

---

### 📋 Prontuários

#### POST `/prontuarios`  
Criar novo prontuário

- **Body JSON:**
```json
{
  "paciente_id": 1,
  "anotacao": "Paciente com sintomas de gripe."
}
```

- **Resposta:**
```json
{
  "id": 1,
  "paciente_id": 1,
  "anotacao": "Paciente com sintomas de gripe."
}
```

---

#### GET `/prontuarios`  
Listar todos os prontuários

- **Resposta:**
```json
[
  {
    "id": 1,
    "paciente_id": 1,
    "anotacao": "Paciente com sintomas de gripe."
  }
]
```

---

## 📂 Organização do Projeto

```
├── controllers/
│   ├── pacientes.js
│   ├── consultas.js
│   └── prontuarios.js
├── database/
│   └── db.js
├── index.js
├── package.json
└── README.md
```

---

## 📌 Observações

- O projeto está configurado para rodar com SQLite, ideal para testes locais sem necessidade de servidor de banco externo.
- O token JWT gerado deve ser utilizado em rotas protegidas (exemplo futuro).
- Todas as tabelas usam integridade referencial com `onDelete("CASCADE")`.

---

## 📚 Referências

- [Documentação oficial do Node.js](https://nodejs.org/en/docs)
- [Express.js](https://expressjs.com/)
- [Knex.js](https://knexjs.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- [JSON Web Tokens](https://jwt.io/)
