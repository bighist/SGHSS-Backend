const db = require("../database/db");

exports.create = async (req, res) => {
  try {
    const { paciente_id, data, descricao } = req.body; // Desestrutura os dados do corpo da requisição
    const [id] = await db("consultas").insert({ paciente_id, data, descricao }); // Insere nova consulta no banco
    res.status(201).json({ id, paciente_id, data, descricao }); // Retorna sucesso com os dados inseridos
  } catch (err) {
    res.status(400).json({ erro: err.message }); // Retorna erro caso algo dê errado
  }
};

exports.getAll = async (req, res) => {
  const consultas = await db("consultas").select("*"); // Busca todas as consultas
  res.json(consultas); // Retorna as consultas encontradas
};
