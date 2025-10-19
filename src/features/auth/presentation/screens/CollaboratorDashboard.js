import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CollaboratorDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola, soy Colaborador</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1c40f', // Color para diferenciar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CollaboratorDashboard;