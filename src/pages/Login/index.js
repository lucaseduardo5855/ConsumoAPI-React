import React from 'react';
import { useDispatch } from 'react-redux'; // Hook para disparar ações

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragrafo } from './styled';
import * as exampleActions from '../../store/modules/example/actions';

export default function Login() {
  const disparador = useDispatch(); // DISPATCH: Cria o "mensageiro" que vai levar o pedido até o Redux

  function handleClick(e) {
    e.preventDefault();

    // Dispara a ação para o Reducer ouvir
    disparador(exampleActions.clicaBotaoRequest());
  }

  //assim q o componente é montado ela executa 1x apenas
  /* React.useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      const { data } = response;
      console.log(data);
    }

    getData();
  }, []); */

  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <Paragrafo>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum saepe magni
        illo, eius inventore reprehenderit neque quis aut illum delectus
        perferendis pariatur facere, quod vero itaque laboriosam cumque quo
        optio.
      </Paragrafo>
      <button onClick={handleClick} type="button">
        Enviar
      </button>
    </Container>
  );
}
