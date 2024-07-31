import React, { useState, useEffect } from 'react';
import "./style.css";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import axios from "axios";
import Modal from 'react-modal';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

function App() {
  const [transacoes, setTransacoes] = useState([]); // Array to store financial transactions
  const [orcamentoMensal, setOrcamentoMensal] = useState(0); // Initial budget
  const [orcamentoRestante, setOrcamentoRestante] = useState(0); // Remaining budget
  const [totalGastos, setTotalGastos] = useState(0); // Total expenses
  const [isEditing, setIsEditing] = useState(false);
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

        // ... (seu código de filtragem por mês, se necessário)

        const totalEntradas = data.filter(t => t.categoria === 'receita').reduce((total, transacao) => total + transacao.valor, 0);
        const totalSaidas = data.filter(t => t.categoria === 'despesa').reduce((total, transacao) => total + transacao.valor, 0);
        const orcamentoRestante = orcamentoMensal - totalSaidas;

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

    // Atualizar o resumo a cada X segundos (ajuste o intervalo conforme necessário)
    const intervalId = setInterval(buscarResumo, 5000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  const handleGerarResumo = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/get_finac');
        const data = await response.json();

        // ... (seu código de filtragem por mês, se necessário)

        // Calcular os totais
        const totalEntradas = data.filter(t => t.categoria === 'receita').reduce((total, transacao) => total + transacao.valor, 0);
        const totalSaidas = data.filter(t => t.categoria === 'despesa').reduce((total, transacao) => total + transacao.valor, 0);
        const orcamentoRestante = orcamentoMensal - totalSaidas;

        // Atualizar o estado do resumo
        setResumo({
            totalEntradas,
            totalSaidas,
            orcamentoRestante
        });
    } catch (error) {
        // ... (tratamento de erros)
    }
};

  const buscarTransacoes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_finac', { // Replace with your actual backend API endpoint
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar transações');
      }
  
      const data = await response.json();
      setTransacoes(data); // Update state with fetched transactions
  
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // You can display an error message to the user here
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
        buscarTransacoes()
        event.target.reset();
      } else {
        console.error('Erro ao registrar transação:', response.data.error);
        setError('Erro ao registrar transação. Por favor, verifique os dados.');
      }
    } catch (error) {
      console.error('Erro ao registrar transação:', error);
      setError('Ocorreu um erro inesperado. Por favor, tente novamente.');
    }
  };

  const handleExcluirTransacao = async (transacaoId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete_finac`, {
        data: {
          id: transacaoId
        }
      });
  
      if (response.status === 200) {
        setTransacoes(transacoes.filter(transacao => transacao.id !== transacaoId));
        // Exibir mensagem de sucesso para o usuário (opcional)
        alert('Transação excluída com sucesso!');
      } else {
        console.error('Erro ao excluir transação:', response.data);
        // Exibir mensagem de erro para o usuário (opcional)
        alert('Ocorreu um erro ao excluir a transação. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      alert('Ocorreu um erro inesperado. Por favor, tente novamente.');
    }
  };
  const handleEditarTransacao = (transacaoId) => {
    // Encontrar a transação a ser editada no array de transações
    const transacao = transacoes.find(t => t.id === transacaoId);
  
    // Definir a transação como sendo editada
    setEditingTransaction(transacao);
  
    // Abrir o modal
    setIsModalOpen(true);
  };
  const handleSalvarEdicao = async (event) => {
    event.preventDefault();
  
    // Construir os dados a serem enviados para o backend
    const updatedTransaction = {
      id: editingTransaction.id,
      descricao: event.target.descricao.value,
      // Outros campos...
    };
  
    try {
      const response = await axios.put(
        `http://localhost:5000/update_finac/${editingTransaction.id}`,
        updatedTransaction,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // Atualizar o array de transações localmente
        setTransacoes(transacoes.map(t => t.id === editingTransaction.id ? updatedTransaction : t));
        setIsModalOpen(false);
        // Exibir mensagem de sucesso para o usuário
      } else {
        // Exibir mensagem de erro para o usuário
      }
    } catch (error) {
      // Exibir mensagem de erro para o usuário
    }
  };
  <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  contentLabel="Editar Transação"
>
  <h2>Editar Transação</h2>
  <form onSubmit={handleSalvarEdicao}>
    {/* Campos do formulário preenchidos com os dados da transação */}
    <label htmlFor="descricao">Descrição:</label>
    <input
      type="text"
      id="descricao"
      name="descricao"
      defaultValue={editingTransaction?.descricao}
      required
    />
    {/* Outros campos... */}
    <button type="submit">Salvar</button>
  </form>
</Modal>



  const handleGerarRelatorio = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_finac');
      const data = await response.json();
      console.log('Dados recebidos:', data);
      if (!data || !data.length) {
        console.error('Nenhum dado foi encontrado.');
        return;
      }
  
      const transacoes = data;
  
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Relatório Financeiro Completo', 14, 10);
  // Separar as transações em entradas e saídas
  const entradas = transacoes.filter(t => t.categoria === 'receita');
  const saidas = transacoes.filter(t => t.categoria === 'despesa');

  // Calcular o total de entradas e saídas
  const totalEntradas = entradas.reduce((total, transacao) => total + transacao.valor, 0);
  const totalSaidas = saidas.reduce((total, transacao) => total + transacao.valor, 0);

  autoTable(doc, {
    head: [['Data', 'Descrição', 'Categoria', 'Valor']],
    body: transacoes.map(transacao => [
        new Date(transacao.data).toLocaleDateString('pt-BR'),
        transacao.descricao,
        transacao.categoria,
        transacao.valor.toFixed(2)
    ])
});

// Adicionar uma linha com o total de entradas
doc.autoTable({
    body: [['', '', 'Total :', `R$ ${totalEntradas.toFixed(2)-totalSaidas.toFixed(2)}`]],
    startY: doc.lastAutoTable.finalY + 10
});

  // Criar a tabela de entradas
  autoTable(doc, {
      head: [['Data', 'Descrição', 'Categoria', 'Valor']],
      body: entradas.map(transacao => [
          new Date(transacao.data).toLocaleDateString('pt-BR'),
          transacao.descricao,
          transacao.categoria,
          transacao.valor.toFixed(2)
      ])
  });

  // Adicionar uma linha com o total de entradas
  doc.autoTable({
      body: [['', '', 'Total de Entradas:', `R$ ${totalEntradas.toFixed(2)}`]],
      startY: doc.lastAutoTable.finalY + 10
  });
  autoTable(doc, {
    head: [['Data', 'Descrição', 'Categoria', 'Valor']],
    body: saidas.map(transacao => [
        new Date(transacao.data).toLocaleDateString('pt-BR'),
        transacao.descricao,
        transacao.categoria,
        transacao.valor.toFixed(2)
    ])
});

doc.autoTable({
  body: [['', '', 'Total de Saidas:', `R$ ${totalSaidas.toFixed(2)}`]],
  startY: doc.lastAutoTable.finalY + 10
});

  doc.save('relatorio_completo.pdf');
} catch (error) {
  console.error('Erro ao gerar o relatório:', error);
  // Exibir uma mensagem de erro para o usuário
}
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
  <option value="Orçamento Mensal">Mensal</option>
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
                <td>{new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
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