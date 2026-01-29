import React, { useState } from 'react';

import { Container } from '../../styles/GlobalStyles';
import { get } from 'lodash';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  //match serve para pegar o id da url
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter imagem');
        setIsLoading(true);
        history.push('/');
      }
    };

    getData();
  }, []);

  const handleChange = async (e) => {
    const file = e.target.files[0]; //pegando o arquivo selecionado
    //criar url do objeto

    if (!file) return; //se nao tiver arquivo, retorna
    const fotoUrl = URL.createObjectURL(file); //criando uma url temporaria para exibir a imagem

    setFoto(fotoUrl); //atualizando o estado da foto para exibir a imagem selecionada

    const formData = new FormData(); //formData é usado para enviar arquivos
    formData.append('aluno_id', id); //adicionando o id do aluno
    formData.append('foto', file); //adicionando a foto

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData); //enviando a foto para o backend

      toast.success('Foto enviada com sucesso');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response.status', '');
      toast.error('Erro ao enviar foto');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

//Regra para garantia que os componentes recebam as props corretamente
Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
