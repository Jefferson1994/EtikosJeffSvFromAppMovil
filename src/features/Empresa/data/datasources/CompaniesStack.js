// src/features/adminDashboard/presentation/navigation/CompaniesStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompaniesScreen from '../../presentation/screens/CompaniesScreen';
import CreateCompanyScreen from '../../presentation/screens/CreateCompanyScreen';

const Stack = createStackNavigator();

const CompaniesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Companies" 
                component={CompaniesScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="CreateCompany" 
                component={CreateCompanyScreen} 
                options={{ title: 'Crear Empresa' }} 
            />
        </Stack.Navigator>
    );
};

export default CompaniesStack;