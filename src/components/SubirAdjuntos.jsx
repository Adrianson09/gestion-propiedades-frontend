// components/SubirAdjuntos.jsx
import { useState } from "react";

export default function SubirAdjuntos({ propiedadId, onSubido }) {
  const [archivos, setArchivos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleSubir = async () => {
    if (archivos.length === 0) return;

    const formData = new FormData();
    archivos.forEach((file) => formData.append("adjuntos", file));

    const res = await fetch(`https://realnexor.com/api/propiedades/${propiedadId}/adjuntos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (res.ok) {
      setMensaje("✅ Archivos subidos correctamente");
      setArchivos([]);
      onSubido(); // actualizar lista
    } else {
      setMensaje("❌ Error al subir archivos");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Agregar nuevos adjuntos</h3>
      <input
        type="file"
        multiple
        onChange={(e) => setArchivos([...e.target.files])}
        className="w-full input p-2 bg-white/10 border border-white/20 rounded text-white"
      />
      <button
        onClick={handleSubir}
        className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-full font-bold"
      >
        Subir Archivos
      </button>
      {mensaje && <p className="mt-2 text-sm text-white">{mensaje}</p>}
    </div>
  );
}
