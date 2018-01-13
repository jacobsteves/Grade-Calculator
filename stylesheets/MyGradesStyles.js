import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  title: {
    margin: 5,
    width: 60,
  },
  textInput: {
    margin: 5,
    width: 60,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
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
  rowEven: {
    width: screenSize,
    height: 50,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  rowOdd: {
    width: screenSize,
    height: 50,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  textBox: {
    width: 2 * screenSize / 3,
    marginLeft: 20,
    marginRight: 20,
  },
  gradeGoal: {
    marginTop: 20,
  },
  noGradesView: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 18,
  },
});

module.exports = styles;
