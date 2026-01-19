import { all } from 'redux-saga/effects';
import example from './example/sagas'; // Entra na pasta example

export default function* rootSaga() {
  return yield all([example]);
}
