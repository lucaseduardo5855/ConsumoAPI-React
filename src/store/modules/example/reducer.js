import * as types from '../types';

const initialState = {
  botaoClicado: false, // Estado inicial: como a aplicação começa
};

// REDUCER: O "Gerente" que escuta os pedidos e muda o estado
export default function (state = initialState, action) {
  switch (action.type) {
    case types.botao_clicado_sucess: {
      console.log('Sucesso!');
      // Nunca altere o "state" direto. Crie uma cópia dele primeiro.
      const newState = { ...state };

      // Agora alteramos a cópia
      newState.botaoClicado = !newState.botaoClicado;

      // Devolvemos a versão nova e atualizada para a aplicação
      return newState;
    }

    case types.botao_clicado_failure: {
      console.log('Deu Erro!');
      return state;
    }

    case types.botao_clicado_request: {
      console.log('Estou fazendo a requisição!');
      return state;
    }

    default: {
      return state;
    }
  }
}
