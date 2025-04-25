import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function NuevaContrasena() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    const res = await fetch(`http://localhost:3000/api/auth/restablecer/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nuevaContrasena }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.mensaje || "Error");

    setMensaje("✅ Contraseña restablecida. Redirigiendo...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/img/bienesraices.webp')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md text-white"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-white text-black text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
            N
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Nueva contraseña</h2>

        {mensaje && (
          <div className="bg-emerald-600 text-white p-2 rounded text-sm mb-4 text-center">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="bg-red-500 text-white p-2 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <div className="mb-6">
          <input
            type="password"
            placeholder="Ingrese su nueva contraseña"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            className="w-full p-3 rounded-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-full transition"
        >
          Restablecer
        </button>
      </form>
    </div>
  );
}
