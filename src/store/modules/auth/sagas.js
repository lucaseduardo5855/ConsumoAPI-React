import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';
import { get } from 'lodash';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath());
  } catch (e) {
    toast.error('Usuario ou senha invalidos');

    yield put(actions.loginFailure()); //Pare tudo e avise o Reducer imediatamente que deu erro
  }
}

function persistRehydrate({ payload }) {
  // Tenta pegar o token que estava salvo no Redux
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  // Se tiver, avisa o axios para usar esse token em todas as requisições
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
