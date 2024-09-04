import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  // Certifique-se de ter o pacote jwt-decode instalado
import { useNavigate } from 'react-router-dom'; // Importação do useNavigate
import './style.css';

function MeuPerfil() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Inicialização do useNavigate

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setError('Token não encontrado.');
                    return;
                }

                const decodedToken = jwtDecode(token);
                const user_func = decodedToken.user;

                if (!user_func) {
                    setError('Usuário não encontrado no token.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/get_func', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const funcionario = response.data.find(func => func.user_func === user_func);

                if (funcionario) {
                    setUserInfo(funcionario);
                } else {
                    setError('Usuário não encontrado.');
                }
            } catch (err) {
                console.error('Erro ao carregar as informações do usuário:', err);
                setError('Erro ao carregar as informações do usuário.');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!userInfo) {
        return <div>Carregando...</div>;
    }

    const handleEdit = () => {
        navigate(`/edit_funcionario/${userInfo.cpf}`);  // Navegação para a página de edição do funcionário
    };

    return (
        <div className="edit"> {/* Reutilizando a classe CSS da tela EditFuncionario */}
            <h1>Perfil do Usuário</h1>
            <div className="formulario"> {/* Reutilizando a classe de formulário */}
                <div className="form-group">
                    <label>Nome completo</label>
                    <p>{userInfo.name_func}</p><br />
                </div>
                <div className="form-group">
                    <label>CPF</label>
                    <p>{userInfo.cpf}</p> <br />
                </div>
                <div className="form-group">
                    <label>Função</label>
                    <p>{userInfo.job}</p><br />
                </div>
                <div className="form-group">
                    <label>Usuário</label>
                    <p>{userInfo.user_func}</p> <br />
                </div>
                <div className="buttons-container"> {/* Contêiner para centralizar o botão */}
                    <button className="button" onClick={handleEdit}>Editar</button>
                </div>
            </div>
        </div>
    );
}

export default MeuPerfil;