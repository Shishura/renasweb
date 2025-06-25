const conexao = require('../conexao')

class Ticket{
    listarTodos(){
        const sql = 'SELECT * FROM tickets';

        return new Promise((resolve,reject)=>{
            conexao.query(sql,(erro,resultado)=>{
            if(erro){
                console.log('Erro ao buscar o tickets:',erro.message);
                reject(erro)
            }else{
                resolve(resultado);
            }
            });
        });
    };
    buscarPorCodigo(codigo) {
        const sql = 'SELECT * FROM tickets WHERE codigo = ?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [codigo], (erro, resultado) => {
                if (erro) return reject(erro);
                resolve(resultado[0]);
            });
        });
    }
    atualizar(codigo, novosDados) {
      const sql = 'UPDATE tickets SET ? WHERE codigo = ?';
      return new Promise((resolve, reject) => {
        conexao.query(sql, [novosDados, codigo], (erro, resultado) => {
          if (erro) return reject(erro);
          resolve(resultado);
        });
      });
    }
    remover(codigo) {
      const sql = 'DELETE FROM tickets WHERE codigo = ?';
      return new Promise((resolve, reject) => {
        conexao.query(sql, [codigo], (erro, resultado) => {
          if (erro) return reject(erro);
          resolve(resultado);
        });
      });
    }
}
module.exports = new  Ticket();