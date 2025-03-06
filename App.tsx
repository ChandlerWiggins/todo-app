/**
 * Todo App with Click-to-Complete
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos on load
  useEffect(() => {
    axios
      .get('http://localhost:3000/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
        setTodos([{ task: 'Error fetching todos', completed: false }]);
      });
  }, []);

  // Toggle completed status
  const toggleTodo = async (id, currentStatus) => {
    try {
      // Update backend
      await axios.put(`http://localhost:3000/todos/${id}`, {
        completed: !currentStatus,
      });
      // Update frontend
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !currentStatus } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todo List</Text>
      </View>
      <View style={styles.content}>
        {todos.length === 0 ? (
          <Text style={styles.emptyText}>No todos yet!</Text>
        ) : (
          todos.map((todo) => (
            <TouchableOpacity
              key={todo.id}
              style={styles.todoItem}
              onPress={() => toggleTodo(todo.id, todo.completed)}
            >
              <Text style={[styles.taskText, todo.completed && styles.completed]}>
                {todo.task}
              </Text>
              <Text style={styles.status}>
                {todo.completed ? 'Done' : 'Pending'}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  status: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});