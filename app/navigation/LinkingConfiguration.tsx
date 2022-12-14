import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from './types';
 
 
 const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
   prefixes: [Linking.createURL('/')],
   config: {
     screens: {
        Cover: 'Cover',
        Tabs: {
         screens: {
           Home: {
             screens: {
              Home: 'Home',
             },
           },
           Bible: {
            screens:{
              Bible: "Bible",
            },
          },
          Register: {
            screens:{
              Register: "Register",
            },
          }
         },
       },
     },
   },
 };
 
 export default LinkingConfiguration;
 