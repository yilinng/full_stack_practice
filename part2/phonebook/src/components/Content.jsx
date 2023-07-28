import React from "react";
import Part from "./Part";

export default function Content({ parts }) {
  //https://stackoverflow.com/questions/5732043/how-to-call-reduce-on-an-array-of-objects-to-sum-their-properties
  const total = parts.reduce((s, p) => ({
    exercises: s.exercises + p.exercises,
  })); // returns object with property exercises

  console.log("total", total);
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.name} />
      ))}
      <h3>total of {total.exercises} exercises</h3>
    </div>
  );
}
