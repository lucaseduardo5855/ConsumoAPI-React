import * as types from '../types';

export function clicaBotaoRequest() {
  return {
    type: types.botao_clicado_request, // O NOME EXATO que está no switch do reducer
  };
}

export function clicaBotaoSucess() {
  return {
    type: types.botao_clicado_sucess, // O NOME EXATO que está no switch do reducer
  };
}

export function clicaBotaoFailure() {
  return {
    type: types.botao_clicado_failure, // O NOME EXATO que está no switch do reducer
  };
}
