import React, { useState, useEffect } from "react";
import axios from "axios";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "./style.css";

const Appointments = () => {
  // Estados para o formulário de agendamento
  const [appointmentType, setAppointmentType] = useState("presencial");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [appointments, setAppointments] = useState([]);

  // Estados para as preferências de notificação
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
  });

  // Função para buscar horários disponíveis (mockado)
  const fetchAvailableSlots = async (selectedDate) => {
    setAvailableSlots(["09:00", "10:00", "11:00", "14:00", "15:00"]);
  };

  // agendar atendimento
  const bookAppointment = async (appointmentDetails) => {
    try {
      await axios.post(
        "http://localhost:5000/appointments",
        appointmentDetails
      );
      return true;
    } catch (error) {
      console.error("Erro ao agendar atendimento:", error);
      return false;
    }
  };

  //buscar agendamentos
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };

  //cancelar agendamento
  const cancelAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      return true;
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
      return false;
    }
  };

  //carregar agendamentos na montagem do componente
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Efeito para buscar horários disponíveis quando a data muda
  useEffect(() => {
    if (date) {
      fetchAvailableSlots(date);
    }
  }, [date]);

  // Manipuladores de eventos
  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentDetails = {
      appointmentType,
      date,
      time,
      contactPhone,
      contactEmail,
      name,
      description,
      preferences, // Adicionando preferências de notificação ao envio
    };
    const result = await bookAppointment(appointmentDetails);
    if (result) {
      alert("Agendamento realizado com sucesso!");
      fetchAppointments(); // Atualizar lista de agendamentos após o agendamento
    } else {
      alert("Falha ao realizar agendamento.");
    }
  };

  const handleCancel = async (id) => {
    const result = await cancelAppointment(id);
    if (result) {
      setAppointments(appointments.filter((app) => app.id !== id));
      alert("Agendamento cancelado com sucesso.");
    } else {
      alert("Falha ao cancelar agendamento.");
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  return (
    <>
     <h1>Agendamentos</h1>
      <section className="appointments-container">
        <section className="cards-grid">
          <div className="card">
            <div className="card-header">
              <h2>01</h2>
              <p>ESCOLHA</p>
            </div>
            <div className="card-body">
              <h3>Escolha o Tipo de Atendimento</h3>
              <p>
                Escolha se deseja realizar o atendimento com o assistente social
                online ou presencial.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2>02</h2>
              <p>AGENDAMENTO</p>
            </div>
            <div className="card-body">
              <h3>Escolha o Horário</h3>
              <p>
                Selecione o horário disponivél que melhor se adapta à sua agenda.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2>03</h2>
              <p>CONFIRMAÇÃO</p>
            </div>
            <div className="card-body">
              <h3>Confirme Seus Dados</h3>
              <p>
                Revise as informações fornecidas e confirme seu agendamento.
              </p>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="header-section">
            <h2>Novo Agendamento</h2>
          </div>
          <label>
            Tipo de Atendimento:
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
            >
              <option value="presencial">Presencial</option>
              <option value="online">Online</option>
            </select>
          </label>

          <label>
            Nome completo:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Telefone:
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
            />
          </label>

          <label>
            E-mail:
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Data:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label>
            Horário:
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>

          <label>
            Descrição:
            <textarea
              rows={4}
              cols={40}
              name="postContent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o motivo do atendimento, se necessário."
            />
          </label>

          {/* Seção de Preferências de Notificação */}
          <div className="preferences-section">
            <div className="header-section">
              <h2>Preferencias</h2>
              <p>Selecione a forma como deseja ser avisado um dia antes da data agendada.</p>
            </div>
            <div className="toggle-container">
              <label>
                E-mail
                <Toggle
                  checked={preferences.email}
                  onChange={handleNotificationChange}
                  name="email"
                />
              </label>
              <label>
                SMS
                <Toggle
                  checked={preferences.sms}
                  onChange={handleNotificationChange}
                  name="sms"
                />
              </label>
            </div>
          </div>

          <button type="submit">Agendar</button>
        </form>

        {/* Lista de Agendamentos */}
        <div className="appointment-list">
          <div className="header-section">
            <h2>Meus Agendamentos</h2>
          </div>
          <ul>
            {appointments.map((app) => (
              <li key={app.id}>
                {app.date} - {app.time} ({app.appointmentType})
                <button onClick={() => handleCancel(app.id)}>Cancelar</button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Appointments;




// import React, { useState } from 'react';

// const SomeComponent = () => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);

//     const headers = {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     };

//     const createBeneficiary = async () => {
//       try {
//           const response = await fetch('http://127.0.0.1:5000/create_ben', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Accept': 'application/json'
//               },
//               body: JSON.stringify({
//                   name_ben: 'João da Silva',
//                   cpf: '12345678901',
//                   user_ben: 'joao_silva',
//                   password_ben: 'password123'
//               })
//           });
  
//           if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//           }
  
//           const data = await response.json();
//           console.log(data);
//       } catch (error) {
//           console.error('Erro ao criar beneficiário:', error);
//       }
//   };
  
//   createBeneficiary();
  

//     const createAppointment = async () => {
//         const cpf = '0989876543';

//         try {
//             await createBeneficiary(cpf); // Garante que o beneficiário é criado primeiro

//             const response = await fetch('http://127.0.0.1:5000/create_agendamento', {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify({
//                     cpf: cpf,
//                     nome: 'João da Silva',
//                     telefone: '123456789',
//                     data: '2024-07-23T10:00:00',
//                     descricao: 'Consulta',
//                     status: 'Confirmado',
//                     observacoes: 'Nenhuma'
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Erro ao criar agendamento');
//             }

//             const data = await response.json();
//             setData(data);
//         } catch (error) {
//             console.error('Erro ao criar agendamento:', error);
//             setError('Erro ao criar agendamento');
//         }
//     };

//     return (
//         <div>
//             <button onClick={createAppointment}>Criar Agendamento</button>
//             {data && <div>Data fetched: {JSON.stringify(data)}</div>}
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </div>
//     );
// };

// export default SomeComponent;