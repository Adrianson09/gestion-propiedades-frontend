import { useState } from "react";
import LayoutForm from "../components/LayoutForm";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    contrasena: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const res = await fetch("https://realnexor.com/api/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return setMensaje(data.mensaje || "Error al registrar");

    setMensaje("¡Registro exitoso! Revise su correo para confirmar.");
  };

  return (
    <LayoutForm>
      <div className="flex justify-center mb-6">
        <div className="bg-white text-black text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
          N
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Crear cuenta</h2>

      {mensaje && (
        <div className="bg-emerald-600 p-2 text-center text-sm rounded mb-4">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-3 rounded-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          className="w-full p-3 rounded-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="w-full p-3 rounded-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={handleChange}
          className="w-full p-3 rounded-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-full transition"
        >
          Registrarse
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-emerald-300">
        ¿Ya tiene cuenta?{" "}
        <a href="/login" className="underline hover:text-white">
          Iniciar sesión
        </a>
      </p>
    </LayoutForm>
  );
}
