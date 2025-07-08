const knex = require("knex");
const path = require("path");

const db = knex({
  client: "sqlite3", // Usa SQLite como banco de dados
  connection: {
    filename: path.resolve(__dirname, "sghss.sqlite"), // Caminho para o banco de dados
  },
  useNullAsDefault: true, // Usa NULL como valor padrão
});

(async () => {
  // Remove tabelas antigas
  await db.schema.dropTableIfExists("consultas");
  await db.schema.dropTableIfExists("prontuarios");
  await db.schema.dropTableIfExists("pacientes");

  // Cria tabela de pacientes
  await db.schema.createTable("pacientes", (table) => {
    table.increments("id").primary(); // ID auto-incremental
    table.string("nome");
    table.string("cpf");
    table.string("email").unique(); // Email único
    table.string("senha");
  });

  // Cria tabela de consultas
  await db.schema.createTable("consultas", (table) => {
    table.increments("id").primary();
    table
      .integer("paciente_id")
      .references("id")
      .inTable("pacientes")
      .onDelete("CASCADE"); // Relaciona paciente e remove consultas ao excluir paciente
    table.string("data");
    table.string("descricao");
  });

  // Cria tabela de prontuários
  await db.schema.createTable("prontuarios", (table) => {
    table.increments("id").primary();
    table
      .integer("paciente_id")
      .references("id")
      .inTable("pacientes")
      .onDelete("CASCADE"); // Relaciona paciente e remove prontuário ao excluir paciente
    table.string("anotacao");
  });
})();

module.exports = db;
