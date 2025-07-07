// src/api/client.js
const BASE = import.meta.env.VITE_API_URL;

/** wrapper genérico */
async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 
      'Content-Type': 'application/json',
      ...(options.headers || {}) 
    },
    ...options
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  // não tenta json em DELETE ou 204
  if (res.status === 204 || options.method === 'DELETE') {
    return;
  }
  return res.json();
}

/** cria um novo personagem */
export function createCharacter(data) {
  return request('/characters', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

/** lista todos os personagens */
export function listCharacters() {
  return request('/characters', {
    method: 'GET'
  });
}

/** busca um personagem pelo ID */
export function getCharacter(id) {
  return request(`/characters/${id}`, {
    method: 'GET'
  });
}

/** atualiza um personagem pelo ID */
export function updateCharacter(id, data) {
  return request(`/characters/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

/** deleta um personagem pelo ID */
export function deleteCharacter(id) {
  return request(`/characters/${id}`, {
    method: 'DELETE'
  });
}
