import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 14px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 5px;
    margin-top: 5px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }

    button.delete {
      background-color: yellow;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000; //ficar em cima de tudo

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBox = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 400px; //caixinha

  h3 {
    margin-bottom: 30px;
  }

  div {
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }
`;
