import { useState } from "react";
import LayoutForm from "../components/LayoutForm";
import { useNavigate } from "react-router-dom";

export default function NuevaPropiedad() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    nombre: "",
    ubicacion: "",
    numero_finca: "",
    prestamo: false,
    banco: "",
    numero_cuenta_prestamo: "",
    cuota: "",
    frecuencia_pago: "",
    estado: "",
    inquilino_nombre: "",
    inquilino_telefono: "",
    inquilino_correo: "",
    monto_arriendo: "",
    inicio_contrato: "",
    fecha_pago: "",
    fecha_pago_banco: "",
    municipalidad: "",
    codigo_pago_municipalidad: "",
    contrato_electricidad: "",
    contrato_agua: "",
    contrato_cable: "",
    contrato_internet: "",
    contrato_otros: "",
    correos_referencia: "",
    notas: "",
    cuenta_bancaria_deposito: "",
  });
  
  const [fotoPrincipal, setFotoPrincipal] = useState(null);
  const [adjuntos, setAdjuntos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleAdjuntosChange = (e) => {
    // Convierte FileList a Array
    setAdjuntos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const formData = new FormData();
    // Añadimos todos los campos del formulario
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        formData.append(key, value ? 1 : 0); // Booleano real → 1 o 0
      } else {
        formData.append(key, value);
      }
    });
    // Archivo de foto principal (único)
    if (fotoPrincipal) {
      formData.append("foto_principal", fotoPrincipal);
    }
    // Adjuntos (múltiples)
    if (adjuntos.length > 0) {
      adjuntos.forEach(file => formData.append("adjuntos", file));
    }

    const res = await fetch("http://localhost:3000/api/propiedades", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) return setMensaje(data.mensaje || "Error al registrar");

    setMensaje("¡Propiedad registrada exitosamente!");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <LayoutForm>
      <div className="my-8">
        <h2 className="text-2xl font-bold text-center mb-6">Nueva Propiedad</h2>
        {mensaje && (
          <div className="bg-emerald-600 text-white p-2 rounded text-sm text-center mb-4">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <label htmlFor="nombre" className="block text-sm mb-1">Nombre</label>
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="input" required />
          
          <label htmlFor="ubicacion" className="block text-sm mb-1">Ubicación</label>
          <input type="text" name="ubicacion" placeholder="Ubicación" value={form.ubicacion} onChange={handleChange} className="input" required />
          
          <label htmlFor="numero_finca" className="block text-sm mb-1">Número de Finca</label>
          <input type="text" name="numero_finca" placeholder="Número de Finca" value={form.numero_finca} onChange={handleChange} className="input" />

          <label className="flex items-center gap-2">
            <input type="checkbox" name="prestamo" checked={form.prestamo} onChange={handleChange} />
            ¿Tiene préstamo?
          </label>

          {form.prestamo && (
            <>
              <label htmlFor="banco" className="block text-sm mb-1">Banco</label>
              <input type="text" name="banco" placeholder="Banco" value={form.banco} onChange={handleChange} className="input" />
              <label htmlFor="numero_cuenta_prestamo" className="block text-sm mb-1">Número de Cuenta de Préstamo</label>
              <input type="text" name="numero_cuenta_prestamo" placeholder="N° cuenta préstamo" value={form.numero_cuenta_prestamo} onChange={handleChange} className="input" />
              <label htmlFor="cuota" className="block text-sm mb-1">Cuota</label>
              <input type="number" name="cuota" placeholder="Cuota mensual" value={form.cuota} onChange={handleChange} className="input" />
              <label htmlFor="frecuencia_pago" className="block text-sm mb-1">Frecuencia de pago</label>
              <input type="text" name="frecuencia_pago" placeholder="Frecuencia de pago" value={form.frecuencia_pago} onChange={handleChange} className="input" />
            </>
          )}
          <label htmlFor="estado" className="block text-sm mb-1">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className={` w-full p-3 rounded-md
               bg-white/20 text-white border border-white/30
                focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none `}
            required
          >
            <option className="text-black" value="">Seleccione estado</option>
            <option className="text-black" value="Disponible">Disponible</option>
            <option className="text-black" value="Alquilada">Alquilada</option>
            <option className="text-black" value="Construcción">Construcción</option>
            <option className="text-black" value="Mantenimiento">Mantenimiento</option>
          </select>
          <label htmlFor="inquilino_nombre" className="block text-sm mb-1">Nombre del inquilino</label>
          <input type="text" name="inquilino_nombre" placeholder="Nombre del inquilino" value={form.inquilino_nombre} onChange={handleChange} className="input" />
          <label htmlFor="inquilino_telefono" className="block text-sm mb-1">Teléfono del inquilino</label>
          <input type="tel" name="inquilino_telefono" placeholder="Teléfono del inquilino" value={form.inquilino_telefono} onChange={handleChange} className="input" />
          <label htmlFor="inquilino_correo" className="block text-sm mb-1">Correo del inquilino</label>
          <input type="email" name="inquilino_correo" placeholder="Correo del inquilino" value={form.inquilino_correo} onChange={handleChange} className="input" />
          <label htmlFor="monto_arriendo" className="block text-sm mb-1">Monto del arriendo</label>
          <input type="number" name="monto_arriendo" placeholder="Monto del arriendo" value={form.monto_arriendo} onChange={handleChange} className="input" />

          <label htmlFor="inicio_contrato" className="block text-sm mb-1">Inicio del contrato</label>
          <input type="date" name="inicio_contrato" value={form.inicio_contrato} onChange={handleChange} className="input" />

          <label htmlFor="fecha_pago" className="block text-sm mb-1">Fecha de pago mensual</label>
          <input type="date" name="fecha_pago" value={form.fecha_pago} onChange={handleChange} className="input" />
          
          <label htmlFor="cuenta_bancaria_deposito" className="block text-sm mb-1">Cuenta bancaria para depósito</label>
          <input type="text" name="cuenta_bancaria_deposito" placeholder="Cuenta bancaria para depósito" value={form.cuenta_bancaria_deposito} onChange={handleChange} className="input" />

          <label htmlFor="fecha_pago_banco" className="block text-sm mb-1">Fecha de pago al banco</label>
          <input type="date" name="fecha_pago_banco" value={form.fecha_pago_banco} onChange={handleChange} className="input" />
          <label htmlFor="municipalidad" className="block text-sm mb-1">Municipalidad</label>
          <input type="text" name="municipalidad" placeholder="Municipalidad" value={form.municipalidad} onChange={handleChange} className="input" />
          <label htmlFor="codigo_pago_municipalidad" className="block text-sm mb-1">Código de pago en la municipalidad</label>
          <input type="text" name="codigo_pago_municipalidad" placeholder="Código de pago en la municipalidad" value={form.codigo_pago_municipalidad} onChange={handleChange} className="input" />
          
          <label htmlFor="cuenta_bancaria_deposito" className="block text-sm mb-1">Cuenta bancaria para depósito</label>
          <input type="text" name="contrato_electricidad" placeholder="Contrato Electricidad" value={form.contrato_electricidad} onChange={handleChange} className="input" />
          <label htmlFor="cuenta_bancaria_deposito" className="block text-sm mb-1">Cuenta bancaria para depósito</label>
          <input type="text" name="contrato_agua" placeholder="Contrato Agua" value={form.contrato_agua} onChange={handleChange} className="input" />
          <label htmlFor="cuenta_bancaria_deposito" className="block text-sm mb-1">Cuenta bancaria para depósito</label>  
          <input type="text" name="contrato_cable" placeholder="Contrato Cable" value={form.contrato_cable} onChange={handleChange} className="input" />
          <label htmlFor="cuenta_bancaria_deposito" className="block text-sm mb-1">Cuenta bancaria para depósito</label>
          <input type="text" name="contrato_internet" placeholder="Contrato Internet" value={form.contrato_internet} onChange={handleChange} className="input" />
          <label htmlFor="cuenta_bancaria_deposito" className="block text-sm mb-1">Cuenta bancaria para depósito</label>
          <input type="text" name="contrato_otros" placeholder="Contrato Otros" value={form.contrato_otros} onChange={handleChange} className="input" />
          <label htmlFor="cuenta_bancaria_deposito" className="block text-sm mb-1">Cuenta bancaria para depósito</label>      
          <textarea name="correos_referencia" placeholder="Correos de referencia" value={form.correos_referencia} onChange={handleChange} className="input" rows="3"></textarea>
          <label htmlFor="cuenta_bancaria_deposito" className="block text-sm mb-1">Cuenta bancaria para depósito</label>  
          <textarea name="notas" placeholder="Notas" value={form.notas} onChange={handleChange} className="input" rows="3"></textarea>

          <label className="block text-sm mb-1">Foto principal</label>
          <input type="file" accept="image/*" onChange={(e) => setFotoPrincipal(e.target.files[0])} className="input" />

          <label className="block text-sm mb-1">Archivos adjuntos</label>
          <input type="file" multiple onChange={handleAdjuntosChange} className="input" />

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 px-4 rounded-md font-bold">
            Guardar Propiedad
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-md font-bold mt-2"
          >
            Cancelar y volver
          </button>
        </form>
      </div>
    </LayoutForm>
  );
}
