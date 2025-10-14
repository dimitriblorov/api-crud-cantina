const db = require("../db");

exports.getAll = (req, res) => {
  try {
    res.status(200).json(db.categorias);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar categorias", error: error.message });
  }
};

exports.getById = (req, res) => {
  try {
    const categoria = db.categorias.find(c => c.id === parseInt(req.params.id));
    if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar categoria", error: error.message });
  }
};

exports.create = (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) return res.status(400).json({ message: "Nome é obrigatório" });

    const nova = { id: db.idCategoria++, nome, descricao };
    db.categorias.push(nova);
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar categoria", error: error.message });
  }
};

exports.update = (req, res) => {
  try {
    const categoria = db.categorias.find(c => c.id === parseInt(req.params.id));
    if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });

    const { nome, descricao } = req.body;
    if (nome) categoria.nome = nome;
    if (descricao) categoria.descricao = descricao;

    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar categoria", error: error.message });
  }
};

exports.remove = (req, res) => {
  try {
    const index = db.categorias.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Categoria não encontrada" });

    db.categorias.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir categoria", error: error.message });
  }
};