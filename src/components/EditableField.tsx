"use client";

import { useState, useEffect } from "react";

interface EditableFieldProps {
  id: string;
  type?: "textarea" | "input";
  variant?: "dark" | "light";
  placeholder?: string;
  rows?: number;
  label?: string;
}

export default function EditableField({
  id,
  type = "textarea",
  variant = "dark",
  placeholder,
  rows = 4,
  label,
}: EditableFieldProps) {
  const [value, setValue] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadValue = () => {
      const saved = sessionStorage.getItem(`wa_${id}`);
      setValue(saved || "");
    };

    loadValue();

    // Escuchar cambios externos (de EjercicioIA o otras pestañas)
    window.addEventListener("storage", loadValue);
    return () => window.removeEventListener("storage", loadValue);
  }, [id]);

  const handleChange = (val: string) => {
    setValue(val);
    sessionStorage.setItem(`wa_${id}`, val);
  };

  const baseClassName = variant === "dark" ? "nota" : "nota-light";

  return (
    <div className="field-group">
      {label && <label className="field-label">{label}</label>}
      {mounted ? (
        type === "textarea" ? (
          <textarea
            className={baseClassName}
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        ) : (
          <input
            className={baseClassName}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        )
      ) : (
        <div className={baseClassName} style={{ minHeight: type === "textarea" ? "72px" : "40px" }} />
      )}
    </div>
  );
}
