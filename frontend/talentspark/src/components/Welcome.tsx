import { useState } from "react";

function Welcome() {
    const [count, setCount] = useState(0);
    const increment = () => setCount((prev) => prev + 1);

    return (
        <section>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
        </section>
    );
}

export default Welcome;
