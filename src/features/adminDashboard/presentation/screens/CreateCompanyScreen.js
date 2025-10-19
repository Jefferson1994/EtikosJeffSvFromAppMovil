// features/adminDashboard/presentation/screens/CreateCompanyScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreateCompanyScreen = () => {
    // Estado para el paso actual del formulario (1 o 2)
    const [step, setStep] = useState(1);
    // Estado para todos los campos del formulario de la empresa
    const [companyData, setCompanyData] = useState({
        nombre: '',
        ruc: '',
        descripcion: '',
        activo: 1,
        id_tipo_empresa: 1,
        direccion: '',
        horario_apertura: '08:30:00',
        horario_cierre: '19:30:00',
        datos_contacto: {
            telefono_contacto: '',
            email_contacto: '',
            ciudad: '',
            provincia: '',
            pais: '',
            latitud: -2.200000,
            longitud: -79.900000,
        },
    });

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setCompanyData(prevData => ({
                ...prevData,
                datos_contacto: {
                    ...prevData.datos_contacto,
                    [child]: value,
                },
            }));
        } else {
            setCompanyData(prevData => ({
                ...prevData,
                [field]: value,
            }));
        }
    };

    const handleContinue = () => {
        if (!companyData.nombre.trim() || !companyData.ruc.trim() || !companyData.direccion.trim()) {
            Alert.alert('Error', 'Por favor, llena los campos principales.');
            return;
        }
        setStep(2);
    };

    const handleFinalizeCreation = () => {
        if (!companyData.datos_contacto.telefono_contacto.trim()) {
            Alert.alert('Error', 'Por favor, completa los datos de contacto.');
            return;
        }
        // TODO: Aquí se enviaría la empresa completa a la API.
        console.log('Empresa a crear:', companyData);
        Alert.alert('Éxito', `Empresa "${companyData.nombre}" creada.`);

        // TODO: Navegar de regreso a la pantalla de lista después de la creación.
    };

    // Componente para el formulario de creación - Paso 1
    const CompanyFormStep1 = () => (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Crear Nueva Empresa</Text>
                    {/* TODO: Botón para regresar a la pantalla anterior */}
                </View>
                <Text style={styles.subtitle}>
                    Paso 1: Información básica de la empresa.
                </Text>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Nombre de la Empresa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Barbería Nueva"
                        value={companyData.nombre}
                        onChangeText={text => handleInputChange('nombre', text)}
                    />
                    <Text style={styles.label}>RUC</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. 1105707341001"
                        value={companyData.ruc}
                        onChangeText={text => handleInputChange('ruc', text)}
                    />
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Una barbería moderna en la ciudad."
                        value={companyData.descripcion}
                        onChangeText={text => handleInputChange('descripcion', text)}
                    />
                    <Text style={styles.label}>Dirección</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Av. Siempre Viva 742"
                        value={companyData.direccion}
                        onChangeText={text => handleInputChange('direccion', text)}
                    />
                    <Button
                        title="Siguiente"
                        onPress={handleContinue}
                        color="#5A58EE"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );

    // Componente para el formulario de creación - Paso 2
    const CompanyFormStep2 = () => (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Crear Nueva Empresa</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setStep(1)}>
                        <Text style={styles.cancelButtonText}>Atrás</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>
                    Paso 2: Datos de contacto y ubicación.
                </Text>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Teléfono de Contacto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. 0987651234"
                        value={companyData.datos_contacto.telefono_contacto}
                        onChangeText={text => handleInputChange('datos_contacto.telefono_contacto', text)}
                        keyboardType="phone-pad"
                    />
                    <Text style={styles.label}>Email de Contacto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. contacto@lacentral.com"
                        value={companyData.datos_contacto.email_contacto}
                        onChangeText={text => handleInputChange('datos_contacto.email_contacto', text)}
                        keyboardType="email-address"
                    />
                    <Text style={styles.label}>Ciudad</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Guayaquil"
                        value={companyData.datos_contacto.ciudad}
                        onChangeText={text => handleInputChange('datos_contacto.ciudad', text)}
                    />
                    <Text style={styles.label}>Provincia</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Guayas"
                        value={companyData.datos_contacto.provincia}
                        onChangeText={text => handleInputChange('datos_contacto.provincia', text)}
                    />
                    <Text style={styles.label}>País</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Ecuador"
                        value={companyData.datos_contacto.pais}
                        onChangeText={text => handleInputChange('datos_contacto.pais', text)}
                    />
                    <Text style={styles.label}>Ubicación en el Mapa</Text>
                    <View style={styles.mapContainer}>
                        <Text style={styles.mapText}>[Aquí iría el mapa interactivo]</Text>
                        <Text style={styles.mapText}>Latitud: {companyData.datos_contacto.latitud}</Text>
                        <Text style={styles.mapText}>Longitud: {companyData.datos_contacto.longitud}</Text>
                    </View>
                    <Button
                        title="Crear Empresa"
                        onPress={handleFinalizeCreation}
                        color="#5A58EE"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );

    return step === 1 ? <CompanyFormStep1 /> : <CompanyFormStep2 />;
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
    cancelButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#5A58EE',
    },
    cancelButtonText: {
        color: '#5A58EE',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#7F8C8D',
        marginBottom: 24,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#34495E',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#BDC3C7',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
    },
    mapContainer: {
        height: 200,
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    mapText: {
        color: '#555',
        textAlign: 'center',
        marginBottom: 5,
    },
});

export default CreateCompanyScreen;
