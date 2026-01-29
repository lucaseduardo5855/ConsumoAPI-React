import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    // 1. Chama a API
    const response = yield call(axios.post, '/tokens', payload);

    // 2. Sucesso no Redux
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login com sucesso!');

    // 3. Define Token
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    // 4. Redirecionamento (Tirei de dentro do try crítico ou garanta que history existe)
    history.push(payload.prevPath || '/');
  } catch (e) {
    toast.error('Usuário ou senha inválidos');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      // MODO EDIÇÃO (PUT)
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso!');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
      history.push('/');
    } else {
      // MODO CRIAÇÃO (POST)
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      // Redireciona para o login após criar
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

function* registerDeleteRequest({ payload }) {
  const { id } = payload; // mandando id do user logado

  try {
    yield call(axios.delete, `/users/`);
    toast.success('Conta excluída com sucesso!');
    // Dispara o SUCCESS para o Reducer limpar o estado (isLoggedIn = false)
    yield put(actions.registerDeleteSuccess());
    // Redireciona para login ou home
    history.push('/login');
  } catch (err) {
    const status = get(err, 'response.status', 0);
    if (status === 401) {
      toast.error('Você precisa fazer login novamente');
      yield put(actions.loginFailure()); // Agora usa 'yield put' corretamente
      return history.push('/login');
    }

    // Se for outro erro
    toast.error('Erro ao excluir conta');
    yield put(actions.registerFailure());
  }
}
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.REGISTER_DELETE_REQUEST, registerDeleteRequest),
]);
