"use client";

import { useState } from "react";

const LABELS = [
  "",
  "😕 Mejorable",
  "🤔 Regular",
  "👍 Bien",
  "🌟 Muy bien",
  "🚀 Excelente",
];

interface FeedbackStarsProps {
  onRatingChange?: (rating: number) => void;
  currentRating?: number;
}

export default function FeedbackStars({ onRatingChange, currentRating = 0 }: FeedbackStarsProps) {
  const [internalRating, setInternalRating] = useState(0);
  
  const rating = currentRating || internalRating;

  const handleRating = (n: number) => {
    if (onRatingChange) {
      onRatingChange(n);
    } else {
      setInternalRating(n);
    }
  };

  return (
    <div>
      <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "8px" }}>
        Valoración general:
      </p>
      <div
        id="stars"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "20px",
        }}
      >
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <span
            key={starIndex}
            className={`star ${starIndex <= rating ? "active" : ""}`}
            onClick={() => handleRating(starIndex)}
            style={{
              fontSize: "28px",
              cursor: "pointer",
              transition: "transform .15s",
              filter: starIndex <= rating ? "none" : "grayscale(1) opacity(.4)",
              transform: starIndex <= rating ? "scale(1.1)" : "none",
            }}
          >
            ★
          </span>
        ))}
        {rating > 0 && (
          <span
            id="star-label"
            style={{ fontSize: "13px", color: "var(--muted)", marginLeft: "8px" }}
          >
            {LABELS[rating]}
          </span>
        )}
      </div>
    </div>
  );
}
