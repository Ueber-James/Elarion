import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { getCharacter, updateCharacter } from '../api/cliente';

export default function CharacterEdit() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [data, setData] = useState(location.state || null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(!location.state);

  useEffect(() => {
    if (!data) {
      getCharacter(id)
        .then(char => {
          setData(char);
          setLoading(false);
        })
        .catch(() => navigate('/criar'));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        const updated = await updateCharacter(id, data);
        setData(updated);
        alert('Personagem atualizado!');
      } catch (err) {
        console.error(err);
        alert(`Erro ao atualizar: ${err.message}`);
      }
    }
    setIsEditing(edit => !edit);
  };

  const handleExportPDF = async () => {
    if (!containerRef.current) return;
    // Inject CSS overrides to force hex colors (avoid oklch from Tailwind)
    const styleId = 'canvas-overrides';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.innerHTML = `
        #character-container, #character-container * {
          background: #ffffff !important;
          color: #000 !important;
          border-color: #000 !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    try {
      const canvas = await html2canvas(containerRef.current, {
        useCORS: true,
        scale: 2,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`character_${id}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Não foi possível gerar o PDF. Veja o console para mais detalhes.');
    } finally {
      // Remove the override style
      if (styleEl) document.head.removeChild(styleEl);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div
      ref={containerRef}
      id="character-container"
      className="min-h-screen bg-gray-50 p-6"
      style={{ backgroundColor: '#ffffff' }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Ficha de Personagem</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
        {/* Informações Gerais */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Informações Gerais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['name','player','race','class','antecedent','age','gender_pronouns','origin','affiliation'].map(field => (
              <input
                key={field}
                name={field}
                type={field==='age'?'number':'text'}
                placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                value={data[field]||''}
                onChange={handleChange}
                disabled={!isEditing}
                className="px-3 py-2 border rounded focus:outline-none focus:ring disabled:opacity-50  h-8"
              />
            ))}
          </div>
        </div>
        {/* Atributos */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Atributos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['strength','dexterity','constitution','intelligence','wisdom','charisma'].map(stat => (
              <div key={stat} className="flex flex-col">
                <label htmlFor={stat} className="mb-1 font-medium">
                  {stat.charAt(0).toUpperCase()+stat.slice(1)}
                </label>
                <input
                  id={stat}
                  type="number"
                  name={stat}
                  value={data[stat]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring disabled:opacity-50"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Magia e Poder */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Magia e Poder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['power_source','casting_form'].map(field=> (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                value={data[field]||''}
                onChange={handleChange}
                disabled={!isEditing}
                className="px-3 py-2 border rounded focus:outline-none focus:ring disabled:opacity-50"
              />
            ))}
            {['known_spells','magic_side_effects'].map(field=> (
              <textarea
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                value={data[field]||''}
                onChange={handleChange}
                disabled={!isEditing}
                className="col-span-full px-3 py-2 border rounded focus:outline-none focus:ring disabled:opacity-50 h-24"
              />
            ))}
          </div>
        </div>
        {/* Equipamentos e Itens */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Equipamentos e Itens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['initial_equipment','rare_items'].map(field=> (
              <textarea
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                value={data[field]||''}
                onChange={handleChange}
                disabled={!isEditing}
                className="px-3 py-2 border rounded focus:outline-none focus:ring disabled:opacity-50 h-24"
              />
            ))}
          </div>
        </div>
        {/* Relações e História */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Relações e História</h2>
          <div className="grid grid-cols-1 gap-4">
            {['event_at_13','allies','enemies_threats','secrets','forbidden_desire'].map(field=> (
              <textarea
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                value={data[field]||''}
                onChange={handleChange}
                disabled={!isEditing}
                className="px-3 py-2 border rounded focus:outline-none focus:ring disabled:opacity-50 h-20"
              />
            ))}
          </div>
        </div>
        {/* Camadas de Ceúria */}
        <div className="col-span-full">
          <h2 className="text-2xl font-semibold mb-4">Camadas de Ceúria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['celurian_alignment','magic_access_level','lumenita_relation'].map(field=> (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                value={data[field]||''}
                onChange={handleChange}
                disabled={!isEditing}
                className={field==='lumenita_relation' ?
                  "col-span-full px-3 py-2 border rounded focus:outline-none focus:ring disabled:opacity-50" :
                  "px-3 py-2 border rounded focus:outline-none focus:ring disabled:opacity-50"}
              />
            ))}
          </div>
        </div>
      </form>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={toggleEdit}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {isEditing ? 'Salvar' : 'Editar'}
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition"
        >
          Exportar PDF
        </button>
        <button
          onClick={() => navigate('/home')}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
