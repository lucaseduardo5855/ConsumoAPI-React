import React, { useState, useEffect } from 'react'; // React continua com chaves
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

// CORREÇÃO: Importe SEM chaves
import isEmail from 'validator/lib/isEmail';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';

export default function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', 0);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          history.push('/');
        }
      }
    }

    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome precisa ter entre 3 a 255 caracteres');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('Nome precisa ter entre 3 a 255 caracteres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('Email invalido!');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Idade invalida');
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso invalida');
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura invalida');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        //editando
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) Editado com sucesso!');
      } else {
        //criando
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) Criado com sucesso!');
        history.push(`/alunos/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          placeholder="nome"
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          value={sobrenome}
          placeholder="sobrenome"
          onChange={(e) => setSobrenome(e.target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          value={idade}
          placeholder="idade"
          onChange={(e) => setIdade(e.target.value)}
        />

        <input
          type="text"
          value={peso}
          placeholder="peso"
          onChange={(e) => setPeso(e.target.value)}
        />

        <input
          type="text"
          value={altura}
          placeholder="altura"
          onChange={(e) => setAltura(e.target.value)}
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
