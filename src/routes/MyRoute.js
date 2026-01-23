import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

//Tenta entrar ele pega 3 coisas, a página, se a porta é privada e o resto
export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  /* a rota é fechada? ou não está logada?, ele joga para o /login se não passada, caso passe ele vai p Route de Component */
  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { prevPath: rest.location.pathname }, //prevPath (guarda o caminho anterior q tentou acessar)
        }}
      />
    );
  }

  return <Route {...rest} component={Component} />; //
}

MyRoute.defaultProps = {
  isClosed: false,
};

//fiscal de validação
MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};
