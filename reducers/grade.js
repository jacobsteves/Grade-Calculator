import * as types from '../actions/actionTypes';

import { AsyncStorage } from 'react-native';

const initialState = {
  warning: "",
  gradeLibrary: [],
};

export default function grade(state = initialState, action = {}) {
  let newState = state;
  switch (action.type) {
    case types.UPDATE_SAVE_WARNING:
    console.log('1');
      // simply update the warning
      return {
        ...state,
        warning: action.data
      }
    case types.UPDATE_GRADE_LIBRARY:
    console.log('2');
      // add our new object to library object
      newLibrary = newState.gradeLibrary;
      newLibrary.push(action.data);

      // This is always wrapped within a try block, so exception safety is kept
      AsyncStorage.setItem("gradeLibrary", JSON.stringify(newLibrary));

      return {
        ...state,
        gradeLibrary: newLibrary
      }
    case types.SAVE_GRADE_LIBRARY:
    console.log('save');
      return {
        ...state,
        gradeLibrary: action.data
      }
    default:
      console.log('default');
      return state;
  }
}
