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

  return (
    <div className="checklist">
      <h3>✅ {title}</h3>
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
  );
}
