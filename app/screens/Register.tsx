import React, { useEffect, useMemo, useState } from 'react'
import { Text, View, SafeAreaView, Alert} from 'react-native'
import { FormControl, Select, Center, CheckIcon, Input, NativeBaseProvider, Button, Radio, Heading } from "native-base";
import  getRealm  from '../database/realm';
import uuid from 'react-native-uuid';
import { biblePieces } from '../database/schemas/type';
import { useMainContext } from '../database/context';

const livros= [
    {
        book:"Gênesis",
        chapters: 50,
        abbreviation: "Gen",
    }
    ,
    {
        book: "Êxodo",
        chapters: 40,
        abbreviation: "Ex",
    },
    {
        book: "Levítico",
        chapters: 27,
        abbreviation: "Lev",
    },
    {
        book: "Números",
        chapters: 27,
        abbreviation: "Num",
    },
    {
        book: "Deuteronômio",
        chapters: 27,
        abbreviation: "Deut",
    },
    {
        book: "Josué",
        chapters: 27,
        abbreviation: "Deut",
    }
]


export const Register = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [book, setBook] = React.useState("Gen");
    const [chapter, setChapters] = React.useState("");
    const [verseStart, setStartVerses] = React.useState("");
    const [verseEnd, setEndVerses] = React.useState("");

    const [day, setDay] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [order, setOrder] = React.useState("1");

    const realm = useMainContext()


    const handleDayChange = (text: React.SetStateAction<string>) => {
        setDay(text);
    }
    const handleMonthChange = (text: React.SetStateAction<string>) => {
        setMonth(text);
    }

    const handleChaptersChange = (text: React.SetStateAction<string>) => {
        setChapters(text);
    }
    const handleStartVersesChange = (text: React.SetStateAction<string>) => {
        setStartVerses(text);
        console.log(month)

    }
    const handleEndVersesChange = (text: React.SetStateAction<string>) => {
        setEndVerses(text);
    }
    
    async function handleRegister () {
        
        try {
            setIsLoading(true)
            if (realm) {
                const created = realm.write(() => {
                    realm.create<biblePieces>("biblePieces", {
                        _id: uuid.v4().toString(),
                        book,
                        chapter,
                        day,
                        month,
                        order,
                        verseEnd,
                        verseStart,
                        year: "2023"
                    });
                });
                Alert.alert( "Chamado", "Plano de leitura cadastrado com sucesso!");
            }
        }catch {
            Alert.alert( "Chamado", "Não foi possível cadastrar o Plano de leitura!");
        }finally {
            setIsLoading(false)
            realm.close()
        }
    }
    return (
        <SafeAreaView style={{justifyContent: "center", marginTop: 40, paddingHorizontal: 40}}>
            <Center>
                <FormControl >
                    <FormControl.Label>Escolha o Livro</FormControl.Label>
                    <Select 
                        defaultValue={livros[0].book}
                        selectedValue={book} 
                        minWidth="200"
                        accessibilityLabel="Escolha o Livro" 
                        placeholder="Livro" 
                        _selectedItem={{bg: "teal.600", endIcon: <CheckIcon size={5} />}}
                        mt="1"
                        onValueChange={(itemValue) => setBook(itemValue)}>
                        {livros.map((item, index) => (
                            <Select.Item key={index} label={item.book} value={item.abbreviation} />
                        ))}
                    </Select>
                </FormControl>   
                    <Input 
                    my="1"
                        onChangeText={handleChaptersChange}
                        placeholder='Capítulo'
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

                
               
                
            </Center>
            <Radio.Group 
                onChange={value => setOrder(value)}
                defaultValue="1" 
                name="radioGroup" 
                accessibilityLabel="Ordem dos livros"
            >
                <Heading size={"sm"} my="2.5">Ordem do livro</Heading>
                    <Radio value="1" my="1">
                        Primeiro
                    </Radio>
                    <Radio value="2" my="1">
                        Segundo
                    </Radio>
                    <Radio value="3" my="1">
                        Terceito
                    </Radio>
                </Radio.Group>

                <Button mt={5} colorScheme="purple" onPress={() => {
                    Alert.alert(
                        "Confirmação de Cadastro",
                        `Livro: ${book}, Capitulo: ${chapter}, Versiculo: ${verseStart}${ verseEnd ? `-${verseEnd}` : ``}, 
                        Dia: ${day}, Mês: ${month}, Ordem: ${order}`,
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
        </SafeAreaView>
  )
}
