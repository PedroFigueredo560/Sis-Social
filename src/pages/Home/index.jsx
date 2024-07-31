import React from "react";
import "./style.css";
import homeImage from '../../assets/home.avif';

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="content-home">
          <h1>Bem-vindo ao Sis-Social!</h1>
          <p>
            Explore nosso sistema e descubra como ele pode ajudar você a gerenciar processos sociais.
          </p>
        </div>
      </div>

      <section className="about">
        <div className="about-container">
          <div className="about-image">
          <img src={homeImage} alt="home" />
          </div>
          <div className="about-text">
            <h2>Sobre o Projeto</h2>
            <p>
              O Sis-Social é uma iniciativa destinada a otimizar e integrar os processos do Sistema Único de Assistência Social (SUAS). Nosso objetivo é fornecer uma ferramenta eficiente para a gestão de serviços sociais, melhorando a qualidade do atendimento e facilitando o trabalho dos profissionais envolvidos.
            </p>
            <p>
              Com o Sis-Social, buscamos centralizar informações, automatizar processos e fornecer acesso a dados confiáveis, contribuindo para a eficiência do SUAS.
            </p>
          </div>
        </div>
      </section>

      <section className="services">
        <h2>Serviços</h2>
        <div className="cards">
          <div className="card">
            <h3>Gestão Integrada</h3>
            <p>
              Facilite o registro e acompanhamento de usuários, alocação de recursos e geração de relatórios, tudo em um só lugar.
            </p>
          </div>
          <div className="card">
            <h3>Automatização de Processos</h3>
            <p>
              Reduza a carga de trabalho manual com processos automatizados, permitindo que você se concentre no que realmente importa.
            </p>
          </div>
          <div className="card">
            <h3>Relatórios Detalhados</h3>
            <p>
              Gere relatórios detalhados para tomadas de decisão mais informadas e eficientes.
            </p>
          </div>
          <div className="card">
            <h3>Consultoria Personalizada</h3>
            <p>
              Oferecemos consultoria personalizada para ajudar a configurar e otimizar o uso do Sis-Social. Nossa equipe está disponível para orientar você na adaptação do sistema às suas necessidades específicas e maximizar a eficiência no gerenciamento de processos sociais.
            </p>
          </div>
          <div className="card">
            <h3>Integração com Sistemas Existentes</h3>
            <p>
              Facilitamos a integração do Sis-Social com outros sistemas já utilizados pela sua instituição. Isso inclui a importação de dados, sincronização de informações e configuração de integrações para garantir que todos os seus sistemas funcionem em harmonia.
            </p>
          </div>
          <div className="card">
            <h3>Treinamento e Suporte</h3>
            <p>
              Fornecemos treinamento completo para sua equipe sobre como usar o Sis-Social. Além disso, oferecemos suporte contínuo para resolver quaisquer problemas e responder a perguntas, garantindo que sua equipe esteja sempre atualizada e apta a utilizar o sistema de forma eficiente.
            </p>
          </div>
        </div>
      </section>

      <section className="contact">
        <h2>Contato</h2>
        <p>Entre em contato conosco para mais informações:</p>
        <form>
          <label>
            Nome:
            <input type="text" name="name" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Mensagem:
            <textarea name="message"></textarea>
          </label>
          <button type="submit">Enviar</button>
        </form>
      </section>
    </>
  );
};

export default Home;
