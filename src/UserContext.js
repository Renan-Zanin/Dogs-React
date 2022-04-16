import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

/* Componente que irá envolver toda a estrutura que "compartilha" dados */
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLoading(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  /* Função que retorna os dados do usuário de acordo com o token gerado 
  por userLogin */
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  /* Função que realiza o login do usuário de acordo com a API, retornando o
   token do usuário para a obtenção de dados do mesmo*/
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  /* Realiza o auto login do usuário assim que o componente for carregado,
  se existir um token válido no localstorage */
  React.useEffect(() => {
    async function autoLogin() {
      /* Obtêm o valor do token de usuário se o mesmo já existir no localstorage */
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          /* Realiza a requisição de validação do token através do que foi 
          definido em api.js */
          const { url, options } = TOKEN_VALIDATE_POST(token);
          /* Faz o fetch de acordo com a url e as opções definidas */
          const response = await fetch(url, options);
          /* Se a resposta da validação não for ok retorna um erro de token 
          inválido */
          if (!response.ok) throw new Error("Token inválido");
          /* Caso o token seja válido, realiza o auto login do usuário*/
          await getUser(token);
        } catch (err) {
          /* Realiza o logout da conta caso o token seja inválido, limpando
          também da memória o seu valor e evitando futuros erros */
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    /* Através do userLogin sendo passado como value é possível acessar os 
    dados do usuário logado em toda a aplicação que é envolvida pelo Context */
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
