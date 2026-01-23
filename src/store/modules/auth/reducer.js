import * as types from '../types';

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

// REDUCER: O "Gerente" que escuta os pedidos e muda o estado
export default function (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token; // Atenção: É action.payload.token
      newState.user = action.payload.user; // Atenção: É action.payload.user
      newState.isLoading = false;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
