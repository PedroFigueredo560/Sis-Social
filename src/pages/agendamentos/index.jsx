import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toggle/style.css";
import "./style.css";
import FormTemplate from "../../componentes/formTemplate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointments = () => {
  const [appointmentType, setAppointmentType] = useState("presencial");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [description, setDescription] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
  });

  const getToken = () => {
    return localStorage.getItem('token');
  };

  // buscar slots disponíveis
  const fetchAvailableSlots = async (selectedDate) => {
    try {
      const response = await axios.get("http://localhost:5000/available_slots", {
        params: { date: selectedDate },
      });
      setAvailableSlots(response.data.slots || []);
    } catch (error) {
      console.error("Erro ao buscar horários disponíveis:", error);
      setAvailableSlots([]);
    }
  };

  // Chama a buscar horários disponíveis sempre que a data mudar
  useEffect(() => {
    if (date) {
      fetchAvailableSlots(date);
    }
  }, [date]);

  // agendar um atendimento
  const bookAppointment = async (appointmentDetails) => {
    try {
      const token = getToken(); // Obter o token
      const response = await axios.post("http://localhost:5000/create_agendamento", appointmentDetails, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao agendar atendimento:", error);
      return false;
    }
  };

  // buscar todos os agendamentos
  const fetchAppointments = async () => {
    try {
      const token = getToken(); // Obter o token
      const response = await axios.get("http://localhost:5000/agendamentos", {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };

  // cancelar um agendamento
  const cancelAppointment = async (id) => {
    try {
      const token = getToken(); // Obter o token
      await axios.delete(`http://localhost:5000/agendamento/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      return true;
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // formulário de agendamento
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!time) {
      toast.error("Por favor, selecione um horário.");
      return;
    }

    try {
      const [startTime] = time.split('-');
      const localDateTimeString = `${date}T${startTime}:00`;
      const localDateTime = new Date(localDateTimeString);

      if (isNaN(localDateTime.getTime())) {
        throw new Error("Data e hora inválidas");
      }

      const utcDateTime = localDateTime.toISOString();

      const appointmentDetails = {
        cpf: cpf,
        nome: name,
        telefone: contactPhone,
        data: utcDateTime,
        descricao: description,
        status: "pendente",
        observacoes: "",
        email_notification: preferences.email, 
        email: contactEmail
      };

      console.log('Dados do agendamento:', appointmentDetails);

      const result = await bookAppointment(appointmentDetails);
      if (result) {
        toast.success("Agendamento realizado com sucesso!");
        fetchAppointments();
      } else {
        toast.error("Falha ao realizar agendamento.");
      }
    } catch (error) {
      console.error("Erro ao processar data e hora:", error);
      toast.error("Erro ao processar data e hora. Por favor, verifique os valores inseridos.");
    }
  };

  // lidar com o cancelamento de um agendamento
  const handleCancel = async (id) => {
    const result = await cancelAppointment(id);
    if (result) {
      setAppointments(appointments.filter((app) => app.id !== id));
      toast.success("Agendamento cancelado com sucesso.");
    } else {
      toast.error("Falha ao cancelar agendamento.");
    }
  };

  // lidar com a mudança nas preferências de notificação
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  return (
    <>
      <ToastContainer />
      <FormTemplate isForm={false}>
        <h1>Agendamentos</h1>
        <section className="appointments-container">
          <section className="cards-grid">
            <div className="card">
              <div className="card-header">
                <h2>01</h2>
                <p>ESCOLHA</p>
              </div>
              <div className="card-body">
                <h3>Tipo de Atendimento</h3>
                <p>
                  Escolha se deseja realizar o atendimento
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
              CPF:
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </label>

            <label>
              Telefone:
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </label>

            <label>
              Email:
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
              Hora:
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <div className="preferences-section">
              <h2>Preferências</h2>
              <div className="checkbox-container">
                <p>Me lembrar um dia antes da data agendada</p>
                <input
                  type="checkbox"
                  checked={preferences.email}
                  onChange={handleNotificationChange}
                  name="email"
                />
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
      </FormTemplate>
    </>
  );
};

export default Appointments;
