import React, { useState } from "react";

const Counter = ({ label }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>{label}</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const BuggyCounter = () => {
  const [reverse, setReverse] = useState(false);

  const counters = [{ label: "Counter A" }, { label: "Counter B" }];

  const displayCounters = reverse ? [...counters].reverse() : counters;

  return (
    <div>
      <button onClick={() => setReverse(!reverse)}>Reverse Order</button>

      <div style={{ display: "flex", gap: "20px" }}>
        {displayCounters.map((counter) => (
          <Counter label={counter.label} />
        ))}
      </div>
    </div>
  );
};

export default BuggyCounter;
