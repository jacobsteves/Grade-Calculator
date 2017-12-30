import * as types from './actionTypes';
import { AsyncStorage } from 'react-native';

export function getGrades() {
  return dispatch => {
    new Promise(async (resolve, reject) => {
      try {
        const gradeLibrary = await AsyncStorage.getItem("gradeLibrary");
        dispatch(saveGradeLibraryToState(JSON.parse(gradeLibrary)));
      } catch (error) {
        // error getting data
      }
    });
  };
}

export function saveGrade(className, grade, arr) {
  return dispatch => {
    new Promise(async (resolve, reject) => {
        if (className) {
          try {
            let id = await AsyncStorage.getItem("numberOfGrades");
            if (!id) id = 0;
            let newClassObj = {
              "id": id,
              "class": className,
              "currentGrade": grade,
              "grades": arr
            };

            try {
              // try to Increment numGrades, if error is thrown, do nothing and
              // rethrow that error
              try {
                AsyncStorage.setItem("numberOfGrades", (parseInt(id) + 1).toString());
              } catch (error) {
                throw error;
              }
              dispatch(updateGradeLibrary(newClassObj));
              dispatch(updateSaveWarning("Save Successful"));
            } catch (error) {
              dispatch(updateSaveWarning("Error saving grades."));
            }
          } catch (error) {
            dispatch(updateSaveWarning("Error grabbing course IDs."));
          }
        } else {
          dispatch(updateSaveWarning("You must specify a class name."));
        }
    });
  }
}

export function updateSaveWarning(data) {
  return {
    type: types.UPDATE_SAVE_WARNING,
    data: data
  }
}

export function updateGradeLibrary(data) {
  return {
    type: types.UPDATE_GRADE_LIBRARY,
    data: data
  }
}

export function saveGradeLibraryToState(data) {
  return {
    type: types.SAVE_GRADE_LIBRARY,
    data: data
  }
}
