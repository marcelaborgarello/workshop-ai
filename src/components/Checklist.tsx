"use client";

import { useState } from "react";

interface ChecklistItem {
  id: string;
  text: string;
}

interface ChecklistProps {
  title: string;
  items: ChecklistItem[];
}

export default function Checklist({ title, items }: ChecklistProps) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedIds(next);
  };

  const isAllDone = items.length > 0 && checkedIds.size === items.length;

  return (
    <div className={`checklist transition-all duration-500 ${isAllDone ? "border-[#7FB069]/40 bg-[#7FB069]/5" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h3>✅ {title}</h3>
        {isAllDone && (
          <span className="text-[10px] bg-[#7FB069] text-white px-2 py-0.5 rounded-full font-bold animate-bounce shadow-sm">
            ¡COMPLETADO!
          </span>
        )}
      </div>

      <div className="space-y-1">
        {items.map((item) => {
          const isDone = checkedIds.has(item.id);
          return (
            <label
              key={item.id}
              className={`check-item ${isDone ? "done" : ""}`}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => toggleCheck(item.id)}
              />
              <span className="check-text">{item.text}</span>
            </label>
          );
        })}
      </div>

      {isAllDone && (
        <div className="mt-4 p-3 bg-[#7FB069]/20 border border-[#7FB069]/30 rounded-xl animate-in zoom-in-95 fade-in duration-500">
          <p className="text-sm font-bold text-[#E8F0EE] flex items-center gap-2">
            ✨ ¡Felicitaciones! Cumplís con las reglas de uso responsable de IA.
          </p>
        </div>
      )}
    </div>
  );
}
