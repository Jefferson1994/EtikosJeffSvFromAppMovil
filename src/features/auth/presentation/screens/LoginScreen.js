// src/features/auth/presentation/screens/LoginScreen.js

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { setLoading, loginSuccess, loginFailure } from '../slices/authSlice';
import { loginUseCase } from '../../domain/useCases/loginUseCase'; // Importamos el caso de uso

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    dispatch(setLoading(true));
    
    // 1. Llamada al caso de uso real.
    const result = await loginUseCase(email, password);

    // 2. Manejo de la respuesta
    if (result.success) {
      dispatch(loginSuccess({ user: result.user, token: result.token }));
      console.log("¡Inicio de sesión exitoso!");
      // La navegación se gestiona en App.js gracias al estado de Redux.
    } else {
      dispatch(loginFailure(result.error));
      console.error("Error de inicio de sesión:", result.error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título y subtítulo */}
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Ingresa tus credenciales para continuar. </Text>

      {/* Inputs del formulario con sombras sutiles */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Botón principal con gradiente y sombras */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={handleLogin}
        disabled={loading}>
        <LinearGradient
          colors={['#84A5FF', '#5A58EE']}
          style={[styles.buttonGradient, { opacity: loading ? 0.7 : 1 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Enlaces de ayuda */}
      <TouchableOpacity
        style={styles.forgotPasswordLink}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Enlace para crear una cuenta */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 50,
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#E0E5EC',
    borderRadius: 12,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#A3B1C6',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  input: {
    width: '100%',
    height: 55,
    paddingHorizontal: 18,
    color: '#333',
    fontSize: 17,
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 12,
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#5A58EE',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  buttonGradient: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  forgotPasswordLink: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  linkText: {
    color: '#5A58EE',
    fontSize: 15,
  },
  errorText: {
    color: '#FF6347',
    marginTop: 30,
    fontSize: 15,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  signupText: {
    color: '#666',
    fontSize: 15,
  },
  signupLink: {
    color: '#5A58EE',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default LoginScreen;