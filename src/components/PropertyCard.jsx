export default function PropertyCard({ propiedad, onEliminar }) {
  const {
    nombre,
    ubicacion,
    estado,
    inquilino_nombre,
    foto_principal,
    id,
  } = propiedad;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition hover:shadow-lg relative">
      <img
        src={`https://realnexor.com/uploads/${foto_principal || "placeholder.jpg"}`}
        alt={nombre}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{nombre}</h3>
        <p>{ubicacion}</p>
        <p className="text-sm mt-1 text-gray-500 dark:text-gray-300">
          Estado: <span className="font-medium">{estado}</span>
        </p>
        {inquilino_nombre && (
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Inquilino: {inquilino_nombre}
          </p>
        )}
        <div className="mt-4 flex justify-between">
          <a
            href={`/propiedad/${id}`}
            className="text-emerald-600 font-semibold hover:underline"
          >
            Ver detalles →
          </a>
          <button
            onClick={() => {
              if (window.confirm("¿Deseas eliminar esta propiedad?")) {
                onEliminar(id);
              }
            }}
            className="text-red-500 hover:underline text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
