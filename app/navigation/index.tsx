import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {useState} from 'react'
import {StyleSheet, View, } from 'react-native';
import { Entypo, Ionicons, FontAwesome,MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../styles/colors';
import { Bible } from '../screens/Bible';
import { Home } from '../screens/Home';
import { Register } from '../screens/Register';
import { getVerse } from '../api/bible/api';
const Tab = createBottomTabNavigator();

export default function Tabs() {

    return(
        <Tab.Navigator
            screenOptions={{
                headerTransparent: true,
                tabBarShowLabel: false,
                tabBarStyle:{
                    position: 'absolute',
                    elevation: 0,
                    backgroundColor: colors.white,
                    height:50,
                }
            }}
            
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon:({focused}) => (
                        <View style={styles.IconContainer}>
                            <Entypo name="home" size={30} color={focused ? colors.purple : colors.black} />
                            { focused ?  <View style={styles.highlight}/> : null }
                        </View>
                    ),
                    title:"",
                }}
            />
            <Tab.Screen name="Bible" component={Bible}
                options={{
                    tabBarIcon:({focused}) => (
                        <View style={styles.IconContainer}>
                            <Ionicons name="md-book" size={24} color={focused ? colors.purple : colors.black} />
                            { focused ? <View style={styles.highlight}/> : null }
                        </View>
                    ),
                    title:"",
                }}
            />
            <Tab.Screen name="Register" component={Register}
                options={{
                    tabBarIcon:({focused}) => (
                        <View style={styles.IconContainer}>
                            <Entypo name="add-to-list" size={24} color={focused ? colors.purple : colors.black} />
                            { focused ? <View style={styles.highlight}/> : null }
                        </View>
                    ),
                    title:"",
                }}
            />
        </Tab.Navigator>
)}

const styles = StyleSheet.create({
    shadow:{
        shadowColor: "#ccc",
        shadowOffset:{
            width:0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    highlight: {
        top: "90%",
        height:3,
        justifyContent: "center",
        alignItems: "center", 
        alignSelf: "center",
        width: 60, 
        backgroundColor: "#14DAD5", 
        position: "absolute"
    },
    IconContainer: {
        height: "100%", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignContent: "center"
    },
    top: {
        marginBottom: "auto",
        marginTop: 0
    },
})