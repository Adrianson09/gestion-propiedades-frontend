import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Recuperar from "./pages/Recuperar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NuevaPropiedad from "./pages/NuevaPropiedad";
import VerPropiedad from "./pages/VerPropiedad";
import NuevaContrasena from "./pages/NuevaContrasena";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


function App() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const confirmado = params.get("confirmado");

    if (confirmado === "true") {
      alert("✅ ¡Correo confirmado exitosamente!");
      // también podrías hacer: window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route path="/nueva-contrasena/:token" element={<NuevaContrasena />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nueva-propiedad"
        element={
          <ProtectedRoute>
            <NuevaPropiedad />
          </ProtectedRoute>
        }
      />
      <Route
        path="/propiedad/:id"
        element={
          <ProtectedRoute>
            <VerPropiedad />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
