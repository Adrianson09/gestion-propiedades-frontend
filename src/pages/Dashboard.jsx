import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(storedUser);

    const fetchPropiedades = async () => {
      const res = await fetch("https://realnexor.com/api/propiedades", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setPropiedades(data);
    };

    fetchPropiedades();
  }, []);


  const eliminarPropiedad = async (id) => {
    const res = await fetch(`https://realnexor.com/api/propiedades/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    if (res.ok) {
      setPropiedades((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Error al eliminar propiedad");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      {usuario && <Navbar usuario={usuario} />}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Encabezado */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Bienvenido, {usuario?.nombre}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Aquí puedes ver y administrar tus propiedades inmobiliarias.
          </p>
        </header>

        {/* Botón para agregar propiedad */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Tus propiedades</h2>
          <a
            href="/nueva-propiedad"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            + Nueva propiedad
          </a>
        </div>

        {/* Listado de propiedades */}
        {propiedades.length === 0 ? (
          <p className="text-gray-500">No hay propiedades registradas aún.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {propiedades.map((prop) => (
              <PropertyCard key={prop.id} propiedad={prop} onEliminar={eliminarPropiedad}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
