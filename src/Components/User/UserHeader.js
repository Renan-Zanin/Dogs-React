import React from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useLocation } from "react-router-dom";

const UserHeader = () => {
  const [title, setTitle] = React.useState("");

  /* Utiliza o useLocation para saber em qual rota está */
  const location = useLocation();

  /* Efeito utilizado para definir o título do header de usuário cada vez que
  o location do dom é modificado */
  React.useEffect(() => {
    const { pathname } = location;
    /* Switch que define o valor do título do header de acordo com o 
    pathname do dom */
    switch (pathname) {
      case "/conta/postar":
        setTitle("Postar Foto");
        break;
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      default:
        setTitle("Minha Conta");
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
