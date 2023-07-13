import { useEffect } from "react";
import { useState } from "react";
import { NewToDoForm } from "./NewToDoForm";
import "./styles.css";
import { ToDoList } from "./ToDoList";

export default function App() {
  const [toDos, setToDos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) {
      return [];
    }
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(toDos));
  }, [toDos]);

  function addToDo(title) {
    setToDos((currentToDos) => {
      return [
        ...currentToDos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleToDo(id, completed) {
    setToDos((currentToDos) => {
      return currentToDos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteToDo(id) {
    setToDos((currentToDos) => {
      return currentToDos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewToDoForm addToDo={addToDo} />

      <h1 className="header">To Do List</h1>
      <ToDoList toDos={toDos} toggleToDo={toggleToDo} deleteToDo={deleteToDo} />
    </>
  );
}
