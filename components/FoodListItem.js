import React from 'react';
import {StyleSheet, Text, View} from "react-native";

class FoodListItem extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <View>
        <Text>{title}</Text>
      </View>
    );
  }
}

export default FoodListItem;

