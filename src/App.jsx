import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Recuperar from "./pages/Recuperar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NuevaPropiedad from "./pages/NuevaPropiedad";
import VerPropiedad from "./pages/VerPropiedad";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar" element={<Recuperar />} />
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
