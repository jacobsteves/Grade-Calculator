import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import Hamburger from 'react-native-hamburger';
import GradeEntry from './components/GradeEntry';
import SideMenu from './components/SideMenu';
import MyGrades from './components/MyGrades';
import * as reducers from './reducers';

const screenSize = Dimensions.get('window').width;

const createStoreWithMiddleware = compose(applyMiddleware(thunk)(createStore));
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends React.Component {
  constructor() {
        super();
        this.state = {
            sideMenuOpen: false,
            activeTab: 0,
        };
  }

  setActiveTab(tab) {
      this.setState({
        activeTab: tab,
        sideMenuOpen: false,
      });
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
        <Text style={[styles.text, {color: 'white'}]}>GradeMe</Text>
      </View>
    );
  }

  render() {
    const { sideMenuOpen, activeTab } = this.state;
    return (
      <Provider store={store}>
        <View style={styles.container}>
        {this.renderHeader()}
        {activeTab == 0 &&
          <GradeEntry />
        }
        {activeTab == 1 &&
          <MyGrades />
        }
        <SideMenu
          open={sideMenuOpen}
          closeMenu={() => this.setState({sideMenuOpen: !this.state.sideMenuOpen})}
          setActiveTab={(val) => this.setActiveTab(val)}
        />
        </View>
      </Provider>
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
  },
  text: {
    fontSize: 18,
  },
});
