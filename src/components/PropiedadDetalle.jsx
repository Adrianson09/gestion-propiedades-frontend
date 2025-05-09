// components/PropiedadDetalle.jsx
import { useState } from "react";

export default function PropiedadDetalle({ propiedad, onActualizar }) {
  const [form, setForm] = useState({
    nombre: propiedad.nombre || "",
    ubicacion: propiedad.ubicacion || "",
    numero_finca: propiedad.numero_finca || "",
    prestamo: Boolean(propiedad.prestamo),
    banco: propiedad.banco || "",
    numero_cuenta_prestamo: propiedad.numero_cuenta_prestamo || "",
    cuota: propiedad.cuota || "",
    frecuencia_pago: propiedad.frecuencia_pago || "",
    estado: propiedad.estado || "",
    inquilino_nombre: propiedad.inquilino_nombre || "",
    inquilino_telefono: propiedad.inquilino_telefono || "",
    inquilino_correo: propiedad.inquilino_correo || "",
    monto_arriendo: propiedad.monto_arriendo || "",
    inicio_contrato: propiedad.inicio_contrato ? propiedad.inicio_contrato.slice(0, 10) : "",
    fecha_pago: propiedad.fecha_pago ? propiedad.fecha_pago.slice(0, 10) : "",
    fecha_pago_banco: propiedad.fecha_pago_banco ? propiedad.fecha_pago_banco.slice(0, 10) : "",
    municipalidad: propiedad.municipalidad || "",
    codigo_pago_municipalidad: propiedad.codigo_pago_municipalidad || "",
    contrato_electricidad: propiedad.contrato_electricidad || "",
    contrato_agua: propiedad.contrato_agua || "",
    contrato_cable: propiedad.contrato_cable || "",
    contrato_internet: propiedad.contrato_internet || "",
    contrato_otros: propiedad.contrato_otros || "",
    correos_referencia: propiedad.correos_referencia || "",
    notas: propiedad.notas || "",
    cuenta_bancaria_deposito: propiedad.cuenta_bancaria_deposito || "",
  });
  const [nuevaFoto, setNuevaFoto] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        formData.append(key, value ? 1 : 0); // ✅ MySQL espera 0 o 1, no "true"/"false"
      } else {
        formData.append(key, value);
      }
    });
    if (nuevaFoto) {
      formData.append("foto_principal", nuevaFoto);
    }

    const res = await fetch(`https://realnexor.com/api/propiedades/${propiedad.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (res.ok) {
      onActualizar();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Editar Propiedad</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Datos generales */}
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} className="input border-2 border-b-emerald-300" />
        </div>
        <div>
          <label className="block text-sm mb-1">Ubicación</label>
          <input name="ubicacion" value={form.ubicacion} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Número de Finca</label>
          <input name="numero_finca" value={form.numero_finca} onChange={handleChange} className="input" />
        </div>

        {/* Información sobre préstamo */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="prestamo"
            checked={form.prestamo}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-emerald-600"
          />
          <label htmlFor="prestamo" className="text-sm">¿Tiene Préstamo?</label>
        </div>


        {form.prestamo === "true" && (
          <>
            <div>
              <label className="block text-sm mb-1">Banco</label>
              <input name="banco" value={form.banco} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm mb-1">Número de Cuenta de Préstamo</label>
              <input name="numero_cuenta_prestamo" value={form.numero_cuenta_prestamo} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm mb-1">Cuota</label>
              <input name="cuota" value={form.cuota} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm mb-1">Frecuencia de Pago</label>
              <input name="frecuencia_pago" value={form.frecuencia_pago} onChange={handleChange} className="input" />
            </div>
          </>
        )}

        {/* Estado e información del inquilino */}
        <div>
          <label className="block text-sm mb-1">Estado</label>
          <select name="estado" value={form.estado} onChange={handleChange} className="input">
            <option value="">Seleccione estado</option>
            <option value="Disponible">Disponible</option>
            <option value="Alquilada">Alquilada</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Construcción">Construcción</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Nombre del Inquilino</label>
          <input name="inquilino_nombre" value={form.inquilino_nombre} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Teléfono del Inquilino</label>
          <input name="inquilino_telefono" value={form.inquilino_telefono} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Correo del Inquilino</label>
          <input name="inquilino_correo" value={form.inquilino_correo} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Monto de Arriendo</label>
          <input name="monto_arriendo" value={form.monto_arriendo} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Cuenta Bancaria para Depósito</label>
          <input name="cuenta_bancaria_deposito" value={form.cuenta_bancaria_deposito} onChange={handleChange} className="input" />
        </div>

        {/* Fechas y contratos */}
        <div>
          <label className="block text-sm mb-1">Inicio del Contrato</label>
          <input type="date" name="inicio_contrato" value={form.inicio_contrato} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Fecha de Pago</label>
          <input type="date" name="fecha_pago" value={form.fecha_pago} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Fecha de Pago al Banco</label>
          <input type="date" name="fecha_pago_banco" value={form.fecha_pago_banco} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Municipalidad</label>
          <input name="municipalidad" value={form.municipalidad} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Código de Pago en la Municipalidad</label>
          <input name="codigo_pago_municipalidad" value={form.codigo_pago_municipalidad} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Contrato Electricidad</label>
          <input name="contrato_electricidad" value={form.contrato_electricidad} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Contrato Agua</label>
          <input name="contrato_agua" value={form.contrato_agua} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Contrato Cable</label>
          <input name="contrato_cable" value={form.contrato_cable} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Contrato Internet</label>
          <input name="contrato_internet" value={form.contrato_internet} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Contrato Otros</label>
          <input name="contrato_otros" value={form.contrato_otros} onChange={handleChange} className="input" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Correos de Referencia</label>
          <textarea name="correos_referencia" value={form.correos_referencia} onChange={handleChange} className="input" rows="3"></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Notas</label>
          <textarea name="notas" value={form.notas} onChange={handleChange} className="input" rows="3"></textarea>
        </div>
        {/* Actualizar foto principal */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Actualizar Foto Principal</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNuevaFoto(e.target.files[0])}
            className="input"
          />
        </div>
      </div>

      <div className="pt-4">
        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-md">
           Guardar Cambios
        </button>
      </div>
    </form>
  );
}
