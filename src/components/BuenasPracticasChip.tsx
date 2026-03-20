"use client";

export default function BuenasPracticasChip() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-terms"));
  };

  return (
    <button
      className="meta-pill"
      style={{
        cursor: "pointer",
        background: "rgba(123,94,167,0.15)",
        border: "1px solid rgba(123,94,167,0.4)",
        color: "#B89FD4",
      }}
      onClick={handleClick}
    >
      ℹ️ Buenas prácticas
    </button>
  );
}
