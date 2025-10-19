import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TextInput, 
    TouchableOpacity, 
    Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Asumiendo que tienes una lista de tipos de empresa
const tiposDeEmpresa = [
    { id: 1, nombre: 'Barbería' },
    { id: 2, nombre: 'Salón de Belleza' },
    { id: 3, nombre: 'Estudio de Tatuajes' },
];

const CreateCompanyScreen = ({ navigation }) => {
    // 1. Estados para los datos de la empresa
    const [nombre, setNombre] = useState('');
    const [ruc, setRuc] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idTipoEmpresa, setIdTipoEmpresa] = useState(null);
    const [direccion, setDireccion] = useState('');
    const [horarioApertura, setHorarioApertura] = useState('');
    const [horarioCierre, setHorarioCierre] = useState('');

    // 2. Estados para los datos de contacto
    const [telefonoContacto, setTelefonoContacto] = useState('');
    const [emailContacto, setEmailContacto] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');

    const handleSave = () => {
        // Aquí iría la lógica de validación y el llamado al caso de uso de registro de empresa
        const newCompanyData = {
            nombre,
            ruc,
            descripcion,
            id_tipo_empresa: idTipoEmpresa,
            direccion,
            horario_apertura: horarioApertura,
            horario_cierre: horarioCierre,
            datos_contacto: {
                telefono_contacto: telefonoContacto,
                email_contacto: emailContacto,
                ciudad,
                provincia,
                pais,
                latitud: -2.2, // Valores de ejemplo para latitud y longitud
                longitud: -79.9,
            },
        };

        console.log('Datos de la nueva empresa:', newCompanyData);
        Alert.alert('Guardar', 'Datos guardados correctamente.');
        // navigation.goBack(); // O navega a otra pantalla después de guardar
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Crear Nueva Empresa</Text>
            
            {/* Sección de Datos de la Empresa */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Datos de la Empresa</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la empresa"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="RUC"
                    value={ruc}
                    onChangeText={setRuc}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descripción"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                />
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Tipo de Empresa:</Text>
                    <Picker
                        selectedValue={idTipoEmpresa}
                        onValueChange={(itemValue) => setIdTipoEmpresa(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccione un tipo" value={null} />
                        {tiposDeEmpresa.map(tipo => (
                            <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
                        ))}
                    </Picker>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Dirección"
                    value={direccion}
                    onChangeText={setDireccion}
                />
                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Horario Apertura (08:30)"
                        value={horarioApertura}
                        onChangeText={setHorarioApertura}
                    />
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Horario Cierre (19:30)"
                        value={horarioCierre}
                        onChangeText={setHorarioCierre}
                    />
                </View>
            </View>

            {/* Sección de Datos de Contacto */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Datos de Contacto</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono de contacto"
                    value={telefonoContacto}
                    onChangeText={setTelefonoContacto}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email de contacto"
                    value={emailContacto}
                    onChangeText={setEmailContacto}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ciudad"
                    value={ciudad}
                    onChangeText={setCiudad}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Provincia"
                    value={provincia}
                    onChangeText={setProvincia}
                />
                <TextInput
                    style={styles.input}
                    placeholder="País"
                    value={pais}
                    onChangeText={setPais}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar Empresa</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#5A58EE',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    pickerContainer: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        justifyContent: 'center',
        height: 50,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    pickerLabel: {
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 5,
        fontSize: 12,
        color: '#777',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    button: {
        backgroundColor: '#5A58EE',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CreateCompanyScreen;