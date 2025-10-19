import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hola, soy el dashboard principal del administrador.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
  },
});

export default MainDashboardScreen;