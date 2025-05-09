// pages/VerPropiedad.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropiedadDetalle from "../components/PropiedadDetalle";
import PropiedadInfo from "../components/PropiedadInfo";
import SubirAdjuntos from "../components/SubirAdjuntos";
import AdjuntosList from "../components/AdjuntosList";
import { Pencil } from "lucide-react";

export default function VerPropiedad() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [propiedad, setPropiedad] = useState(null);
  const [adjuntos, setAdjuntos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(storedUser);
    fetchDatos();
  }, [id]);

  const fetchDatos = async () => {
    try {
      const resProp = await fetch(`https://realnexor.com/api/propiedades/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const resAdj = await fetch(`https://realnexor.com/api/propiedades/${id}/adjuntos`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const dataProp = await resProp.json();
      const dataAdj = await resAdj.json();

      setPropiedad(dataProp);
      setAdjuntos(dataAdj);
    } catch (error) {
      console.error("Error fetching property data", error);
    }
  };

  if (!propiedad) return <p className="p-6">Cargando propiedad...</p>;

  const eliminarAdjunto = async (idAdjunto) => {
    const confirm = window.confirm("¿Seguro que deseas eliminar este archivo?");
    if (!confirm) return;
  
    const res = await fetch(`https://realnexor.com/api/propiedades/adjuntos/${idAdjunto}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    if (res.ok) {
      fetchDatos(); // vuelve a cargar adjuntos
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar usuario={usuario} />

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-emerald-600 hover:underline"
          >
            ← Volver al Dashboard
          </button>
          <button
            onClick={() => setModoEdicion((prev) => !prev)}
            title="Editar propiedad"
            className="text-gray-500 flex gap-2 hover:text-emerald-600"
          >
           <p>Editar </p>  <Pencil size={20} />
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-4">{propiedad.nombre || "Sin nombre"}</h1>

        {propiedad.foto_principal && (
          <img
            src={`https://realnexor.com/uploads/${propiedad.foto_principal}`}
            alt={propiedad.nombre}
            className="w-full max-h-96 object-cover rounded-xl shadow mb-6"
          />
        )}

        {modoEdicion ? (
          <>
            <PropiedadDetalle
              propiedad={propiedad}
              onActualizar={() => {
                fetchDatos();
                setModoEdicion(false);
              }}
            />
            <SubirAdjuntos propiedadId={id} onSubido={fetchDatos} />
          </>
        ) : (
          <>
            <PropiedadInfo propiedad={propiedad} />
            <AdjuntosList adjuntos={adjuntos} onEliminar={eliminarAdjunto} />
          </>
        )}
      </div>
    </div>
  );
}
