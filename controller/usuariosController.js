const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario');

const segredo = 'chave muito segura';

class UsuariosController {
  cadastrar(req, res) {
    const novoUsuario = req.body;

    usuarioModel.criar(novoUsuario)
      .then(() => {
        res.status(201).send('Usuário cadastrado com sucesso!');
      })
      .catch(erro => {
        console.log('Erro ao cadastrar:', erro.message);
        res.status(400).send('Erro ao cadastrar usuário');
      });
  }

  login(req, res) {
    const { email, senha } = req.body;

    usuarioModel.autenticar(email, senha)
      .then(usuario => {
        const payload = { id: usuario.id, email: usuario.email };
        const token = jwt.sign(payload, SEGREDO, { expiresIn: '1h' });

        res.status(200).json({ mensagem: 'Login bem-sucedido!', token });
      })
      .catch(erro => {
        console.log('Erro ao autenticar:', erro);
        res.status(401).send('Credenciais inválidas');
      });
  }
}

module.exports = new UsuariosController();