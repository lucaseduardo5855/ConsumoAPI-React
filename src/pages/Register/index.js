import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail está invalido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('A senha deve ter de 6 a 50 caracteres');
    }

    if (formErrors) return;

    try {
      await axios.post('/users/', {
        nome,
        password,
        email,
      });
      toast.success('Sua conta foi registrada');
      history.push('/login'); //leva p tela de login
    } catch (e) {
      const errors = get(e, 'response.data.errors');
      console.log(errors);

      errors.map((error) => toast.error(error));
    }
  }

  // O return deve ficar fora do handleSubmit
  return (
    <Container>
      <h1>Crie sua conta</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu Email"
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            value={password}
            placeholder="Sua Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
