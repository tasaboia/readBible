import { Button, Center, Checkbox, CheckIcon, Divider, FormControl, Heading, IconButton, Menu, PlayIcon, Pressable, Radio, ScrollView, Select, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Month, plan } from '../utils/contants'
import { useMainContext } from '../database/context';
import { ClearAll } from '../database/services/GetBiblePlan';
import GetAllDailyBible from '../database/services/GetBiblePlan';
import uuid from 'react-native-uuid';
import { dailyPlan } from '../database/schemas/type';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Bible = () => {
  const realm = useMainContext();

  const [value, setValue] = useState("one");
  const [month, setMonth] = useState("");

  const [data, setData] = useState<Realm.Results<dailyPlan & Realm.Object> | dailyPlan[]>([])

  const [allData, setAllData] = useState<dailyPlan[]>([])
  const [currentData, setCurrentData] = useState<dailyPlan[]>([])

  const [read, setRead] = useState(false)

  
  
  // useEffect(() => {
    
  //   if(realm){
  //     handleGetAll()
  //   }
    
  // },[realm])

  
  useEffect(() => {handleMonthFilter()},[month])
  useEffect(() => {handleReadNoRead()},[read])

  
  async function handleGetAll() {
    const plans = await GetAllDailyBible()
    setData(plans)
    setAllData(data)
    setCurrentData(data)
  }
  
  async function handleClearAll() {
    ClearAll()
    realm.close()
  }

  
  function handleSetMonth ( month : number) { 
    let currentMonth

    Month.forEach((element, i) => {
      if(i === (month - 1)) {
        currentMonth = element
    }}) 

    return currentMonth
}

  function handleMonthFilter(){
    const temp = []
    allData.filter((item, index) => {
      const monthName = handleSetMonth(item.month)
      if(monthName === month){
        console.log(monthName)
        temp.push(item)
      }
    })

    setCurrentData(temp)
  }

  function handleReadNoRead () {
      const temp = []
      allData.filter((item) => {
        if(item.read === read){
          temp.push(item)
        }
      })
      setCurrentData(temp)
    }

  
  function handleStatus ( status : string) {
    if( status === "all") {
      setCurrentData(data)
    } else {
      var isTrueSet = (status === 'true');
      setRead(isTrueSet)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.filter}>
          <FormControl w="3/4" maxW="300">
              <FormControl.Label>Filtro por mês</FormControl.Label>
              <Select 
                maxWidth={250}
                defaultValue={Month[0]}
                selectedValue={month} 
                accessibilityLabel="Escolha o Mês" 
                placeholder="Escolha o Mês" 
                _selectedItem={{bg: "teal.600", endIcon: <CheckIcon size={5} />}}
                onValueChange={(itemValue) => setMonth(itemValue)}>
                {Month.map((item, index) => (
                    <Select.Item key={index} label={item} value={item} />
                ))}
              </Select>
              
          </FormControl>  

          <VStack space={1} alignSelf="center" mt={8} > 
            <Menu w="160"
              placement={"bottom right"} trigger={triggerProps => {
              return <Pressable {...triggerProps}>
                      <Feather name="sliders" size={24} color="black" />
                    </Pressable>;
              }}>
                <Menu.OptionGroup onChange={(value) => handleStatus(value)} title="Escolha um filtro" type='radio'>
                  <Menu.ItemOption value={"true"}>Lido</Menu.ItemOption>
                  <Menu.ItemOption value={"false"}>Não Lido</Menu.ItemOption>
                  <Menu.ItemOption value={"all"}>Tudo</Menu.ItemOption>
                </Menu.OptionGroup>
              </Menu>
          </VStack>

          
      </View>

      <View style={styles.inLineText}>
        <FontAwesome name="check-square-o" size={24} color="black" />
        <Heading mx={5} size="sm">Dia</Heading>
        <Heading mx={5} size="sm">Leitura Bíblica</Heading>
      </View>
      <Button onPress={handleGetAll}>get All</Button>
      <Button onPress={ClearAll}>limpar All</Button>
      <FlatList
        data={currentData}
        style={styles.flatList}
        renderItem={({ item }) => {
          return (
            <View style={styles.cards}>
              <View style={styles.innerCard}> 
                <Checkbox size="sm" colorScheme="purple" value="test" accessibilityLabel="This is a dummy checkbox" />
                <Heading w={100} mx={4} size="sm">{item.day + " " + handleSetMonth(item.month)} </Heading>
                <Divider orientation="vertical"/>
                <View >
                  {item.books.map((book, index) => (
                    <Heading key={uuid.v4().toString()} mx={2} size="sm">{book.book + " " + book.chapterStart + ":" +  book.verseStart + "-" +  book.verseEnd}</Heading>
                  ))}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
  },
  scrollContainer: {
    height: "87%",
  },
  filterButton: {
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 10, flexDirection: "row", backgroundColor: colors.purple
  },
  inLineText: {
    marginTop: 20,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "center"
  },
  filterArea: {
    marginTop: 8,
    flexDirection: "row",
  },
  innerCard:{
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems:"center",

  },
  cards: {
    marginVertical: 4,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  flatList: {
    flexGrow: 0,
    width: "100%",
    height: "100%",
  },
});
