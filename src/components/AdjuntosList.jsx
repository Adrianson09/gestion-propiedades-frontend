import React from "react";
import { Trash2 } from "lucide-react";

export default function AdjuntosList({ adjuntos, onEliminar }) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">Archivos Adjuntos</h3>
      {adjuntos.length === 0 ? (
        <p className="text-gray-400">No hay archivos adjuntos.</p>
      ) : (
        <ul className="space-y-2">
          {adjuntos.map((file, index) => (
            <li
              key={index}
              className="flex  items-center justify-between bg-white/10 px-4 py-2 rounded-md border border-white/20 text-white"
            >
              <a
                href={`https://realnexor.com/${file.ruta_archivo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex-1 truncate text-emerald-700"
              >
                {file.nombre_archivo}
              </a>
              <button
                onClick={() => onEliminar(file.id)}
                className="ml-4 text-red-500 hover:text-red-700"
                title="Eliminar"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
