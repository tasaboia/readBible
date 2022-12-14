import { AddIcon, Button, ScrollView, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getVerse } from '../api/bible/api';
import { IBible, IRequestBible } from '../api/types';
import colors from '../styles/colors';
import { shadows } from '../styles/shadows';
import uuid from 'react-native-uuid';
import Loading from '../components/Loading';
import { plan } from '../utils/contants';
import LetterSizeMenu from '../components/LetterSizeMenu';
import GetAllBiblePlan from '../database/services/GetBiblePlan';
import { useMainContext } from '../database/context';
import { biblePieces } from '../database/schemas/type';
import { disableErrorHandling } from 'expo';

export const Home = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [firstBook, setFirstBook] = useState<IBible>()
    const [secondBook, setSecondBook] = useState<IBible>()
    const [thirdBook, setThirdBook] = useState<IBible>()
    const [ letterSize, setLetterSize] = useState("md")

  
    useEffect( ()=> {
        setIsLoading(true)
        try {
            handleFirst()
        } catch (error) {
            
        }
        try {
            handleSecond()
        } catch (error) {
            
        }
        try {
            handleThird()
        } catch (error) {
            
        }
        setIsLoading(false)

    },[])

    async function handleFirst () {
        const res1 = await getVerse(plan.frist)
        setFirstBook(res1)
    }

    async function handleSecond () {
        const res2 = await getVerse(plan.second)
        setSecondBook(res2)
   }

    async function handleThird () {
        const res3 = await getVerse(plan.third)
        setThirdBook(res3)
    }

   
  return (
    <View style={styles.container}>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
            <Text style={{fontSize: 20, color: colors.darkBlue}}>read</Text>
            <Text style={{fontSize: 20, color: colors.purple}}>Bible</Text>
        </View>
        <View style={styles.main}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.title}>Leitura de hoje</Text>
                <LetterSizeMenu setLetterSize={setLetterSize}/>
            </View>
            <View style={styles.cardContainer}>
                {isLoading 
                ? <Loading/> 
                : <ScrollView showsVerticalScrollIndicator style={styles.card}>
                    {firstBook &&
                        <>
                            <View style={{flexDirection: "row"}}>
                                <Text  fontSize={letterSize} style={styles.bookTitle}>{firstBook.reference}</Text>
                            </View>

                        
                             { firstBook.verses.map( (item, index) => (
                                <View key={uuid.v1().toString()} style={{flexDirection: "row"}} >
                                    <Text style={styles.textContainer} fontSize={letterSize} key={uuid.v4().toString()}>{item.verse}</Text>
                                    <Text style={styles.textContainer} fontSize={letterSize} key={uuid.v4().toString()}>{item.text}</Text>
                                </View>
                            ))}    
                        </>
                    }
                    <Button my={6} colorScheme="purple" onPress={()=>console.log("terminou leitura")}>Leitura completa</Button>
                </ScrollView>
                
                }
            </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create ({
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    container : {
        height: "100%",
        padding: 20,
    },
    bookTitle:{
        marginTop: 8,
        fontWeight: "bold",

    },
    textContainer: {
        flexShrink: 1
    },
    verse:{
        marginTop: 4,

    },
    main: {
        marginTop: 10,
    },
    card: {
        width: "100%",
        height: "85%",
        padding: 20,
        
    },
    cardContainer: {
        backgroundColor: colors.white,
        height: "90%",

        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        marginTop: 4,
        ...shadows
    }
});