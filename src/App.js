import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const loadRepositories = async () => {
      const { data } = await api.get("/repositories");
      setRepositories(data);
    };

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: "Desafio ReactJS",
      url: "https://github.com/josepholiveira",
      techs: ["React", "NodeJS"],
    };
    const { data, status } = await api.post("/repositories", repository);
    if (status === 200) {
      setRepositories([...repositories, data]);
    }
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`);
    if (status === 204) {
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}

            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
