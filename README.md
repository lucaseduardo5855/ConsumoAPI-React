# React Base Project

Este projeto serve como um **template robusto** para aplicações React, pré-configurado com uma stack completa de ferramentas para desenvolvimento profissional, gerenciamento de estado e roteamento.

O objetivo é fornecer uma base sólida com **Redux, Sagas, Persist, Router e Styled Components** já integrados e prontos para uso.

## 🚀 Tecnologias & Ferramentas

O projeto foi construído utilizando as seguintes bibliotecas e padrões:

*   **[React](https://reactjs.org/)**: Biblioteca UI.
*   **[Redux](https://redux.js.org/)**: Gerenciamento de estado global.
    *   **Redux Saga**: Middleware para gerenciamento de efeitos colaterais (chamadas API assíncronas).
    *   **Redux Persist**: Persistência do estado do Redux no LocalStorage/SessionStorage.
*   **[React Router Dom v5](https://v5.reactrouter.com/)**: Gerenciamento de rotas.
    *   Configuração de `History` personalizado.
*   **[Styled Components](https://styled-components.com/)**: Estilização CSS-in-JS.
*   **[Axios](https://github.com/axios/axios)**: Cliente HTTP para consumo de APIs.
*   **[React Toastify](https://fkhadra.github.io/react-toastify/)**: Exibição de notificações (Toasts) personalizadas.
*   **Code Quality**:
    *   **ESLint**: Linter para identificar e reportar padrões no JS.
    *   **Prettier**: Formatador de código.
    *   **EditorConfig**: Padronização de configurações entre editores.

## ⚙️ Funcionalidades e Configurações

### 1. Estrutura de Pastas e Componentes
O projeto segue uma estrutura organizada em módulos:
*   `src/components`: Componentes reutilizáveis (Header, etc.).
*   `src/pages`: Páginas da aplicação (Login, 404, etc.).
*   `src/store`: Configuração completa do Redux.
*   `src/services`: Configuração do Axios e API.
*   `src/routes`: Definição de rotas.
*   `src/styles`: Estilos globais.

### 2. Roteamento Personalizado (`MyRoute`)
Implementação de um componente `MyRoute` (Wrapper) para controle de rotas privadas:
*   Verifica se o usuário está logado (`isLoggedIn`).
*   Redireciona para login se tentar acessar rota fechada (`isClosed`).
*   Redireciona para rota anterior após login (preserva `prevPath`).

### 3. Redux & Sagas
Configuração escalável utilizando o padrão de **Modules**:
*   `rootReducer`: Combina todos os reducers da aplicação.
*   `rootSaga`: Combina todas as sagas (listeners) da aplicação.
*   **Actions & Types**: Separação clara entre tipos de ações e criadores de ação.
*   Exemplo implementado (`example/`) com fluxo de solicitação, sucesso e falha (Request/Success/Failure).

### 4. Estilização Global
*   **GlobalStyles**: Reset CSS e estilos padrões (fontes, cores, links) injetados globalmente.
*   **Colors Config**: Arquivo de configuração centralizando as cores da aplicação (primary, error, success, etc.).

### 5. Tratamento de Erros e Feedback
*   Integração do `react-toastify` no `App.js` para feedback visual instantâneo (sucesso/erro).
*   Página 404 personalizada.

## 📦 Como Executar

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```
    O app abrirá em [http://localhost:3000](http://localhost:3000).
