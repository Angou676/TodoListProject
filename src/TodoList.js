import React, { useState, useRef } from "react";
import "./App.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  const addTodo = () => {
    if (todoInput.length > 0) {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = todoInput;
        setTodos(updatedTodos);
        setEditIndex(null);
        setTodoInput("");
      } else {
        setTodos([...todos, todoInput]);
        setTodoInput("");
      }
    } else {
      inputRef.current.focus();
      // alert("Please start typing before adding a todo!");
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  const editTodo = (index) => {
    setTodoInput(todos[index]);
    setEditIndex(index);
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <h1>My Todo List</h1>
      <section>
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Start typing"
          ref={inputRef}
        />
        <button onClick={addTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </section>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {index + 1}. {todo}
            <div>
              <svg
                onClick={() => editTodo(index)}
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
                fill="#3498db"
                alt="Edit icon"
              >
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
              <svg
                onClick={() => removeTodo(index)}
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
                fill="red"
                alt="Remove icon"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
