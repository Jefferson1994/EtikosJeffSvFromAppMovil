// features/adminDashboard/presentation/screens/CompaniesScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import  CreateCompanyScreen  from '../../../../features/adminDashboard/presentation/screens/CreateCompanyScreen'

const initialCompanies = [
    {
        id: '1',
        nombre: 'Barbería Central',
        direccion: 'Calle Falsa 123',
        ruc: '1105707341001',
        descripcion: 'Una barbería en el centro de la ciudad.',
        datos_contacto: {
            telefono_contacto: '0998765432',
            email_contacto: 'central@barberia.com',
        },
    },
    {
        id: '2',
        nombre: "The Gentleman's Cut",
        direccion: 'Avenida Siempre Viva 456',
        ruc: '1105707341002',
        descripcion: 'Cortes clásicos para caballeros.',
        datos_contacto: {
            telefono_contacto: '0987654321',
            email_contacto: 'gentleman@barberia.com',
        },
    },
    {
        id: '3',
        nombre: 'Estilo Urbano',
        direccion: 'Boulevard de los Sueños Rotos 789',
        ruc: '1105707341003',
        descripcion: 'Barbería moderna con estilo único.',
        datos_contacto: {
            telefono_contacto: '0991234567',
            email_contacto: 'urbano@barberia.com',
        },
    },
];

const CompaniesScreen = () => {
    // Estado para la lista de empresas, inicializado con datos "quemados"
    const [companies, setCompanies] = useState(initialCompanies);

    // Componente para la vista de lista de empresas
    const CompanyList = () => (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Gestión de Empresas</Text>
                </View>
                <Text style={styles.subtitle}>
                    Aquí puedes ver y administrar las empresas asociadas.
                </Text>
                <View style={styles.listContainer}>
                    {companies.map(company => (
                        <View key={company.id} style={styles.companyCard}>
                            <View style={styles.companyInfo}>
                                <Icon name="building" size={24} color="#5A58EE" style={styles.icon} />
                                <Text style={styles.companyName}>{company.nombre}</Text>
                                <Text style={styles.companyAddress}>{company.direccion}</Text>
                                <Text style={styles.companyRuc}>RUC: {company.ruc}</Text>
                            </View>
                            <View style={styles.cardActions}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Icon name="pencil" size={18} color="#5A58EE" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Icon name="trash" size={18} color="#E74C3C" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateCompany')}>
                <Icon name="plus-circle" size={24} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Agregar Empresa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

    return <CompanyList />;
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
        paddingBottom: 80, // Espacio para el botón fijo
    },
    companyCard: {
        width: '48%', // Ancho del 48% para dos columnas con espacio
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
});

export default CompaniesScreen;
