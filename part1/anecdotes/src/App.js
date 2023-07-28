import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const handleClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    //console.log(anecdotes[random]);
    setSelected(random);
  };

  const pickMostVote = () => {
    const indexOfMaxVal = points.reduce(
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0
    );
    console.log("points", points);
    console.log("indexOfMaxVal", indexOfMaxVal);

    return indexOfMaxVal;
  };

  const handleVote = () => {
    // increment the property 2 value by one
    console.log(selected);
    const copy = [...points];
    copy[selected] += 1;
    setPoints([...copy]);
    console.log("handleVote copy", copy);

    pickMostVote();
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h3>{anecdotes[selected]}</h3>
      <h3>has {points[selected]} votes</h3>

      <button type="button" onClick={handleVote}>
        vote
      </button>
      <button type="button" onClick={handleClick}>
        next anecdote
      </button>

      <h1>Anecdote with most votes</h1>

      <h3>{anecdotes[pickMostVote()]}</h3>
      <h3>has {pickMostVote()} votes</h3>
    </div>
  );
};

export default App;
