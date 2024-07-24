import { Message } from "@mui/icons-material";

function register_ben() {
    fetch('http://127.0.0.1:5000/create_ben', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'name_ben': 'nome_ben',
            'cpf': 'cpf',
            'user_ben': 'user_ben',
            'password_ben': 'password_ben'
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro ao registrar')
        }
        return response.json();
    }).then(response => {
        if(response.ok) {
            throw new Message('Registrado com sucesso')
        }
    }).catch(error => {
        console.error('Error: ', error);
        alert('Erro ao registrar!');
    });
}