import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    SafeAreaView, 
    ActivityIndicator, 
    Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { getTodasEmpresasXAdmin } from '../../domain/useCases/getTodasEmpresaCase';
import CreateCompanyScreen from '../screens/CreateCompanyScreen'; 

const CompaniesScreen = ({ navigation }) => {
    // 1. Estados locales para manejar la UI
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Obtiene el usuario y el token del estado global de Redux
    const { user: authUser, token: authToken } = useSelector((state) => state.auth);
    const idAdministrador = authUser?.id || null;

    // 3. Función asincrónica para obtener los datos de las empresas
    const fetchCompanies = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Valida que el ID y el token estén disponibles antes de llamar a la API
            if (!idAdministrador || !authToken) {
                throw new Error("ID o token de autenticación no disponibles.");
            }
            
            // Llama al caso de uso, pasando el ID y el token
            const empresasData = await getTodasEmpresasXAdmin(idAdministrador, authToken);
            setCompanies(empresasData);
        } catch (err) {
            console.error("Error al obtener las empresas:", err);
            setError(err.message);
            Alert.alert("Error", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // 4. Hook useEffect para llamar a la API al cargar el componente
    useEffect(() => {
        // Ejecuta la función solo si el ID y el token están presentes
        if (idAdministrador && authToken) {
            //fetchCompanies();
        } else {
            // Si falta el token, detiene la carga y muestra un error
            setIsLoading(false);
            setError("No se pudo encontrar el token de usuario. La sesión podría haber expirado.");
        }
    }, [idAdministrador, authToken]); // El efecto se re-ejecuta si el ID o el token cambian

    // 5. Lógica de renderizado condicional para mostrar la UI


    // 6. Vista principal del componente
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Administrar Contraseñas</Text>
                </View>
                <Text style={styles.subtitle}>
                    Aquí se muestran la funcionalidad cambiar  contraseñas .
                </Text>
                
            </ScrollView>
    
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    scrollContent: {
        padding: 24,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5A58EE',
        paddingVertical: 12,
        borderRadius: 10,
        margin: 24,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    addButtonText: {
        color: '#FFFFFF',
        marginLeft: 8,
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#7F8C8D',
        marginBottom: 24,
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 80,
    },
    companyCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    companyInfo: {
        alignItems: 'center',
    },
    icon: {
        marginBottom: 10,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 4,
    },
    companyAddress: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
        marginBottom: 4,
    },
    companyRuc: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    actionButton: {
        marginHorizontal: 15,
    },
    loadingIndicator: {
        marginTop: 50,
    },
    noCompaniesText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#7F8C8D',
        width: '100%',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'red',
        width: '100%',
    },
});

export default CompaniesScreen;