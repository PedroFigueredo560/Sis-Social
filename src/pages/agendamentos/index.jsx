import React, { useState, useEffect } from "react";
import axios from "axios";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "./style.css";

const Appointments = () => {
  const [appointmentType, setAppointmentType] = useState("presencial");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [appointments, setAppointments] = useState([]);

  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
  });

  const fetchAvailableSlots = async (selectedDate) => {
    setAvailableSlots(["09:00", "10:00", "11:00", "14:00", "15:00"]);//Atualizar deplois pra pegar do banco de dados
  };

  const bookAppointment = async (appointmentDetails) => {
    try {
      await axios.post("http://localhost:5000/create_agendamento", appointmentDetails);
      return true;
    } catch (error) {
      console.error("Erro ao agendar atendimento:", error);
      return false;
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/agendamentos");
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete_agendamento/${id}`);
      return true;
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (date) {
      fetchAvailableSlots(date);
    }
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!time) {
      alert("Por favor, selecione um horário.");
      return;
    }

    const appointmentDetails = {
      cpf: "12345678901",
      nome: name,
      telefone: contactPhone,
      data: `${date}T${time}:00`,
      descricao: description,
      status: "pendente",
      observacoes: "",
    };

    const result = await bookAppointment(appointmentDetails);
    if (result) {
      alert("Agendamento realizado com sucesso!");
      fetchAppointments();
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
                Selecione o horário disponível que melhor se adapta à sua agenda.
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
              <option value="">Selecione um horário</option>
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

          <div className="preferences-section">
            <div className="header-section">
              <h2>Preferências</h2>
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

        <div className="appointment-list">
          <div className="header-section">
            <h2>Meus Agendamentos</h2>
          </div>
          <ul>
            {appointments.map((app) => (
              <li key={app.id}>
                {new Date(app.data).toLocaleDateString()} - {new Date(app.data).toLocaleTimeString()} ({app.tipo_atendimento})
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
