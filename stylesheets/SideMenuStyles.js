import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
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
