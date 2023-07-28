import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr className="statistic">
      <th>{props.text}</th>
      <td>{props.value}</td>
    </tr>
  );
};

// a proper place to define a component
const Statistics = (props) => {
  //console.log(props, "from statistic");

  if ("good" in props === false) return <h2>No feedback given</h2>;

  const { good, neutral, bad } = props;

  const handleTotal = () => {
    return good + neutral + bad;
  };

  const handleAverage = () => {
    const positive = good - bad;
    return handleTotal() === 0 ? 0 : positive / handleTotal();
  };

  const handlePositive = () => {
    return handleTotal() === 0 ? 0 : good / handleTotal();
  };
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={handleTotal()} />
      <StatisticLine text="average" value={handleAverage()} />
      <StatisticLine text="positive" value={handlePositive()} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button type="button" onClick={() => setGood(good + 1)}>
        good
      </button>
      <button type="button" onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button type="button" onClick={() => setBad(bad + 1)}>
        bad
      </button>

      <h1>statistic</h1>

      <table>
        <tbody>
          <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
  );
};

export default App;
