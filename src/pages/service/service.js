import { Message } from "@mui/icons-material";

export default function register_ben() {
    var nome_ben = document.getElementById('nome_ben').value;
    var cpf = document.getElementById('cpf').value;
    var user_ben = document.getElementById('user_ben').value;
    var password_ben = document.getElementById('password_ben').value;

  fetch('http://127.0.0.1:5000/create_ben', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name_ben': nome_ben,
      'cpf': cpf,
      'user_ben': user_ben,
      'password_ben': password_ben
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao registrar');
    }
    return response.json();
  })
  .then(response => {
    if (response.ok) {
      // Handle successful registration
      console.log('Registrado com sucesso');
      // You might want to display a success message here
    } else {
      // Handle unsuccessful registration
      throw new Error('Erro de registro: ' + response.message);
    }
  })
  .catch(error => {
    console.error('Error: ', error);
    alert('Ocorreu um erro durante o registro. Por favor, tente novamente.');
  });
}
