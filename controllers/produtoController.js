const db = require("../db");

exports.getAll = (req, res) => {
  try {
    res.status(200).json(db.produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar produtos", error: error.message });
  }
};

exports.getById = (req, res) => {
  try {
    const produto = db.produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto", error: error.message });
  }
};

exports.create = (req, res) => {
  try {
    const { nome, categoria, fornecedor, preco } = req.body;
    if (!nome || !categoria || !fornecedor || preco === undefined) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const novo = {
      id: db.idProduto++,
      nome,
      categoria,
      fornecedor,
      preco: parseFloat(preco)
    };

    db.produtos.push(novo);
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto", error: error.message });
  }
};

exports.update = (req, res) => {
  try {
    const produto = db.produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) return res.status(404).json({ message: "Produto não encontrado" });

    const { nome, categoria, fornecedor, preco } = req.body;
    if (nome) produto.nome = nome;
    if (categoria) produto.categoria = categoria;
    if (fornecedor) produto.fornecedor = fornecedor;
    if (preco !== undefined) produto.preco = parseFloat(preco);

    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto", error: error.message });
  }
};

exports.remove = (req, res) => {
  try {
    const index = db.produtos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Produto não encontrado" });

    db.produtos.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir produto", error: error.message });
  }
};