import React, { useEffect } from "react";
import "./style.css";
import homeImage from '../../assets/homee.avif';
import sobreImage from '../../assets/home2.avif';
import sobreImage2 from '../../assets/home3.avif';
import {
  Dashboard as DashboardIcon,
  Build as BuildIcon,
  BarChart as BarChartIcon,
  Support as SupportIcon,
  IntegrationInstructions as IntegrationInstructionsIcon,
  School as TrainingIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer/Index";

// Definir uma localização padrão para o mapa
const defaultLocation = {
  lat: -12.9714, // Latitude de Salvador, BA para exemplo
  lng: -38.5014  // Longitude de Salvador, BA para exemplo
};

const mapContainerStyle = {
  height: '400px',
  width: '100%'
};

const MapWithGeocoder = () => {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();
    const control = L.Control.geocoder({
      geocoder: geocoder,
      position: 'topright'
    }).addTo(map);

    control.on('markgeocode', function (e) {
      const { center } = e.geocode;
      map.setView(center, 12);
      L.marker(center).addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();
    });
  }, [map]);

  return null;
};

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <>
     <Header />
      <main className="main-container">
        <section id="home" className="home" data-aos="fade-up">
          <div className="home-container">
            <div className="home-image">
              <img src={homeImage} alt="home" />
            </div>
            <div className="home-half-circle">
              <h1>
                Bem-vindo ao Sis-Social!<br />
                Conectando Vidas e <span className="highlight">facilitando Ações</span>
              </h1>
            </div>
          </div>
        </section>

        <section id="sobre" className="about" data-aos="fade-right">
          <div className="about-container">
            <div className="about-item">
              <div className="about-image">
                <img src={sobreImage} alt="Sobre o Sis-Social" />
              </div>
              <div className="about-text">
                <h2>Sobre o Sis-Social</h2>
                <p>
                  Desenvolvemos uma ferramenta robusta que busca não apenas otimizar, mas também modernizar o gerenciamento dos serviços sociais.
                </p>
                <p>
                  Com o Sis-Social, você pode contar com um sistema integrado que centraliza dados, automatiza tarefas e melhora a eficiência do SUAS. Nosso objetivo é proporcionar uma solução que eleva a qualidade do atendimento e simplifica o trabalho dos profissionais, garantindo que cada ação seja mais eficaz e ágil.
                </p>
              </div>
            </div>

            <div className="about-item" data-aos="fade-left">
              <div className="about-image">
                <img src={sobreImage2} alt="Sobre o Sis-Social" />
              </div>
              <div className="about-text">
                <h2>O Que Oferecemos</h2>
                <p>
                  O Sis-Social é mais do que uma ferramenta; é um aliado na melhoria contínua dos serviços sociais.
                </p>
                <p>
                  O Sis-Social oferece uma série de funcionalidades para aprimorar a administração de serviços sociais, incluindo:
                </p>
                <p>Veja mais na proxima seção</p>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="services" data-aos="fade-up">
          <h2>Principais Serviços</h2>
          <div className="cards">
            <div className="card-services">
              <DashboardIcon fontSize="large" className="card-icon" />
              <h3>Gestão Integrada</h3>
              <p>Registro e acompanhamento centralizados.</p>
            </div>
            <div className="card-services">
              <BuildIcon fontSize="large" className="card-icon" />
              <h3>Automatização de Processos</h3>
              <p>Reduza tarefas manuais com automação.</p>
            </div>
            <div className="card-services">
              <BarChartIcon fontSize="large" className="card-icon" />
              <h3>Relatórios Detalhados</h3>
              <p>Gere relatórios precisos para melhores decisões.</p>
            </div>
            <div className="card-services">
              <SupportIcon fontSize="large" className="card-icon" />
              <h3>Consultoria Personalizada</h3>
              <p>Suporte para configurar e otimizar o sistema.</p>
            </div>
            <div className="card-services">
              <IntegrationInstructionsIcon fontSize="large" className="card-icon" />
              <h3>Integração com Sistemas Existentes</h3>
              <p>Integre com outros sistemas da sua instituição.</p>
            </div>
            <div className="card-services">
              <TrainingIcon fontSize="large" className="card-icon" />
              <h3>Treinamento e Suporte</h3>
              <p>Treinamento e suporte contínuo para sua equipe.</p>
            </div>
          </div>
        </section>

        <section id="contato" className="contact" data-aos="fade-in">
          <div className="contact-content">
            <h2>Contato</h2>
            <p>Entre em contato conosco para mais informações.</p>
          </div>
          <div className="contact-container">
            <div className="contact-form">
              <form>
                <label htmlFor="name">
                  Name:
                  <input type="text" id="name" name="name" required />
                </label>
                <label htmlFor="email">
                  Email:
                  <input type="email" id="email" name="email" required />
                </label>
                <label htmlFor="message">
                  Message:
                  <textarea id="message" name="message" required></textarea>
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>

            <div className="contact-map">
              <MapContainer center={defaultLocation} zoom={12} style={mapContainerStyle}>
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapWithGeocoder />
                <Marker position={defaultLocation}>
                  <Popup>Localização padrão</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
