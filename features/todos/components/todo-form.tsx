import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

type Props = {
  loading?: boolean;
  defaultValue?: string;
  buttonText?: string;
  onSubmit: (value: string) => void;
};
export function TodoForm({
  loading,
  defaultValue,
  buttonText,
  onSubmit,
}: Props) {
  const inputColor = useThemeColor({}, "text");
  const [todo, setTodo] = useState(defaultValue ?? "");

  return (
    <ThemedView style={{ margin: 12, padding: 12, borderRadius: 12, gap: 12 }}>
      <ThemedView>
        <ThemedText style={{ fontSize: 14 }}>Enter Todo</ThemedText>
        <TextInput
          value={todo}
          onChangeText={(text) => setTodo(text)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 12,
            color: inputColor,
            borderRadius: 12,
          }}
          onEndEditing={() => onSubmit(todo)}
        />
      </ThemedView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onSubmit(todo)}
        disabled={loading}
        style={{
          backgroundColor: "#0a7ea4",
          borderRadius: 12,
          padding: 8,
          alignItems: "center",
        }}
      >
        <ThemedText>
          {loading ? "Adding..." : buttonText ?? "Add Todo"}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
