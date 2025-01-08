import { router } from "expo-router";
import React, { useState } from "react";

import { db, schema } from "@/db";
import { TodoForm } from "@/features/todos/components/todo-form";

const NewTodoScreen = () => {
  const [loading, setLoading] = useState(false);

  async function onSubmit(text: string) {
    setLoading(true);
    await db.insert(schema.todos).values({ text });
    setLoading(false);
    router.back();
  }

  return <TodoForm loading={loading} onSubmit={onSubmit} />;
};

export default NewTodoScreen;
