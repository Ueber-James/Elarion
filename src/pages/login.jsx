import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImgLogin from '../assets/login.jpg';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate login and redirect
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-100 bg-cover"
    style={{ backgroundImage: `url(${ImgLogin})` }}>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white/10 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}