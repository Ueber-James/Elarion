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
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white/50 p-6 rounded-lg shadow-md">
       
        <div className="text-center mb-8">
  <h2 className="text-2xl font-semibold">Um mundo de lendas aguarda você.</h2>
  <p className="text-black-300 font-semibold"> Comece a forjar seu destino em Elarion. Cada decisão será escrita na história — prepare-se para viver grandes feitos!</p>
</div>
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