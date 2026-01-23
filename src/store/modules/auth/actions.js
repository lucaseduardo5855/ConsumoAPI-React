import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST, // O NOME EXATO que está no switch do reducer
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS, // O NOME EXATO que está no switch do reducer
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE, // O NOME EXATO que está no switch do reducer
    payload,
  };
}

export function register_request(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}
