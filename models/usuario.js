const conexao = require('../conexao');
const bcrypt = require('bcryptjs');

class Usuario {
  criar(usuario) {
    return new Promise(async (resolve, reject) => {
      try {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
        const sql = 'INSERT INTO usuarios SET ?';
        conexao.query(sql, usuario, (erro, resultado) => {
          if (erro) return reject(erro);
          resolve(resultado);
        });
      } catch (erro) {
        reject(erro);
      }
    });
  }

  autenticar(email, senha) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM usuarios WHERE email = ?';
      conexao.query(sql, [email], async (erro, resultados) => {
        if (erro) return reject(erro);
        if (resultados.length === 0) return reject('Usuário não encontrado');

        const usuario = resultados[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return reject('Senha inválida');

        resolve(usuario);
      });
    });
  }
}

module.exports = new Usuario();