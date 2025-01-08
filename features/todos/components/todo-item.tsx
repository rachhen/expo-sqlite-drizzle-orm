import { eq } from "drizzle-orm";
import React from "react";
import { TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { db, schema } from "@/db";
import { Todo } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  item: Todo;
};
const TodoItem = ({ item }: Props) => {
  const color = useThemeColor({}, "tint");

  async function handleToggle() {
    await db
      .update(schema.todos)
      .set({ done: !item.done })
      .where(eq(schema.todos.id, item.id));
  }

  async function handleRemove() {
    await db.delete(schema.todos).where(eq(schema.todos.id, item.id));
  }

  return (
    <ThemedView
      style={{
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        justifyContent: "space-between",
      }}
    >
      <ThemedView style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleToggle}>
          <ThemedView
            style={{
              borderWidth: 1,
              borderColor: color,
              width: 24,
              height: 24,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            {item.done ? (
              <IconSymbol name="checkmark" color={color} size={12} />
            ) : null}
          </ThemedView>
        </TouchableOpacity>
        <ThemedText style={item.done && { textDecorationLine: "line-through" }}>
          {item.text}
        </ThemedText>
      </ThemedView>
      <TouchableOpacity activeOpacity={0.7} onPress={handleRemove}>
        <IconSymbol name="trash" color="red" size={18} />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default TodoItem;
