import React, { useState } from "react";

import { Header } from "../components/Header";
import { MyTasksList } from "../components/MyTasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    if (newTaskTitle) {
      setTasks((old) => [...old, newTask]);
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const foundedTaskIndex = tasks.findIndex((task) => task.id === id);

    if (foundedTaskIndex >= 0) {
      const copyTasks = [...tasks];

      copyTasks[foundedTaskIndex].done = true;

      setTasks(copyTasks);
    }
  }

  function handleRemoveTask(id: number) {
    const verifyTasksExists = tasks.find((task) => task.id === id);

    if (verifyTasksExists) {
      setTasks((old) => old.filter((task) => task.id !== id));
    }
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}
