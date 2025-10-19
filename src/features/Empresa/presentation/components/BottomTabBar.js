import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeIcon from '../../assets/icons/HomeIcon'; // You'll create these SVG components
import CompaniesIcon from '../../assets/icons/CompaniesIcon';
import CollaboratorsIcon from '../../assets/icons/CollaboratorsIcon';
import ProductsIcon from '../../assets/icons/ProductsIcon';
import ServicesIcon from '../../assets/icons/ServicesIcon';

const tabs = [
    { name: 'Principal', icon: HomeIcon, screen: 'Main' },
    { name: 'Empresas', icon: CompaniesIcon, screen: 'Companies' },
    { name: 'Colaboradores', icon: CollaboratorsIcon, screen: 'Collaborators' },
    { name: 'Productos', icon: ProductsIcon, screen: 'Products' },
    { name: 'Servicios', icon: ServicesIcon, screen: 'Services' },
];

const BottomTabBar = ({ state, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const { options } = tabs[index];
                const IconComponent = tabs[index].icon;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        <IconComponent color={isFocused ? '#5A58EE' : '#8A8A8A'} />
                        <Text style={[styles.tabText, isFocused && styles.activeTabText]}>
                            {tabs[index].name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#8A8A8A',
        marginTop: 4,
    },
    activeTabText: {
        color: '#5A58EE',
    },
});

export default BottomTabBar;