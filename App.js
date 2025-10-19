// src/App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector, useDispatch } from 'react-redux';
//import store from 'src/features/auth/presentation/slices/storew';
import store from './src/features/auth/presentation/slices/store';
//import { initializeAuth } from '../ControlFinancieroFrom/src/features/auth/presentation/slices/authSlice'; // Importa la nueva acción
import { initializeAuth } from './src/features/auth/presentation/slices/authSlice'; // Importa la nueva acción

import { ActivityIndicator, View, StyleSheet } from 'react-native';

import LoginScreen from './src/features/auth/presentation/screens/LoginScreen';
import SignupScreen from './src/features/auth/presentation/screens/SignupScreen';
import CollaboratorDashboard from './src/features/auth/presentation/screens/CollaboratorDashboard';
import ClientDashboard from './src/features/auth/presentation/screens/ClientDashboard';
import AdminDashboard from './src/features/adminDashboard/presentation/screens/AdminDashboard';

const Stack = createStackNavigator();
const ROL_ADMIN = 2;
const ROL_COLABORADOR = 3;
const ROL_CLIENTE = 4;

const AppContent = () => {
  const { isAuthenticated, user, isInitializing } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5A58EE" />
      </View>
    );
  }

  if (isAuthenticated && user) {
    switch (user.id_rol) {
      case ROL_ADMIN:
        return <AdminDashboard />;

      case ROL_COLABORADOR:
        return (
          <Stack.Navigator>
            <Stack.Screen name="CollaboratorDashboard" component={CollaboratorDashboard} options={{ headerShown: false }} />
          </Stack.Navigator>
        );
      case ROL_CLIENTE:
        return (
          <Stack.Navigator>
            <Stack.Screen name="ClientDashboard" component={ClientDashboard} options={{ headerShown: false }} />
          </Stack.Navigator>
        );
      default:
        return (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        );
    }
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Crear Cuenta' }} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});