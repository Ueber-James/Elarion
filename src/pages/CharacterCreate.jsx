import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCharacter } from '../api/cliente'; // <-- seu client de API


const initialData = {
  name: '',
  player: '',
  race: '',
  class: '',
  antecedent: '',
  age: '',
  genderPronouns: '',
  origin: '',
  affiliation: '',
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
  powerSource: '',
  castingForm: '',
  knownSpells: '',
  magicSideEffects: '',
  initialEquipment: '',
  rareItems: '',
  eventAt13: '',
  allies: '',
  enemiesThreats: '',
  secrets: '',
  forbiddenDesire: '',
  celurianAlignment: '',
  magicAccessLevel: '',
  lumenitaRelation: ''
};

export default function CharacterCreate() {
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // chama seu endpoint POST /api/characters
      const created = await createCharacter(data);
      alert(`Personagem "${created.name}" criado com sucesso!`);
      // redireciona para editar / visualizar o personagem recém-criado:
      navigate(`/edit/${created.id}`, { state: created });
    } catch (err) {
      console.error(err);
      alert(`Erro ao criar personagem: ${err.message}`);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Criar Personagem</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Informações Gerais */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Informações Gerais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Nome do Personagem"
              value={data.name}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="player"
              placeholder="Jogador"
              value={data.player}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="race"
              placeholder="Raça"
              value={data.race}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="class"
              placeholder="Classe"
              value={data.class}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="antecedent"
              placeholder="Antecedente"
              value={data.antecedent}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              type="number"
              name="age"
              placeholder="Idade"
              value={data.age}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="genderPronouns"
              placeholder="Gênero / Pronomes"
              value={data.genderPronouns}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="origin"
              placeholder="Origem (Cidade / Região)"
              value={data.origin}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="affiliation"
              placeholder="Afiliado a (Ordem / Religião / Rebelião / Elemental / Demônio)"
              value={data.affiliation}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>
        </div>

        {/* Atributos */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Atributos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((stat) => (
              <div key={stat} className="flex flex-col">
                <label htmlFor={stat} className="mb-1 font-medium">
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </label>
                <input
                  id={stat}
                  type="number"
                  name={stat}
                  value={data[stat]}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Magia e Poder */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Magia e Poder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="powerSource"
              placeholder="Fonte de Poder (Elemental / Demoníaco / Institucional / Outro)"
              value={data.powerSource}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="castingForm"
              placeholder="Forma de Conjuração (Foco, Runa, Palavra, Tatuagem, Outro)"
              value={data.castingForm}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <textarea
              name="knownSpells"
              placeholder="Magias Conhecidas (nível 1 e truques)"
              value={data.knownSpells}
              onChange={handleChange}
              className="col-span-full px-3 py-2 border rounded focus:outline-none focus:ring h-24"
            />
            <textarea
              name="magicSideEffects"
              placeholder="Efeitos Colaterais da Magia (narrativo)"
              value={data.magicSideEffects}
              onChange={handleChange}
              className="col-span-full px-3 py-2 border rounded focus:outline-none focus:ring h-24"
            />
          </div>
        </div>

        {/* Equipamentos e Itens */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Equipamentos e Itens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              name="initialEquipment"
              placeholder="Equipamentos Iniciais"
              value={data.initialEquipment}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring h-24"
            />
            <textarea
              name="rareItems"
              placeholder="Itens Mágicos ou Raros"
              value={data.rareItems}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring h-24"
            />
          </div>
        </div>

        {/* Relações e História */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Relações e História</h2>
          <div className="grid grid-cols-1 gap-4">
            <textarea
              name="eventAt13"
              placeholder="Evento aos 13 anos (perda ou acesso à magia)"
              value={data.eventAt13}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring h-24"
            />
            <textarea
              name="allies"
              placeholder="Aliados"
              value={data.allies}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring h-20"
            />
            <textarea
              name="enemiesThreats"
              placeholder="Inimigos ou Ameaças"
              value={data.enemiesThreats}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring h-20"
            />
            <textarea
              name="secrets"
              placeholder="Segredos ou Culpas"
              value={data.secrets}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring h-20"
            />
            <textarea
              name="forbiddenDesire"
              placeholder="Desejo Proibido"
              value={data.forbiddenDesire}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring h-20"
            />
          </div>
        </div>

        {/* Camadas de Ceúria */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Camadas de Ceúria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="celurianAlignment"
              placeholder="Alinhamento Celuriano"
              value={data.celurianAlignment}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="magicAccessLevel"
              placeholder="Nível de Acesso à Magia (Livre / Oculto / Caçado / Oficial)"
              value={data.magicAccessLevel}
              onChange={handleChange}
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
            />
            <input
              name="lumenitaRelation"
              placeholder="Relação com Lumenita"
              value={data.lumenitaRelation}
              onChange={handleChange}
              className="col-span-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>
        </div>

        <button type="submit" className="col-span-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Criar
        </button>
      </form>
    </div>
  );
}
