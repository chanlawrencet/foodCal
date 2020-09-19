import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FoodList  from './components/FoodList'
import Drawer from "./components/Drawer";
import Calendar from "./components/Calendar";

export default function App() {

  const [currScreen, setCurrScreen] = React.useState(1);

  return (
    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
      <View style={{height: '60%'}}>
        {currScreen === 0 ? <FoodList/> : null}
        {currScreen === 1 ? <Calendar/> : null}
      </View>

      <View>
        <Drawer currActive={currScreen} setActive={setCurrScreen}/>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
