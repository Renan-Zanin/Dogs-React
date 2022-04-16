import React from "react";

/* Hook que retorna true se o match corresponder com o media passado, e 
false caso contrário */
const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);

  /* Effect que ocorre toda vez que media for alterado */
  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }
    changeMatch();
    /* EventListener que irá executar a função changeMatch toda vez que 
    a janela for reajustada */
    window.addEventListener("resize", changeMatch);
    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]);

  return match;
};

export default useMedia;
