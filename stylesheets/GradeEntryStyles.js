import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  row: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 2,
  },
  textRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    margin: 5,
    width: 60,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
  },
  textInputSpecial: {
    margin: 5,
    width: 60,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    textAlign: 'center',
  },
  classInput: {
    width: 130,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    margin: 10,
    textAlign: 'center',
  },
  gradeBox: {
    margin: 20,
    marginBottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 1,
  },
  scrollViewContainer: {
    paddingBottom: 50,
  },
  header: {
    width: screenSize,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#2c445e',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  warningBox: {
    width: screenSize,
    height: 50,
    backgroundColor: '#b52e2b',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  remainingBox: {
    width: screenSize,
    height: 50,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    width: screenSize,
    height: 50,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#aaaaaa',
  },
  specialButton: {
    width: screenSize,
    height: 50,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#5889bd',
  },
  textBox: {
    width: 2 * screenSize / 3,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
  gradeGoal: {
    marginTop: 20,
    fontSize: 18,
  },
  title: {
    margin: 5,
    width: 60,
    fontSize: 18,
    textAlign: 'center',
  },
  saveButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 0,
    backgroundColor: '#cccccc',
  },
  hamburgerButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    alignItems: 'center',
    justifyContent:'center',
    left: 0,
  },
  className: {
    fontSize: 22,
    marginBottom: 10,
  }
});

module.exports = styles;
