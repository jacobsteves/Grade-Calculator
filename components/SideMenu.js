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
import styles from '../stylesheets/SideMenuStyles'

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
          <View style={{ height: this.props.appSpacerHeader }} />
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
    if (this.props.open) {
      return (
          <TouchableOpacity onPress={() => this.props.closeMenu()}>
            <View style={styles.overlay}></View>
          </TouchableOpacity>
      )
    }
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
