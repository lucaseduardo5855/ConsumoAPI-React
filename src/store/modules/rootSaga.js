import { all } from 'redux-saga/effects';
import auth from './auth/sagas'; // Entra na pasta example

export default function* rootSaga() {
  return yield all([auth]);
}
