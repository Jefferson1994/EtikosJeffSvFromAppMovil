import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importa las pantallas
import MainDashboardScreen from './MainDashboardScreen';
import CompaniesScreen from '../../../Empresa/presentation/screens/CompaniesScreen';
import CreateCompany from '../../../Empresa/presentation/screens/CreateCompanyScreen';
import CollaboratorsScreen from './CollaboratorsScreen';
import ProductsScreen from './ProductsScreen';
import ServicesScreen from './ServicesScreen';
import CompaniesStack from '../../../Empresa/data/datasources/CompaniesStack'; 


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// --- Navegador de Pestañas Inferior (BottomTabNavigator) ---
const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'MainDashboard':
                            iconName = 'home';
                            break;
                        case 'Companies':
                            iconName = 'office-building';
                            break;
                        case 'Collaborators':
                            iconName = 'account-group';
                            break;
                        case 'Products':
                            iconName = 'cube-scan';
                            break;
                        case 'Services':
                            iconName = 'tools';
                            break;
                        default:
                            iconName = 'circle-outline';
                            break;
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#5A58EE',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="MainDashboard"
                component={MainDashboardScreen}
                options={{ title: 'Principal' }}
            />
            <Tab.Screen
                name="Companies"
                component={CompaniesScreen}
                options={{ title: 'Empresas' }}
            />
            <Tab.Screen
                name="CompaniesStack" // Usa el nombre de la pila
                component={CompaniesStack} // Y el componente de la pila
                options={{ title: 'Empresas' }}
            />
            <Tab.Screen
                name="Collaborators"
                component={CollaboratorsScreen}
                options={{ title: 'Colaboradores' }}
            />
            <Tab.Screen
                name="Products"
                component={ProductsScreen}
                options={{ title: 'Productos' }}
            />
            <Tab.Screen
                name="Services"
                component={ServicesScreen}
                options={{ title: 'Servicios' }}
            />
        </Tab.Navigator>
    );
};

// --- Navegador del Menú Lateral (Drawer Navigator) ---
const AdminDashboard = () => {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen 
                name="Inicio" 
                component={MainTabs} 
                options={{ 
                    drawerIcon: ({ color, size }) => (
                        <Icon name="view-dashboard" size={size} color={color} />
                    )
                }}
            />
            <Drawer.Screen 
                name="Configuración" 
                component={MainDashboardScreen} // Puedes cambiar esto a una pantalla de configuración real
                options={{ 
                    drawerIcon: ({ color, size }) => (
                        <Icon name="cog" size={size} color={color} />
                    )
                }}
            />
            <Drawer.Screen 
                name="Cerrar Sesión" 
                component={MainDashboardScreen} // Aquí iría la lógica de cerrar sesión
                options={{ 
                    drawerIcon: ({ color, size }) => (
                        <Icon name="logout" size={size} color={color} />
                    )
                }}
            />
        </Drawer.Navigator>
    );
};

export default AdminDashboard;