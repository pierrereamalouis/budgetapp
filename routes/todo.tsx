import { useEffect, useState } from "preact/hooks";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const getTodos = async () => {
  await wait(500);
  return [
    { id: 1, text: "learn Preact", done: false },
    { id: 2, text: "make an awesome app", done: false },
  ];
};

export default function TodoList() {
  // const [todos, setTodos] = useState(["wake up", "make bed"]);

  const todos = ["wake up", "make bed", "brush my teeth"];

  // function wakeUp() {
  //   setTodos(["make bed"]);
  // }

  return (
    <div>
      <ul>
        {todos.map((todo) => <li>{todo}</li>)}
      </ul>
      {/* <button onClick={wakeUp}>I'm Awake!</button> */}
    </div>
  );
}
