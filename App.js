// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View, FlatList } from 'react-native';
// import FoodList  from './components/FoodList'
// import Drawer from "./components/Drawer";
// import Calendar from "./components/Calendar";
//
// export default function App() {
//
//   const [currScreen, setCurrScreen] = React.useState(0);
//
//   return (
//     <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
//       <View style={{height: '87%', marginTop: 30}}>
//         {currScreen === 0 ? <FoodList/> : null}
//         {currScreen === 1 ? <Calendar/> : null}
//       </View>
//
//       <View>
//         <Drawer currActive={currScreen} setActive={setCurrScreen}/>
//       </View>
//     </View>
//   );
// }
//
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

import * as React from 'react';
import { Button, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FoodList from "./components/FoodList";
import Calendar from "./components/Calendar";
import IoniconsGlyphs from 'react-native-vector-icons/Ionicons';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer screenOptions={{ gestureEnabled: false }}>
      <Tabs.Navigator initialRouteName="FoodList"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'FoodList') {
              iconName = focused
                ? 'ios-pizza'
                : 'ios-pizza';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar';
            }

            console.log(size, color)
            // You can return any component that you like here!
            return <IoniconsGlyphs name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="FoodList" component={FoodList}/>
        <Tabs.Screen name="Calendar" component={Calendar}/>
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
