const express = require("express");
const app = express();

app.use(express.json());

const categoriasRoutes = require("./routes/categoriasRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const vendaRoutes = require("./routes/vendaRoutes");

app.use("/categorias", categoriasRoutes);
app.use("/produto", produtoRoutes);
app.use("/venda", vendaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});