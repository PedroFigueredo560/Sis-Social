import React, { useState, useEffect } from 'react';
import "./style.css";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

function App() {
  const [transacoes, setTransacoes] = useState([]); // Array to store financial transactions
  const [orcamentoInicial, setOrcamentoInicial] = useState(0); // Initial budget
  const [orcamentoRestante, setOrcamentoRestante] = useState(0); // Remaining budget
  const [totalGastos, setTotalGastos] = useState(0); // Total expenses

  // Function to fetch transactions from localStorage (optional)
  const buscarTransacoes = () => {
    const storedTransacoes = localStorage.getItem('transacoes');
    if (storedTransacoes) {
      setTransacoes(JSON.parse(storedTransacoes));
    }
  };

  // Function to save transactions to localStorage (optional)
  const salvarTransacoes = () => {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
  };

  // Function to calculate financial indicators
  const calcularIndicadores = () => {
    const novoOrcamentoRestante = orcamentoInicial - totalGastos;
    setOrcamentoRestante(novoOrcamentoRestante);
    setTotalGastos(novoOrcamentoRestante);
  };

  // Function to handle new transaction submission
  const handleNovaTransacao = (event) => {
    event.preventDefault();

    const novaTransacao = {
      data: event.target.data.value,
      descricao: event.target.descricao.value,
      categoria: event.target.categoria.value,
      valor: parseFloat(event.target.valor.value),
    };

    setTransacoes([...transacoes, novaTransacao]);
    salvarTransacoes();
    calcularIndicadores(); // Update indicators after new transaction

    // Clear the form after successful submission
    event.target.reset();
  };

  // Function to edit a transaction (optional)
  const handleEditarTransacao = (transacaoId) => {
    // Implement logic to edit a specific transaction
  };

  // Function to delete a transaction (optional)
  const handleExcluirTransacao = (transacaoId) => {
    // Implement logic to delete a specific transaction
  };

  // Function to generate reports (optional)
  const handleGerarRelatorio = () => {
    // Implement logic to generate reports in a preferred format (PDF, CSV, etc.)
  };

  // useEffect to fetch transactions on component mount
  useEffect(() => {
    buscarTransacoes();
  }, []);

  return (
    <div className="container">
      <h1>Sistema de Gestão Financeira</h1>

      <div className="resumo">
        <h2>Resumo Financeiro</h2>
        <p>Orçamento Inicial: R$ {orcamentoInicial.toFixed(2)}</p>
        <p>Orçamento Restante: R$ {orcamentoRestante.toFixed(2)}</p>
        <p>Total de Gastos: R$ {totalGastos.toFixed(2)}</p>
      </div>


      <div className="formularios">
        <h2>Novo Registro</h2>
        <form id="formNovaTransacao" onSubmit={handleNovaTransacao}>
          <label htmlFor="data">Data:</label>
          <input type="date" id="data" name="data" required />

          <label htmlFor="descricao">Descrição:</label>
          <input type="text" id="descricao" name="descricao" required />

<label htmlFor="categoria">Categoria:</label>
<select id="categoria" name="categoria" required>
  <option value="">Selecione...</option>
  <option value="receita">Receita</option>
  <option value="despesa">Despesa</option>
</select>

<label htmlFor="valor">Valor:</label>
<input type="number" id="valor" name="valor" required />

<button type="submit">Cadastrar</button>
</form>
</div>


<div className="tabela">
        <h2>Registros Financeiros</h2>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((transacao) => (
              <tr key={transacao.id}>
                <td>{transacao.data}</td>
                <td>{transacao.descricao}</td>
                <td>{transacao.categoria}</td>
                <td>{transacao.valor.toFixed(2)}</td>
                <td className="acoes-container">
                  <button onClick={() => handleEditarTransacao(transacao.id)}>
                    <AiFillEdit />
                  </button>
                </td>
                <td className="acoes-container">
                  <button onClick={() => handleExcluirTransacao(transacao.id)}>
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<div className="relatorios">
<h2>Relatórios</h2>
<button onClick={handleGerarRelatorio}>Gerar Relatório</button>
</div>
</div>
);

}

export default App;