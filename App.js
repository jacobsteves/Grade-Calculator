import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Hamburger from 'react-native-hamburger';
import GradeEntry from './GradeEntry';
import SideMenu from './SideMenu';

const screenSize = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor() {
        super();
        this.state = {
            sideMenuOpen: false,
        };
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.hamburgerButton}>
          <Hamburger
            active={this.state.sideMenuOpen}
            type="spinCross"
            color="#cccccc"
            onPress={() => this.setState({sideMenuOpen: !this.state.sideMenuOpen})}
          />
        </View>
        <Text style={{color: 'white'}}>GradeMe</Text>
      </View>
    );
  }

  render() {
    const { sideMenuOpen } = this.state;
    return (
      <View style={styles.container}>
      {this.renderHeader()}
      <GradeEntry />
      <SideMenu open={sideMenuOpen} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    zIndex: 2,
    width: screenSize,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#2c445e',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  hamburgerButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    alignItems: 'center',
    justifyContent:'center',
    left: 0,
  }
});
