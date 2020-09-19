import {Text, View} from "react-native";
import React from "react";


export default function NoEntriesFound() {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
      }}
    >
      <View elevation={10} style={{padding: 20, backgroundColor: 'white', margin: 10, borderRadius: 10, width: 200}}>
        <Text
          style={{
            textAlign: 'center'
          }}
        >No entries found.</Text>
      </View>
    </View>
  );
}

