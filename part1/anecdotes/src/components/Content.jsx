import React from "react";
import Part from "./Part";

export default function Content({ parts }) {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.name} />
      ))}
    </div>
  );
}
