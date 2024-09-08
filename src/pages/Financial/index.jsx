import React, { useState, useEffect } from 'react';
import "./style.css";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import axios from "axios";
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function App() {
  const [transacoes, setTransacoes] = useState([]); // Array to store financial transactions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [resumo, setResumo] = useState({
    totalEntradas: 0,
    totalSaidas: 0,
    orcamentoRestante: 0
  });

  const getToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const buscarResumo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_finac');
        const data = await response.json();

        // Calcular o total de entradas e saídas
        const totalEntradas = data.filter(t => t.categoria === 'receita').reduce((total, transacao) => total + transacao.valor, 0);
        const totalSaidas = data.filter(t => t.categoria === 'despesa').reduce((total, transacao) => total + transacao.valor, 0);

        // Cálculo do orçamento restante: entradas - saídas
        const orcamentoRestante = totalEntradas - totalSaidas;

        setResumo({
          totalEntradas,
          totalSaidas,
          orcamentoRestante
        });
      } catch (error) {
        console.error('Erro ao buscar resumo:', error);
      }
    };

    buscarResumo(); // Chamar a função para buscar o resumo inicial

    const intervalId = setInterval(buscarResumo, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleGerarResumo = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_finac');
      const data = await response.json();

      // Calcular o total de entradas e saídas
      const totalEntradas = data.filter(t => t.categoria === 'receita').reduce((total, transacao) => total + transacao.valor, 0);
      const totalSaidas = data.filter(t => t.categoria === 'despesa').reduce((total, transacao) => total + transacao.valor, 0);

      // Cálculo do orçamento restante: entradas - saídas
      const orcamentoRestante = totalEntradas - totalSaidas;

      setResumo({
        totalEntradas,
        totalSaidas,
        orcamentoRestante
      });
    } catch (error) {
      console.error('Erro ao gerar resumo:', error);
    }
  };

  const buscarTransacoes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_finac', { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar transações');
      }

      const data = await response.json();
      setTransacoes(data);

    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleNovaTransacao = async (event) => {
    event.preventDefault();

    const token = getToken();

    const transactionData = {
      descricao: event.target.descricao.value.trim(),
      valor: parseFloat(event.target.valor.value),
      categoria: event.target.categoria.value,
      data_reg: event.target.data.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/create_finac",
        transactionData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log('Transação registrada com sucesso!');
        buscarTransacoes();
        event.target.reset();
      } else {
        console.error('Erro ao registrar transação:', response.data.error);
      }
    } catch (error) {
      console.error('Erro ao registrar transação:', error);
    }
  };

  const handleExcluirTransacao = async (transacaoId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete_finac`, {
        data: { id: transacaoId }
      });

      if (response.status === 200) {
        setTransacoes(transacoes.filter(transacao => transacao.id !== transacaoId));
        alert('Transação excluída com sucesso!');
      } else {
        console.error('Erro ao excluir transação:', response.data);
        alert('Ocorreu um erro ao excluir a transação. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      alert('Ocorreu um erro inesperado. Por favor, tente novamente.');
    }
  };

  const handleEditarTransacao = (transacaoId) => {
    const transacao = transacoes.find(t => t.id === transacaoId);
    setEditingTransaction(transacao);
    setIsModalOpen(true);
  };

  const handleSalvarEdicao = async (event) => {
    event.preventDefault();

    const updatedTransaction = {
      id: editingTransaction.id,
      descricao: event.target.descricao.value,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/update_finac/${editingTransaction.id}`,
        updatedTransaction,
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`,
          },
        }
      );

      if (response.status === 200) {
        setTransacoes(transacoes.map(t => t.id === editingTransaction.id ? updatedTransaction : t));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
    }
  };

  const handleGerarRelatorio = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_finac');
      const data = await response.json();
  
      const transacoes = data;
  
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Relatório Financeiro Completo', 14, 10);
  
      const entradas = transacoes.filter(t => t.categoria === 'receita');
      const saidas = transacoes.filter(t => t.categoria === 'despesa');
  
      const totalEntradas = entradas.reduce((total, transacao) => total + transacao.valor, 0);
      const totalSaidas = saidas.reduce((total, transacao) => total + transacao.valor, 0);
  
      autoTable(doc, {
        head: [['Data', 'Descrição', 'Categoria', 'Valor']],
        body: transacoes.map(transacao => [
          transacao.data_reg ? new Date(transacao.data_reg).toLocaleDateString('pt-BR') : 'Data inválida',
          transacao.descricao,
          transacao.categoria,
          transacao.valor.toFixed(2)
        ])
      });
  
      doc.autoTable({
        body: [['', '', 'Total de Entradas:', `R$ ${totalEntradas.toFixed(2)}`]],
        startY: doc.lastAutoTable.finalY + 10
      });
  
      doc.autoTable({
        body: [['', '', 'Total de Saídas:', `R$ ${totalSaidas.toFixed(2)}`]],
        startY: doc.lastAutoTable.finalY + 10
      });
  
      doc.autoTable({
        body: [['', '', 'Orçamento Restante:', `R$ ${(totalEntradas - totalSaidas).toFixed(2)}`]],
        startY: doc.lastAutoTable.finalY + 10
      });
  
      doc.save('relatorio_completo.pdf');
    } catch (error) {
      console.error('Erro ao gerar o relatório:', error);
    }
  };

  useEffect(() => {
    buscarTransacoes();
  }, []);

  return (
    <div className="container">
      <h1>Sistema de Gestão Financeira</h1>

      <div className="resumo">
        <h2>Resumo Financeiro</h2>
        <p>Total de Entradas: R$ {resumo.totalEntradas.toFixed(2)}</p>
        <p>Total de Saídas: R$ {resumo.totalSaidas.toFixed(2)}</p>
        <p>Orçamento Restante: R$ {resumo.orcamentoRestante.toFixed(2)}</p>
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
                <td>{transacao.data_reg ? new Date(transacao.data_reg).toLocaleDateString('pt-BR') : 'Data inválida'}</td>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Transação"
      >
        <h2>Editar Transação</h2>
        <form onSubmit={handleSalvarEdicao}>
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            defaultValue={editingTransaction?.descricao}
            required
          />
          <button type="submit">Salvar</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;