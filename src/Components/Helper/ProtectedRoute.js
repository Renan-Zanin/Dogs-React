import React from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

/* Componente que protege a rota de acesso, exibindo a página que
é passada como children do elemento ProtectedRoute caso o login seja true,
caso contrário, se o usuário tentar acessar a rota children será redirecionado
para a rota de login   */
const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);

  return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
