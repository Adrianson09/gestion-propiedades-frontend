import { useState } from "react";
import LayoutForm from "../components/LayoutForm";

export default function Recuperar() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const res = await fetch("https://realnexor.com/api/auth/recuperar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo }),
    });

    const data = await res.json();
    if (!res.ok) return setMensaje(data.mensaje || "Error");

    setMensaje("Se ha enviado un enlace a su correo para restablecer la contraseña.");
  };

  return (
    <LayoutForm>
      <div className="flex justify-center mb-6">
        <div className="bg-white text-black text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
          N
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Recuperar contraseña</h2>

      {mensaje && (
        <div className="bg-emerald-600 p-2 text-center text-sm rounded mb-4">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Correo registrado"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-3 rounded-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-full transition"
        >
          Enviar enlace
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-emerald-300">
        ¿Recordó su contraseña?{" "}
        <a href="/login" className="underline hover:text-white">
          Iniciar sesión
        </a>
      </p>
    </LayoutForm>
  );
}
