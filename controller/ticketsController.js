const ticketModel = require('../models/ticket')

class TicketsController {
  listar(req, res) {
    ticketModel.listarTodos()
      .then(tickets => {
        res.status(200).render('index', { tickets });
      })
      .catch(erro => {
        console.log('Erro ao listar:', erro.message);
        res.status(500).send('Erro ao buscar tickets');
      });
  }

  mostrar(req, res) {
    const { codigo } = req.params;

    ticketModel.buscarPorCodigo(codigo)
      .then(ticket => {
        res.status(200).render('ticket', { ticket });
      })
      .catch(erro => {
        console.log('Erro ao buscar:', erro.message);
        res.status(400).send('Erro ao buscar ticket');
      });
  }

  criar(req, res) {
    const dados = req.body;

    ticketModel.criar(dados)
      .then(() => {
        res.status(201).render('sucessoCadastro');
      })
      .catch(erro => {
        console.log('Erro ao criar:', erro.message);
        res.status(400).send('Erro ao criar ticket');
      });
  }

  atualizar(req, res) {
    const { codigo } = req.params;
    const novosDados = req.body;

    ticketModel.atualizar(codigo, novosDados)
      .then(() => {
        res.status(200).render('sucessoAtualizar');
      })
      .catch(erro => {
        console.log('Erro ao atualizar:', erro.message);
        res.status(400).render('falhaAtualizar');
      });
  }

  remover(req, res) {
    const { codigo } = req.params;

    ticketModel.remover(codigo)
      .then(() => {
        res.status(200).render('sucessoRemover');
      })
      .catch(erro => {
        console.log('Erro ao remover:', erro.message);
        res.status(400).render('falhaRemover');
      });
  }
}

module.exports = new TicketsController();