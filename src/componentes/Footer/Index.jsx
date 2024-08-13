import React from 'react';
import './style.css';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Sobre o Projeto</h4>
                    <p>Desenvolvido por alunos do Instituto Federal da Bahia (IFBA).</p>
                </div>
                <div className="footer-section">
                    <h4>Contato</h4>
                    <p>Email: contato@sis-social.com.br</p>
                    <p>Telefone: (71) 1234-5678</p>
                </div>
                <div className="footer-section">
                    <h4>Links Úteis</h4>
                    <ul>
                        <li><a href="#home">Início</a></li>
                        <li><a href="#sobre">Sobre</a></li>
                        <li><a href="#servicos">Serviços</a></li>
                        <li><a href="#contato">Contato</a></li>
                    </ul>
                </div>
            </div>
            {/* <br></br>
            <div className="footer-bottom">
                &copy; {month} {day}, {year} Todos os direitos reservados.
            </div> */}
        </footer>
    );
}

export default Footer;
