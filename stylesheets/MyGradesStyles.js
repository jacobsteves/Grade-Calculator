import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
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
    width: screenWidth,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#2c445e',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  warningBox: {
    width: screenWidth,
    height: 50,
    backgroundColor: '#b52e2b',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  rowEven: {
    width: screenWidth,
    height: 50,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  rowOdd: {
    width: screenWidth,
    height: 50,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  textBox: {
    width: 2 * screenWidth / 3,
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
