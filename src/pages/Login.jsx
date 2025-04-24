import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.mensaje || "Error al iniciar sesión");

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/img/bienesraices.webp')" }}
    >
      {/* overlay oscuro */}
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

        <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-3 rounded-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full p-3 rounded-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-full transition"
        >
          Entrar
        </button>

        <div className="text-center mt-4 text-sm space-y-2">
          <p>
            ¿Olvidó su contraseña?{" "}
            <a href="/recuperar" className="underline text-emerald-300 hover:text-white">
              Restablecer
            </a>
          </p>
          <p>
            ¿No tiene cuenta?{" "}
            <a href="/registro" className="underline text-emerald-300 hover:text-white">
              Registrarse
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}