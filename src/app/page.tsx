"use client";

import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      if (editingIndex !== null) {
        setTasks((prevTasks) =>
          prevTasks.map((task, index) =>
            index === editingIndex ? taskInput : task
          )
        );
        setEditingIndex(null);
      } else {
        setTasks((prevTasks) => [...prevTasks, taskInput]);
      }
      setTaskInput("");
    }
  };

  const removeTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const editTask = (index: number) => {
    setTaskInput(tasks[index]);
    setEditingIndex(index);
  };

  return (
    <>
      <section className="w-full h-full py-10 flex flex-col items-center justify-center">
        <div className="w-80 h-60 rounded-xl shadow-custom-dark py-1 px-3 flex flex-col justify-around items-center">
          <h1 className="font-semibold text-2xl">Adicionar Tarefa</h1>
          <input
            type="text"
            placeholder="Digite aqui..."
            value={taskInput}
            className="w-full shadow-custom-dark h-12 rounded-xl px-3 outline-none"
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <input
            type="button"
            value="Adicionar"
            onClick={addTask}
            className="w-1/2 h-10 shadow-custom-dark bg-sky-700 rounded-xl cursor-pointer text-white font-semibold"
          />
        </div>

        <TaskList
          tasks={tasks}
          onRemoveTask={removeTask}
          onEditTask={editTask}
        />
      </section>
    </>
  );
}
