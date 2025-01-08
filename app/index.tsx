import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { ThemedText } from "@/components/ThemedText";
import { db } from "@/db";
import TodoItem from "@/features/todos/components/todo-item";
import { router } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";

export default function Index() {
  const { data, error } = useLiveQuery(db.query.todos.findMany());

  if (error) {
    return <ThemedText>Error: {error.message}</ThemedText>;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push(`/todos/${item.id}/edit`)}
        >
          <TodoItem item={item} />
        </TouchableOpacity>
      )}
    />
  );
}
