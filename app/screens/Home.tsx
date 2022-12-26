import { Button, Text, ScrollView } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, InteractionManager } from 'react-native';
import colors from '../styles/colors';
import { shadows } from '../styles/shadows';
import LetterSizeMenu from '../components/LetterSizeMenu';
import getRealm from '../database/realm';
import { dailyPlan, dailyPlan_books } from '../database/schemas/type';
import Loading from '../components/Loading';
import uuid from 'react-native-uuid';
import { IBible, IRequestBible } from '../api/types';
import { getChapter, getChapterRange, getMultipleRanges, GetVerse } from '../api/bible/api'
import { http } from '../api/http';
import { useMainContext } from '../database/context';
import { layoutPropsList } from 'native-base/lib/typescript/components/composites/Typeahead/types';

export const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [daily, setDaily] = useState<dailyPlan>()
    const [ letterSize, setLetterSize] = useState("md")
    const [dailyReference, setDailyReference] = useState("")
    const realm = useMainContext()
    //todas as referencias de dias e ordem do ano já vao está cadastrada no banco de dados (logo, é necessário que esses dados sejam recebidos no inicio)
    const [bible, setBible] = useState<IBible[]>([])

    const date = new Date();
    let currentDay = date.getDate()
    let currenteMonth = date.getMonth() + 1;

    useEffect(() => {
        GetDailyPlan(currentDay, currenteMonth);
        handleDailyReference()
    },[])
    async function GetDailyPlan (day:number, month: number) {
        const realm = await getRealm();
        let dailyPlan: React.SetStateAction<dailyPlan> | Realm.Results<dailyPlan_books & Realm.Object<unknown, never>>
        try{
            dailyPlan =  realm.objects<dailyPlan_books>("dailyPlan").filtered(`day == 2 && month == 1`);
        }catch (error) {
            console.log(error)
        }finally{
            setDaily(dailyPlan)
            if(daily && bible.length == 0){
                handleReference()

                
            }
        }
    }

    

    // Essa função normaliza o registro no banco de dados para uma referencia biblica possivel de ser chamada na API da biblia
    async function handleReference () {
        daily[0].books.forEach( async (item, index) => {
            if(item.chapterStart === item.chapterEnd){
                if(item.verseEnd === item.verseStart && item.verseStart === "0") {
                    const allChapter = await getChapter(item.book, item.chapterStart)
                    bible.push(allChapter)
                } else {
                    const rangeChapter = await getChapterRange(item.book, item.chapterStart, item.verseStart, item.verseEnd)
                    bible.push(rangeChapter)
                }
            } else {
                
                 if (item.verseEnd === item.verseStart && item.verseStart === "0") {
                    const stringRequest = handleStringMultipleRanges(item.chapterStart, item.chapterEnd)
                    const diferentChapter = await getMultipleRanges(item.book, stringRequest)
                    bible.push( diferentChapter)
                 } else {
                    // tem que criar uma função que vai cortar um array
                 }
            }
        })
    }

    // essa função gera o titulo de todas as passagens biblicas que serão lidas no dia atual
    function handleDailyReference () {
        let reference = ``
        if(daily) {
            daily[0].books.map((item, index) => {
                reference += `; ${item.book} `
                if(item.chapterStart === item.chapterEnd){
                    if(item.verseEnd != item.verseStart) {
                        reference += `${item.chapterStart}: ${item.verseStart}-${item.verseEnd}`
                    }
                    reference += `${item.chapterStart}`
                }else{
                    if(item.verseEnd != item.verseStart) {
                        reference += `${item.chapterStart}-${item.chapterEnd}: ${item.verseStart}-${item.verseEnd}`
                    }
                    reference += `${item.chapterStart}-${item.chapterEnd}`
                }
            })
        }

        reference = reference.slice(1);
        setDailyReference(reference)
    }

    // essa função deixa apta a string que sera usada para buscar multiplos valores na api da biblia
    function handleStringMultipleRanges (start: string, end: string) {
        const startInt = parseInt(start)
        const endInt = parseInt(end)
        let requestString = `${startInt}`
        for(let i = startInt; i < endInt; i++){
            requestString += `,${i+1}`
        }
        return requestString
    }

    //função que vai alterar a leitura de hoje para lida.. o VALOR read vai para true

    
  return (
    <View style={styles.container}>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
            <Text style={{fontSize: 20, color: colors.darkBlue}}>read</Text>
            <Text style={{fontSize: 20, color: colors.purple}}>Bible</Text>
        </View>
        <View style={styles.main}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{flexDirection: "column" , maxWidth: "80%"}}>
                    <Text style={styles.title}>Leitura de hoje: </Text>
                    <Text style={{textAlign: "center", marginTop: 4}}>{dailyReference}</Text>
                </View>
                <LetterSizeMenu setLetterSize={setLetterSize}/>
            </View>
            <View style={styles.cardContainer}>
                 {isLoading 
                ? <View style={{ margin: 10 }}><Loading/></View> 
                : <ScrollView showsVerticalScrollIndicator style={styles.card}>
                    {bible &&
                        <>
                             { bible.map( (item, index) => (
                                <>
                                {item.verses.map((i, index ) => (
                                    <>
                                        { i.verse === 1 ? <Text key={uuid.v4().toString()}  fontSize={letterSize} style={styles.bookTitle} >{i.book_name + " " + i.chapter}</Text> : null}
                                        <View key={uuid.v4().toString()} style={{flexDirection: "row"}} >
                                            <Text style={styles.verse} fontSize={letterSize} key={uuid.v4().toString()}>{`${i.verse}.`}</Text>
                                            <Text style={styles.textContainer} fontSize={letterSize} key={uuid.v4().toString()}>{i.text}</Text>
                                        </View>
                                    </>
                                ))} 
                                
                                </>
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
        padding: 10,
    },
    bookTitle:{
        marginTop: 8,
        fontWeight: "bold",

    },
    textContainer: {
        flexShrink: 1
    },
    verse:{
        marginHorizontal: 2,
    },
    main: {
        marginTop: 10,
    },
    card: {
        width: "100%",
        paddingHorizontal: 20,
        
    },
    cardContainer: {
        backgroundColor: colors.white,
        height: "88%",

        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        marginTop: 4,
        ...shadows
    }
});
