import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Animated,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class SideMenu extends React.Component {
  constructor() {
        super();
        this.state = {
            menuX: new Animated.Value(-100),
        };
  }

  slide = (toValue) => {
    Animated.spring(this.state.menuX, {
      toValue: toValue,
      tension: 20
    }).start();
    this.setState({
      visible: true,
    });
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.open != this.props.open) {
      if (nextProps.open == true) this.slide(0);
      else if (nextProps.open == false) this.slide(-100);
    }
  }

  renderTabs() {
    return (
      <View style={styles.elements}>
        <TouchableOpacity onPress={() => this.props.setActiveTab(0)}>
          <Text style={styles.element}>Calculate Grades</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.setActiveTab(1)}>
          <Text style={styles.element}>My Grades</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderSlideOutMenu() {
    return (
      <Animated.View
        style={[styles.menu, {transform: [{ translateX: this.state.menuX }]}]}
        >
        {this.renderTabs()}
      </Animated.View>
    )
  }

  renderScreenOverlay() {
    return (
      {this.props.open &&
        <TouchableOpacity onPress={() => this.props.closeMenu()}>
          <View style={styles.overlay}></View>
        </TouchableOpacity>
      }
    )
  }

  render() {
    return (
      <View style={this.props.open ? styles.container : styles.none}>
        {this.renderSlideOutMenu()}
        {this.renderScreenOverlay()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    height: screenHeight,
    width: screenWidth,
  },
  menu: {
    zIndex: 1,
    flex: 1,
    backgroundColor: "black",
    width: 2 * screenWidth / 3,
    position: 'absolute',
    left: 0,
    top: 0,
    height: screenHeight,
  },
  overlay: {
    zIndex: 0,
    flex: 1,
    opacity: 0.5,
    backgroundColor: 'black',
    width: screenWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    height: screenHeight,
  },
  elements: {
    margin: 10,
    marginTop: 70,
  },
  element: {
    color: "#ccc",
    margin: 5,
    marginLeft: 10,
    fontSize: 20,
  }
});
