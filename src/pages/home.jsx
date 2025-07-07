import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      
      <div className="space-y-4">
        <Link to="/criar" className="block w-48 text-center bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Criar Ficha
        </Link>
        <Link to="/lista" className="block w-48 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Lista de Fichas
        </Link>
      </div>
    </div>
  );
}
