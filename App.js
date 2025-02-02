import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import { Constants } from 'expo';
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
            editId: -1,
            sideMenuOpen: false,
            activeTab: 0,
        };
  }

  componentDidMount() {
      this.getSafeAreaHeader();
  }

  setActiveTab(tab) {
      console.log("set active tab: ", tab);
      this.setState({
        editId: -1,
        activeTab: tab,
        sideMenuOpen: false,
      });
  }

  setEditMode(id) {
    console.log('id:', id);
      this.setActiveTab(0);
      this.setState({editId: id});
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.hamburgerButton}>
          <Hamburger
            active={this.state.sideMenuOpen}
            type="spinCross"
            color="#cccccc"
            onPress={() => {
                console.log("Press");
                this.setState({sideMenuOpen: !this.state.sideMenuOpen})
            }}
          />
        </View>
        <Text style={[styles.text, {color: 'white'}]}>GradeMe</Text>
      </View>
    );
  }

  getSafeAreaHeader() {
      if (Platform.OS == "android") {
          this.setState({
              appSpacerHeader: Constants.statusBarHeight
          });
      } else {
          if (Constants.statusBarHeight > 20) {
              this.setState({
                  appSpacerHeader: Constants.statusBarHeight - 10
              });
          }
      }
      console.log(Constants.statusBarHeight);
  }

  render() {
    const { sideMenuOpen, activeTab, editId, appSpacerHeader } = this.state;
    return (
      <Provider store={store}>
          <View style={styles.container}>
              <View style={{ height: appSpacerHeader }} />
              {this.renderHeader()}
              {activeTab == 0 &&
                <GradeEntry editId={editId} />
              }
              {activeTab == 1 &&
                <MyGrades setEditMode={(id) => this.setEditMode(id)}/>
              }
              <SideMenu
                  appSpacerHeader={appSpacerHeader}
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
