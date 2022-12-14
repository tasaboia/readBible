import { Button, Center, Checkbox, CheckIcon, Divider, FormControl, Heading, PlayIcon, Radio, ScrollView, Select } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Meses, plan } from '../utils/contants'
import { IBible } from '../api/types';
import { biblePieces } from '../database/schemas/type';
import getRealm from '../database/realm';
import { useMainContext } from '../database/context';
import GetAllBiblePlan, { ClearAll } from '../database/services/GetBiblePlan';


export const Bible = () => {
  const realm = useMainContext();
  const [value, setValue] = useState("one");
  const [month, setMonth] = useState("Janeiro");
  
 
  const [data, setData] = useState<Realm.Results<biblePieces & Realm.Object> | biblePieces[]>([])
  
  useEffect(() => {
    
    if(realm){
      handleGetAll()
    }
    
  },[realm])
  
  async function handleGetAll() {
    const plans = await GetAllBiblePlan()
    setData(plans)
  }
  
  async function handleClearAll() {
    ClearAll()
    realm.close()
  }

  // function MonthName (month: string) {

  //   for(let i = 1; i <= Meses.length; i++){
  //     if(data.month === i){
  //       setMonthList(Meses[i]
  //     }
  //   }
  // }


  return (
    <View style={styles.container}>
      <View style={styles.filter}>
          <FormControl >
              <FormControl.Label>Filtro por mês</FormControl.Label>
              <Select 
                
                minWidth={150}
                defaultValue={Meses[0]}
                selectedValue={month} 
                accessibilityLabel="Escolha o Mês" 
                placeholder="Escolha o Mês" 
                _selectedItem={{bg: "teal.600", endIcon: <CheckIcon size={5} />}}
                onValueChange={(itemValue) => setMonth(itemValue)}>
                {Meses.map((item, index) => (
                    <Select.Item key={index} label={item} value={item} />
                ))}
              </Select>
              
          </FormControl>   

        <Button  variant={"ghost"}>Lido</Button>
        <Button  variant={"ghost"} onPress={() => console.log("apertou")}>Não Lido</Button>
      </View>

      <View style={styles.inLineText}>
        <FontAwesome name="check-square-o" size={24} color="black" />
        <Heading mx={5} size="sm">Dia</Heading>
        <Heading mx={5} size="sm">Leitura Bíblica</Heading>
      </View>
      <FlatList
        data={data}
        style={styles.flatList}
        renderItem={({ item }) => {
          return (
            <View style={styles.cards}>
              <View style={styles.innerCard}> 
                <Checkbox size="sm" colorScheme="purple" value="test" accessibilityLabel="This is a dummy checkbox" />
                <Heading mx={4} size="sm">{item.day + " " + item.month} </Heading>
                <Divider orientation="vertical"/>
                <View >
                    <Heading mx={2} size="sm">{item.book + " " + item.chapter + ":" +  item.verseStart + "-" +  item.verseEnd}</Heading>
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
  inLineText: {
    marginTop: 20,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  filter: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical:20,
    marginHorizontal: 60,
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
