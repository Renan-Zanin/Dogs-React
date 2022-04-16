import React from "react";

const PhotoGet = () => {
  const [id, setId] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://dogsapi.origamid.dev/json/api/photo${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={id} onChange={({ target }) => target.value} />
      <button>Enviar</button>
    </form>
  );
};

export default PhotoGet;
