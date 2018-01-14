import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
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
  remainingBox: {
    width: screenWidth,
    height: 50,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    width: screenWidth,
    height: 50,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#aaaaaa',
  },
  specialButton: {
    width: screenWidth,
    height: 50,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#5889bd',
  },
  textBox: {
    width: 2 * screenWidth / 3,
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
  },
  saveGradeModal: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  saveGradeModalButton: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
});
