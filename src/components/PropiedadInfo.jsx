// components/PropiedadInfo.jsx
import React from "react";

export default function PropiedadInfo({ propiedad }) {
  const fields = [
    { label: "Nombre", key: "nombre" },
    { label: "Ubicación", key: "ubicacion" },
    { label: "Número de Finca", key: "numero_finca" },
    { label: "Tiene Préstamo", key: "prestamo" },
    { label: "Banco", key: "banco" },
    { label: "Número de Cuenta de Préstamo", key: "numero_cuenta_prestamo" },
    { label: "Cuota", key: "cuota" },
    { label: "Frecuencia de Pago", key: "frecuencia_pago" },
    { label: "Estado", key: "estado" },
    { label: "Nombre del Inquilino", key: "inquilino_nombre" },
    { label: "Teléfono del Inquilino", key: "inquilino_telefono" },
    { label: "Correo del Inquilino", key: "inquilino_correo" },
    { label: "Monto de Arriendo", key: "monto_arriendo" },
    { label: "Inicio del Contrato", key: "inicio_contrato" },
    { label: "Fecha de Pago", key: "fecha_pago" },
    { label: "Fecha de Pago al Banco", key: "fecha_pago_banco" },
    { label: "Municipalidad", key: "municipalidad" },
    { label: "Código de Pago en la Municipalidad", key: "codigo_pago_municipalidad" },
    { label: "Contrato Electricidad", key: "contrato_electricidad" },
    { label: "Contrato Agua", key: "contrato_agua" },
    { label: "Contrato Cable", key: "contrato_cable" },
    { label: "Contrato Internet", key: "contrato_internet" },
    { label: "Contrato Otros", key: "contrato_otros" },
    { label: "Correos de Referencia", key: "correos_referencia" },
    { label: "Notas", key: "notas" },
    { label: "Cuenta Bancaria para Depósito", key: "cuenta_bancaria_deposito" },
    { label: "Fecha de Creación", key: "fecha_creacion" },
  ];

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        let value = propiedad[field.key];
        if (field.key === "prestamo") {
          value = propiedad[field.key] ? "Sí" : "No";
        }
        if (!value || value === "") {
          value = "-";
        }
        return (
          <div key={field.key} className="flex flex-col md:flex-row md:justify-between border-b border-gray-300 py-2">
            <span className="font-bold md:w-1/3">{field.label}:</span>
            <span className="md:w-2/3">{value}</span>
          </div>
        );
      })}
    </div>
  );
}
