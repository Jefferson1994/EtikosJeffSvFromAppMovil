// src/features/client/ClientDashboard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClientDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola, soy Cliente</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27ae60', // Color para diferenciar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ClientDashboard;