/**
 * Sample React Native App with Axios Test
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [todo, setTodo] = useState<string>('Loading...');

  useEffect(() => {
    // Fetch a sample todo from JSONPlaceholder
    axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        setTodo(response.data.title); // Display the todo title
      })
      .catch((error) => {
        console.error(error);
        setTodo('Failed to fetch todo');
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Todo App</Text>
        <Text style={styles.text}>Sample Todo: {todo}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});