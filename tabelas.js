class Tabela{
    init(conexao){
        this.conexao=conexao;
        this.criarTabela();
    }

    criarTabelaTickets(){
        const sql = `
            CREATE TABLE IF NOT EXISTS tickets(
            codigo INT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            descricao VARCHAR(255) NOT NULL,
            dataAbertura DATE NOT NULL,
            resolvido  BOOLEAN NOT NULL
            );`;

        this.conexao.query(sql,(erro)=>{
            if(erro){
                console.log(erro.message)
            }else{
                console.log('Tabela Criada')
            }
        })
    }
}
module.exports = new Tabela()

