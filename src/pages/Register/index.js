import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import { Container } from '../../styles/GlobalStyles';
import { Form, Overlay, ModalBox } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';

export default function Register() {
  const dispatch = useDispatch();

  //Va na memoria do navegador pega o id do user logado
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //Assim que a tela carregando e o user tiver um id(logado) preencha os inputs de nome e email automaticamente para ele n ter q digitar dnv
  React.useEffect(() => {
    if (!id) return;

    setNome(nomeStored);
    setEmail(emailStored);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail está invalido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('A senha deve ter de 6 a 50 caracteres');
    }

    if (formErrors) return;

    // Você só avisa o Redux: "Alguém quer se cadastrar!"
    dispatch(actions.registerRequest({ nome, email, password, id })); // em vez do axios.post ele dispara esse ordem
  }

  function handleDelete(e) {
    e.preventDefault();
    setShowDeleteModal(true);
  }

  function handleConfirmDelete() {
    dispatch(actions.registerDeleteRequest({ id }));
    setShowDeleteModal(false); // Fecha o modal após a exclusão
  }

  // O return deve ficar fora do handleSubmit
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu Email"
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            value={password}
            placeholder="Sua Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">{id ? 'Salvar' : 'Cria Conta'}</button>

        <button type="button" onClick={handleDelete} className="delete">
          Excluir Conta
        </button>
      </Form>

      {showDeleteModal && (
        <Overlay>
          <ModalBox>
            <h3>Deseja Realmente excluir a sua conta? </h3>

            <div className="actions">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="cancel-btn"
              >
                Cancelar
              </button>

              <button type="button" onClick={handleConfirmDelete}>
                Sim, Excluir
              </button>
            </div>
          </ModalBox>
        </Overlay>
      )}
    </Container>
  );
}
