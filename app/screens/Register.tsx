import React, { useEffect, useMemo, useState } from 'react'
import { Text, View, SafeAreaView, Alert} from 'react-native'
import { FormControl, Select, Center, CheckIcon, Input, NativeBaseProvider, Button, Radio, Heading, ScrollView } from "native-base";
import  getRealm  from '../database/realm';
import uuid from 'react-native-uuid';
import {  dailyPlan, dailyPlan_books } from '../database/schemas/type';
import { useMainContext } from '../database/context';

const livros= ["Gênesis","Êxodo","Levítico","Números","Deuteronômio","Josué",
"Juízes",
"Rute",
"I Samuel",
"II Samuel",
"I Reis",
"II Reis",
"I Crônicas",
"IICrônicas",
"Esdras",
"Neemias",
"Tobias",
"Judite",
"Ester",
"Jó",
"Salmos",
"Provérbios",
"Eclesiastes",
"Cântico dos Cânticos",
"Isaías",
"Jeremias",
"Lamentações",
"Ezequiel",
"Daniel",
"Oséias",
"Joel",
"Amós",
"Obadias",
"Jonas",
"Miquéias",
"Naum",
"Habacuque",
"Sofonias",
"Ageu",
"Zacarias",
"Malaquias",
"Mateus",
"Marcos",
"Lucas",
"João",
"Atos",
"Romanos",
"1 Coríntios",
"2 Coríntios",
"Gálatas",
"Efésios",
"Filipenses",
"Colossenses",
"1 Tessalonicenses",
"2 Tessalonicenses",
"1 Timóteo",
"2 Timóteo",
"Tito",
"Filemon",
"Hebreus",
"Tiago",
"1 Pedro",
"2 Pedro",
"1 João",
"2 João",
"3 João",
"Judas",
"Apocalipse"
]


export const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [book, setBook] = React.useState("");

    const [bookList, setBookList] = React.useState<dailyPlan_books[]>([]);
    const [chapterStart, setChaptersStart] = React.useState("");
    const [chapterEnd, setChaptersEnd] = React.useState("");
    const [verseStart, setStartVerses] = React.useState("");
    const [verseEnd, setEndVerses] = React.useState("");
    const [day, setDay] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [order, setOrder] = React.useState("1");

    const realm = useMainContext()

    const handleDayChange = (text: React.SetStateAction<string>) => {
        setDay(text);
    }
    const handleOrderChange = (text: React.SetStateAction<string>) => {
        setOrder(text);
    }
    const handleMonthChange = (text: React.SetStateAction<string>) => {
        setMonth(text);
    }

    const handleChaptersStartChange = (text: React.SetStateAction<string>) => {
        setChaptersStart(text);
    }
    

    const handleChaptersEndChange = (text: React.SetStateAction<string>) => {
        setChaptersEnd(text);
    }
    const handleStartVersesChange = (text: React.SetStateAction<string>) => {
        setStartVerses(text);
    }
    const handleEndVersesChange = (text: React.SetStateAction<string>) => {
        setEndVerses(text);
    }

    function handleAddBook () {
        bookList.push({ book, chapterEnd, chapterStart, verseEnd, verseStart})

        console.log("Lista de Livros =>> : ", bookList)
    }
    function clearBookList () {
        bookList.length = 0;
    }
    
    async function handleRegister () {
        const realm = await getRealm()
        const id = uuid.v4().toString()
        if(realm){
            setIsLoading(true)
            try {
                realm.write(() => {
                    realm.create<dailyPlan>("dailyPlan", {
                    _id: id,
                    books: bookList,
                    day: parseInt(day),
                    month:  parseInt(month),
                    order:  parseInt(order),
                    read: false,
                    });
                });
                Alert.alert( "Chamado", "Plano de leitura cadastrado com sucesso!");
            }catch(error) {
                Alert.alert( "Chamado", `${error}`);
            }finally {
                setIsLoading(false);
                realm.close()
            }
        }
    }
    return (
        <SafeAreaView style={{height: "90%", marginTop:20, justifyContent: "center", paddingHorizontal: 40}}>
            <ScrollView style={{height: "90%"}}>
            
                <Input 
                    my="1"
                    onChangeText={handleDayChange}
                    placeholder='Dia'
                />
                <Input
                    my="1"
                    onChangeText={handleMonthChange}
                    placeholder='Mês'
                />
                <Input
                    my="1"
                    onChangeText={handleOrderChange}
                    placeholder='Ordem'
                />

                <FormControl >
                    <FormControl.Label>Escolha o Livro</FormControl.Label>
                    <Select 
                        defaultValue={livros[0]}
                        selectedValue={book} 
                        minWidth="200"
                        accessibilityLabel="Escolha o Livro" 
                        placeholder="Livro" 
                        _selectedItem={{bg: "teal.600", endIcon: <CheckIcon size={5} />}}
                        mt="1"
                        onValueChange={(itemValue) => setBook(itemValue)}>
                        {livros.map((item, index) => (
                            <Select.Item key={index} label={item} value={item} />
                        ))}
                    </Select>
                </FormControl> 

                <Input 
                    my="1"
                    onChangeText={handleChaptersStartChange}
                    placeholder='Capítulo Inicial'
                />
                 <Input 
                    my="1"
                    onChangeText={handleChaptersEndChange}
                    placeholder='Capítulo final'
                />
                <Input
                    my="1"
                    onChangeText={handleStartVersesChange}
                    placeholder='Inicia no Versiculo'
                />
                <Input
                    my="1"
                    onChangeText={handleEndVersesChange}
                    placeholder='Até o Versículo'
                />
            <Button onPress={handleAddBook}>Add book</Button>
            
            <Button onPress={clearBookList}> Clean book list</Button>
            <Button mt={5} colorScheme="purple" onPress={() => {
                Alert.alert(
                    "Confirmação de Cadastro"," ",
                    [
                        {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "OK", onPress: () => handleRegister() }
                    ]
                    );
            }}>Cadastrar</Button>

        </ScrollView>
        
    </SafeAreaView>
  )
}
