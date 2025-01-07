"use client";

import React from "react";

interface TaskListProps {
  tasks: string[];
  onRemoveTask: (index: number) => void;
  onEditTask: (index: number) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onRemoveTask, onEditTask }) => {
  return (
    <div className="w-full flex flex-col items-center gap-3 mt-5">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div
            key={index}
            className="w-80 h-[auto] shadow-custom-dark rounded-xl px-3 py-2 flex items-center justify-between bg-gray-100"
          >
            <span className="break-words w-[60%] pr-3">{task}</span>
            <div className="flex gap-2">
              <button
                className="text-blue-500 font-semibold hover:underline"
                onClick={() => onEditTask(index)}
                >
                Editar
              </button>
              <button
                className="text-red-500 font-semibold hover:underline"
                onClick={() => onRemoveTask(index)}
              >
                Remover
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Nenhuma tarefa adicionada</p>
      )}
    </div>
  );
};

export default TaskList;
