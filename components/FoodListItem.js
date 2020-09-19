import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default function FoodListItem({title}) {
    return (
      <View elevation={10} style={{padding: 20, backgroundColor: '#F0FFFF', margin: 10, borderTopLeftRadius: 20,
        borderTopRightRadius: 20,}}>
        <Text>{title}</Text>
      </View>
    );
}



