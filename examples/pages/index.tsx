import { elixor } from "elixor";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        const res = elixor.get("https://jsonplaceholder.typicode.com/todos/1");
        res.subscribe((r) => console.log(r));
    }, []);
    return <h1>working</h1>;
};

export default Home;
