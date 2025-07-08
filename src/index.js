const express = require("express");
const cors = require("cors");

const pacienteRoutes = require("./routes/pacientes");
const consultaRoutes = require("./routes/consultas");
const prontuarioRoutes = require("./routes/prontuarios");

const app = express();
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite parsing de JSON

// Define as rotas
app.use("/pacientes", pacienteRoutes);
app.use("/consultas", consultaRoutes);
app.use("/prontuarios", prontuarioRoutes);

// Inicia o servidor
app.listen(3007, () => console.log("Servidor rodando na porta 3007"));
