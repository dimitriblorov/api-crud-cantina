const db = require("../db/database");

function criarCategoria(req, res) {
    const { nome, descricao } = req.body;
    const categoria = { id: db.idCategoria++, nome, descricao };
    db.categorias.push(categoria);
    res.status(201).json(categoria);
}

function listarCategorias(req, res) {
    res.json(db.categorias);
}

function buscarCategorias(req, res) {
    const categoria = db.categorias.find(c => c.id == req.params.id);
    if (!categoria) return res.status(404).json({ erro: "Categoria não encontrada!"});
    res.json(categoria);
}