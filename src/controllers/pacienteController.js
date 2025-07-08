const db = require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = "segredo123";

exports.signup = async (req, res) => {
  try {
    const { nome, cpf, email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 8); // Criptografa a senha
    const [id] = await db("pacientes").insert({ nome, cpf, email, senha: hash }); // Insere novo paciente
    res.status(201).json({ id, nome, email }); // Retorna dados do paciente inserido
  } catch (err) {
    res.status(400).json({ erro: err.message }); // Retorna erro
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await db("pacientes").where({ email }).first(); // Busca o usuário pelo email
    if (!user || !(await bcrypt.compare(senha, user.senha))) { // Verifica se a senha confere
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" }); // Gera token JWT
    res.json({ token }); // Retorna o token
  } catch (err) {
    res.status(500).json({ erro: err.message }); // Retorna erro
  }
};

exports.getAll = async (req, res) => {
  const pacientes = await db("pacientes").select("id", "nome", "cpf", "email"); // Busca todos os pacientes
  res.json(pacientes); // Retorna os pacientes
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db("pacientes").where({ id }).del(); // Exclui paciente
    res.json(
      deleted ? { message: "Paciente excluído com sucesso!" } : { erro: "Paciente não encontrado" }
    );
  } catch (err) {
    res.status(500).json({ erro: err.message }); // Retorna erro
  }
};
