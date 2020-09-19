import React from 'react';
import {StyleSheet, Text, View} from "react-native";

class FoodListItem extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <View elevation={10} style={{padding: 20, backgroundColor: '#F0FFFF', margin: 10, borderRadius: 10}}>
        <Text>{title}</Text>
      </View>
    );
  }
}

export default FoodListItem;

