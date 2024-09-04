import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './style.css';

function MeuPerfil() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setError('Token não encontrado.');
                    return;
                }

                const decodedToken = jwtDecode(token);
                const user_Ben = decodedToken.user;

                if (!user_Ben) {
                    setError('Usuário não encontrado no token.');
                    return;
                }

                const response = await fetch('http://localhost:5000/get_ben', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const funcionario = data.find(ben => ben.user_ben === user_Ben);

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
        navigate(`/edit_beneficiario/${userInfo.cpf}`);
    };

    return (
        <div className="edit">
            <h1>Perfil do Usuário</h1>
            <div className="formulario">
                <div className="form-group">
                    <label>Nome completo</label>
                    <p>{userInfo.name_ben}</p><br />
                </div>
                <div className="form-group">
                    <label>CPF</label>
                    <p>{userInfo.cpf}</p><br />
                </div>
                <div className="form-group">
                    <label>Telefone</label>
                    <p>{userInfo.telefone}</p><br />
                </div>
                <div className="form-group">
                    <label>Endereço</label>
                    <p>{userInfo.endereco}</p><br />
                </div>
                <div className="form-group">
                    <label>Usuário</label>
                    <p>{userInfo.user_ben}</p><br />
                </div>
                <div className="buttons-container">
                    <button className="button" onClick={handleEdit}>Editar</button>
                </div>
            </div>
        </div>
    );
}

export default MeuPerfil;