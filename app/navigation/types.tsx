import { NavigatorScreenParams } from "@react-navigation/native";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
export type RootStackParamList = {
    Cover: undefined;
    Tabs:  NavigatorScreenParams<RootTabParamList> | undefined;
  };


  export type RootTabParamList = {
    Home: undefined;
    Bible: undefined;
    Register: undefined;
  };