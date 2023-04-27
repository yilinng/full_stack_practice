import React from "react";

export default function Total({ parts }) {
  const exercises_arr = parts.map((part) => part.exercises);
  const sumWithInitial = exercises_arr.reduce((pre, curr) => pre + curr, 0);
  return (
    <div>
      <p>Number of exercises {sumWithInitial}</p>
    </div>
  );
}
