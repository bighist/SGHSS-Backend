const db = require("../database/db");

exports.create = async (req, res) => {
  try {
    const { paciente_id, anotacao } = req.body;
    const [id] = await db("prontuarios").insert({ paciente_id, anotacao });
    res.status(201).json({ id, paciente_id, anotacao });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.getAll = async (req, res) => {
  const prontuarios = await db("prontuarios").select("*");
  res.json(prontuarios);
};
