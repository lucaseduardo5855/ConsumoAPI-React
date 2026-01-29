import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  label {
    width: 180px;
    height: 180px;
    display: flex;
    background-color: #eee;
    border: 2px dashed ${colors.primaryColor};
    align-items: center;
    justify-content: center;
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
  input {
    display: none;
  }
`;
