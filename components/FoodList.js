import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, ToastAndroid} from 'react-native';
import FoodListItem from "./FoodListItem";
import AsyncStorage from '@react-native-community/async-storage';
import NoEntriesFound from "./NoEntriesFound";
import IoniconsGlyphs from "react-native-vector-icons/Ionicons";


const showToastWithGravity = () => {
  ToastAndroid.showWithGravityAndOffset(
    "There are no entries to clear",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,250
  );
};


const Option = ({title, active, touched, width=80}) =>
  <View
    elevation={touched? 10 : 2}
    style={{
      height: 40,
      width: width,
      borderRadius: 50,
      borderColor: 'grey',
      backgroundColor: active ? '#F0FFFF' : 'white',
      borderWidth: 2,
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <IoniconsGlyphs name={title=== 'Add Entry' ? 'ios-add' : 'ios-flame'} size={25} color={'rgb(0, 122, 255)'}/>
    <Text
      style={{
        textAlign: 'center',
        marginTop: -5,
        fontSize: 10
      }}
    >
      {title}
    </Text>
  </View>;

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
          data: [],
          touched: null
        }
      } else {
        getData().then(data => {
          this.setState({
            data: data,
            touched: null
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

  createTwoButtonAlert() {
    return(
      Alert.alert(
        "Clear all",
        "Are you sure you want to clear all?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: () => this.clearData() }
        ],
        { cancelable: true }
      )
    )
  }


  render() {
    console.log(this.state);
    if (this.state === null) {
      return <View><Text>updating</Text></View>
    }

    const {data, touched} = this.state;

    return(
      <View>
          <ScrollView>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10
            }}>
              <View
                onTouchStart={() => {

                  this.addData({title: "hello", id: Math.random()});
                  this.setState({
                    touched: 'addEntry'
                  })
                }}
                onTouchEnd={() => this.setState({touched: null})}
              >
                <Option title={'Add Entry'} active={false} touched={touched === 'addEntry'}/>
              </View>
              <View
                onTouchStart={() => {
                  if (data.length === 0) {
                    showToastWithGravity();
                  } else {
                    this.createTwoButtonAlert();
                  }
                  this.setState({
                    touched: 'clearEntries'
                  })
                }}
                onTouchEnd={() => this.setState({touched: null})}
              >
                <Option


                  title={'Clear entries'} active={false} touched={touched === 'clearEntries'} width={150}/>
              </View>

            </View>
            {data.length === 0 ? <NoEntriesFound/> :
              data.map((el, idx) => <View key={idx} style={{marginBottom: data.length === idx + 1 ? 20 : 0, marginTop: idx === 0 ? 10 : 0}}><FoodListItem title={el.title}/></View>)}

          </ScrollView>
      </View>
    )
  }
}

export default FoodList;
