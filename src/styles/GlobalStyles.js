import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
*{
  padding: 0;
  box-sizing: border-box;
  margin: 0;
  outline: none;
}

body{
  font-family: sans-serif;
  background: ${colors.primaryDarkColor};
  color: #2c2222;
}

html, body, #root{
  height: 100%;
}

button{
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  border-radius: 7px;
  padding: 10px 20px;
  font-weight: 700;
  color: white;
  transition: all 300ms;
}

button:hover{
  filter: brightness(80%);
}

a{
  text-decoration: none;
  color: ${colors.primaryColor};
}

ul{
  list-style: none;
}

body .Toastify .Toastify__toast-container .Toastify__toast--success {
  background-color: ${colors.successColor};
}

body .Toastify .Toastify__toast-container .Toastify__toast--error {
  background-color: ${colors.errorColor};
}
`;

export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;
