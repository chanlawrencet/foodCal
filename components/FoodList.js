import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import FoodListItem from "./FoodListItem";
import AsyncStorage from '@react-native-community/async-storage';


const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@foodList', jsonValue)
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@foodList')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
};

const initData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@foodList')
    if (jsonValue === null) {
      storeData([]).then(() => {
        return true;
      });
    }
    return false;
  } catch(e) {
    // error reading value
  }
};

class FoodList extends React.Component {
  constructor(props) {
    super(props);
    initData().then(justInit => {
      if (justInit) {
        this.state = {
          data: []
        }
      } else {
        getData().then(data => {
          this.setState({
            data: data,
          })
        })
      }
    });
  }

  addData(toAppend){
    const {data} = this.state;
    data.push(toAppend)
    storeData(data).then(() => {
      this.setState({
        data: data,
      })
    })
  }

  clearData(){
    storeData([]).then(() => {
      this.setState({
        data: [],
      })
    })
  }

  render() {
    console.log(this.state);
    if (this.state === null) {
      return <View><Text>updating</Text></View>
    }

    const {data} = this.state;

    const renderItem = ({ item }) => (
      <FoodListItem title={item.title} />
    );

    return(
      <View>
        <View style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: 'black',
            }}

            onTouchStart={() => this.addData({
              title: "hello",
              id: Math.random(),
            })}
          />

          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: 'blue',
            }}

            onTouchStart={() => this.clearData()}
          />
        </View>

        <ScrollView>
          {data.map(el => <View key={el.key}><Text style={{padding: 20}}>{el.title}</Text></View>)}
        </ScrollView>
      </View>
    )
  }
}

export default FoodList;
