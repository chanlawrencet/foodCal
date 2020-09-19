import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";


const Option = ({title, active, touched}) =>
  <View
    elevation={touched? 10 : 2}
    style={{
      height: 40,
      width: 80,
      paddingTop: 9,
      borderRadius: 50,
      borderColor: 'grey',
      backgroundColor: active ? '#F0FFFF' : 'white',
      borderWidth: 2,
    }}
  >
    <Text
      style={{
        textAlign: 'center',
      }}
    >
      {title}
    </Text>
  </View>;

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    let defaultDrawerOptions = [
      {
        title: 'foodList',
        active: false,
        touched: false,
      },
      {
        title: 'calendar',
        active: false,
        touched: false,
      }
    ];

    defaultDrawerOptions[props.currActive].active = true;

    this.state = {
      drawerOptions: defaultDrawerOptions,
    }
  }

  setIdx(idx, val) {
    const {drawerOptions} = this.state;
    const {currActive, setActive} = this.props;
    drawerOptions[idx].touched = val;

    if (currActive !== idx) {
      drawerOptions[idx].active = true;
      drawerOptions[currActive].active = false;
      setActive(idx);
    }

    this.setState({
      drawerOptions: drawerOptions,
    })
  }

  render() {
    const {drawerOptions} = this.state;
    return(
      <View style={{
        width: '100%',
        height: 80,
        borderColor:'blue',
        borderWidth:1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center'
      }}>
        {drawerOptions.map((drawerOption, idx) =>
          <View
            key={idx}
            onTouchStart={() => this.setIdx(idx, true)}
            onTouchEnd={() => this.setIdx(idx, false)}>
            <Option title={drawerOption.title} active={drawerOption.active} touched={drawerOption.touched}/>
          </View>)}
      </View>
      )

  }
}

export default Drawer;