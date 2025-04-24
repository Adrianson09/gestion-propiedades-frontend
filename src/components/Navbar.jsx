import { useNavigate } from "react-router-dom";

export default function Navbar({ usuario }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <nav className="bg-emerald-600 text-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-white text-emerald-600 font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg">
          N
        </div>
        <span className="text-lg font-semibold">Gestión de Propiedades</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:block">Hola, {usuario?.nombre}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
