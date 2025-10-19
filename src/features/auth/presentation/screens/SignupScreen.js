// src/features/auth/presentation/screens/SignupScreen.js

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchRoles } from '../../../../core/api/Usuario/apiUsuarioService';
import { registerUserUseCase } from '../../domain/useCases/registerUserUseCase'; // Aquí está la importación

const SignupScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  
  useEffect(() => {
    const getRoles = async () => {
      const fetchedRoles = await fetchRoles();
      setRoles(fetchedRoles);
      const defaultRole = fetchedRoles.find(role => role.id === 4);
      if (defaultRole) {
        setSelectedRole(defaultRole.id);
      } else if (fetchedRoles.length > 0) {
        setSelectedRole(fetchedRoles[0].id);
      }
    };
    getRoles();
  }, []);

  const handleSignup = async () => {
    setLoading(true);
    
    // Aquí se crea el objeto que coincide con tu interfaz
    const userData = {
      nombre,
      correo,
      contrasena,
      id_rol: 1,
      numero_telefono: numeroTelefono,
      numero_identificacion: numeroIdentificacion,
      codigo_punto_emision_movil: "", // Valor fijo
    };

    try {
      // Se llama al caso de uso con el objeto de datos
      const result = await registerUserUseCase(userData);

      if (result.success) {
        console.log('Registro exitoso:', result.user);
        alert('¡Usuario registrado con éxito!');
        navigation.navigate('Login');
      } else {
        console.error('Error en el registro:', result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>Únete a la plataforma</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#888"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={correo}
              onChangeText={setCorreo}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#888"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Número de teléfono"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={numeroTelefono}
              onChangeText={setNumeroTelefono}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Número de identificación"
              placeholderTextColor="#888"
              keyboardType="number-pad"
              value={numeroIdentificacion}
              onChangeText={setNumeroIdentificacion}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={handleSignup}
            disabled={loading}>
            <LinearGradient
              colors={['#84A5FF', '#5A58EE']}
              style={[styles.buttonGradient, { opacity: loading ? 0.7 : 1 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Registrarse</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Ingresa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F2F5' },
  container: { flex: 1, padding: 24 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 34, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 50 },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#E0E5EC',
    borderRadius: 12,
    marginBottom: 20,
    ...Platform.select({
      ios: { shadowColor: '#A3B1C6', shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10 },
      android: { elevation: 10 },
    }),
  },
  input: {
    width: '100%',
    height: 55,
    paddingHorizontal: 18,
    color: '#333',
    fontSize: 17,
  },
  picker: {
    width: '100%',
    height: 55,
    color: '#333',
    fontSize: 17,
  },
  bottomContainer: { paddingTop: 20, paddingBottom: Platform.OS === 'ios' ? 0 : 20 },
  buttonWrapper: {
    width: '100%',
    borderRadius: 12,
    ...Platform.select({
      ios: { shadowColor: '#5A58EE', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10 },
      android: { elevation: 12 },
    }),
  },
  buttonGradient: { width: '100%', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 19, fontWeight: 'bold' },
  loginContainer: { flexDirection: 'row', marginTop: 20, justifyContent: 'center' },
  loginText: { color: '#666', fontSize: 15 },
  loginLink: { color: '#5A58EE', fontWeight: 'bold', fontSize: 15 },
});

export default SignupScreen;