// src/features/auth/presentation/screens/LoginScreen.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Modal, // Importamos el Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { setLoading, loginSuccess, loginFailure } from '../slices/authSlice';

// 1. IMPORTAMOS AMBOS CASOS DE USO
import { loginUseCase } from '../../domain/useCases/loginUseCase';
// Asumo que el caso de uso de validar OTP está en un archivo separado
import { validarOtpLoginUseCase } from '../../domain/useCases/loginUseCase'; 

// 2. IMPORTAMOS LOS TIPOS Y LAS INTERFACES
import { 
  LoginResult, 
  UserResponse, 
  TwoFactorRequiredResponse,
  UserverificarCuenta, // El tipo para el OTP
} from '../../domain/interfaces/user'; 

// --- Type Guards ---
// Estas funciones nos ayudan a saber qué tipo de respuesta obtuvimos
function isUserResponse(result: LoginResult): result is UserResponse {
  return (result as UserResponse).token !== undefined;
}

function isTwoFactorResponse(result: LoginResult): result is TwoFactorRequiredResponse {
  return (result as TwoFactorRequiredResponse).twoFactorRequired === true;
}
// ---------------------

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Tipar el estado de Redux (opcional pero recomendado)
  const { loading, error } = useSelector((state: any) => state.auth); // 'any' por simpleza

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- NUEVOS ESTADOS PARA EL MODAL ---
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState(''); // Para el input de OTP
  const [isVerifying, setIsVerifying] = useState(false); // Loading del modal
  const [modalError, setModalError] = useState<string | null>(null); // Error del modal
  // ----------------------------------------

  const handleLogin = async () => {
    dispatch(setLoading(true));
    
    try {
      // 3. LLAMADA CORRECTA AL CASO DE USO
      // Le pasamos un solo objeto { email, password }
      const result = await loginUseCase({ email, password });

      // 4. MANEJO DE LA RESPUESTA (CON TYPE GUARDS)
      if (isUserResponse(result)) {
        // CASO 1: Login exitoso (con token)
        dispatch(loginSuccess({ user: result.user, token: result.token }));
        console.log("¡Inicio de sesión exitoso!");
        // La navegación se gestiona en App.js gracias al estado de Redux.

      } else if (isTwoFactorResponse(result)) {
        // CASO 2: Se requiere 2FA
        console.log(result.message);
        dispatch(setLoading(false)); // Detenemos el loading principal
        setModalError(null); // Limpiamos error del modal
        setIsModalVisible(true); // <-- ABRIMOS EL MODAL
      
      } else {
        // Esto no debería pasar si los tipos están bien
        dispatch(loginFailure('Respuesta inesperada del servidor.'));
      }

    } catch (err: any) {
      // 5. MANEJO DE ERRORES (EL 'CATCH')
      // Capturamos el error que 'lanzó' (throw) el caso de uso
      const errorMessage = err.message || 'Ocurrió un error desconocido.';
      dispatch(loginFailure(errorMessage));
      console.error("Error de inicio de sesión:", errorMessage);
    }
  };



  // --- NUEVA FUNCIÓN PARA VERIFICAR EL CÓDIGO ---
  const handleVerifyCode = async () => {
    setIsVerifying(true);
    setModalError(null);

    const otpCredentials: UserverificarCuenta = {
      correo: email, // El email del estado principal
      codigoOtp: verificationCode, // El código del estado del modal
    };

    try {
      // Llamamos al caso de uso que tradujiste
      const result = await validarOtpLoginUseCase(otpCredentials);

      // El caso de uso devuelve LoginResult, volvemos a chequear
      if (isUserResponse(result)) {
        // ¡ÉXITO FINAL!
        dispatch(loginSuccess({ user: result.user, token: result.token }));
        setIsModalVisible(false); // Cerramos modal
        setVerificationCode(''); // Limpiamos input
      } else {
        // Raro, pero por si acaso la API devuelve otro mensaje
        setModalError(
          (result as TwoFactorRequiredResponse).message || 'Respuesta inesperada'
        );
      }
    } catch (err: any) {
      // Capturamos el error del 'validarOtpLoginUseCase' (ej. código incorrecto)
      setModalError(err.message || 'Error al verificar el código.');
    } finally {
      setIsVerifying(false); // Detenemos el loading del modal
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
        onPress={() => navigation.navigate('ForgotPassword' as never)}>
        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Mostramos el error principal SÓLO si el modal NO está visible */}
      {error && !isModalVisible && <Text style={styles.errorText}>{error}</Text>}

      {/* Enlace para crear una cuenta */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
          <Text style={styles.signupLink}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>

      
      {/* --- JSX DEL MODAL 2FA --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false); // Permite cerrar con botón 'atrás' en Android
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Verificación Requerida</Text>
            <Text style={styles.modalSubtitle}>
              Ingresa el código enviado a: {email}
            </Text>

            {/* --- INPUT ÚNICO Y FLEXIBLE PARA EL OTP --- */}
            {/* Reutilizamos los mismos estilos de tus inputs */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Código de verificación"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={verificationCode}
                onChangeText={setVerificationCode}
                autoFocus={true} // Opcional: abre el teclado al abrir el modal
              />
            </View>
            
            {/* Error del modal (ej. código incorrecto) */}
            {modalError && (
              <Text style={styles.modalErrorText}>{modalError}</Text>
            )}

            {/* Botón de Verificar (reutilizamos estilos) */}
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={handleVerifyCode} // <-- Llama a la nueva función
              disabled={isVerifying}>
              <LinearGradient
                colors={['#84A5FF', '#5A58EE']}
                style={[
                  styles.buttonGradient,
                  { opacity: isVerifying ? 0.7 : 1 },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                {isVerifying ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Verificar</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Botón de Cancelar */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsModalVisible(false)}
              disabled={isVerifying}>
              <Text style={styles.linkText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

// --- ESTILOS COMPLETOS (ORIGINALES + MODAL) ---
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
    textAlign: 'center',
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

  // --- ESTILOS DEL MODAL ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#F0F2F5', // Mismo fondo que la app
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  modalErrorText: {
    color: '#FF6347',
    fontSize: 15,
    marginBottom: 15, // Espacio antes del botón
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 20,
  },
});

export default LoginScreen;