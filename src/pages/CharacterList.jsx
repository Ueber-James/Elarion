// src/pages/CharacterList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listCharacters } from '../api/cliente';

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listCharacters()
      .then(data => setCharacters(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Personagens Criados</h1>
        <ul className=" pl-5">
          {characters.map((char, idx) => (
            <li key={char.id} className="mb-2">
              <button
                onClick={() => navigate(`/edit/${char.id}`, { state: char })}
                className="text-blue-600 "
              >
                 {char.player}
              </button>
            </li>
          ))}
        </ul>
         <button
          onClick={() => navigate('/home')}
          className="float-right bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition mt-12"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
