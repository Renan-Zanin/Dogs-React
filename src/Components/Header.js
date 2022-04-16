import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { UserContext } from "../UserContext";

const Header = () => {
  /* Utiliza o cotexto armazenado no contexto criado em UserContext */
  const { data } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {/* Se data não for null, ou seja, se o usuário já estiver logado,
        o Link irá retornar para a página de conta, senão, se o usuário ainda 
        não estiver se autenticado, e data for null, irá retornar o Link para
        a página de login */}
        {data ? (
          <Link className={styles.login} to="conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
