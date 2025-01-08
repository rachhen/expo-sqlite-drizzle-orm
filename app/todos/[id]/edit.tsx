import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

import { ThemedText } from "@/components/ThemedText";
import { db, schema } from "@/db";
import { TodoForm } from "@/features/todos/components/todo-form";
import { eq } from "drizzle-orm";

const EditTodoScreen = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const id = parseInt(params.id);
  const [loading, setLoading] = useState(false);
  const { data, error } = useLiveQuery(
    db.query.todos.findFirst({ where: (fields, { eq }) => eq(fields.id, id) })
  );

  async function onSubmit(text: string) {
    setLoading(true);
    await db.update(schema.todos).set({ text }).where(eq(schema.todos.id, id));
    setLoading(false);
    router.back();
  }

  if (error) {
    return <ThemedText>Got error: {error.message}</ThemedText>;
  }

  if (!data) {
    return <ThemedText>Not Found</ThemedText>;
  }

  return (
    <TodoForm
      buttonText="Update Todo"
      defaultValue={data.text}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default EditTodoScreen;
