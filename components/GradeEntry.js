import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Hamburger from 'react-native-hamburger';

import { saveGrade, updateSaveWarning } from '../actions/gradeActions.js';

const screenSize = Dimensions.get('window').width;

class GradeEntry extends React.Component {
  constructor(props) {
    super(props);

    let currentGradeArray = [{"grade":"","value":""}];
    let editId = props.editId;
    let className = "";
    if (editId >= 0) {
      for (i = 0; i < props.gradeLibrary.length; ++i) {
        if (props.editId == props.gradeLibrary[i].id) {
          currentGradeArray = props.gradeLibrary[i].grades;
          className = props.gradeLibrary[i].class;
        }
      }
    }

    console.log(currentGradeArray);

    this.state = {
      editId: editId,
      warning: "",
      calculated: false,
      grade: "0",
      gradeGoal: "0",
      totalPercent: "0",
      neededGrade: "0",
      maxMark: "0",
      className: className,
      gradeArray: currentGradeArray,
      gradeLibrary: []
    };

  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.warning !== this.state.warning) {
        this.setState({warning: nextProps.warning});
      }
      if (nextProps.editId !== this.state.editId) {
        let currentGradeArray = [{"grade":"","value":""}];
        let className = "";

        for (i = 0; i < nextProps.gradeLibrary.length; ++i) {
          if (nextProps.editId === nextProps.gradeLibrary[i].id) {
            currentGradeArray = nextProps.gradeLibrary.grades;
            className = props.gradeLibrary[i].class;
          }
        }

        this.setState({
          className: "",
          editId: nextProps.editId,
          gradeArray: currentGradeArray
        });
      }
  }

  changeGradeGoal(text) {
    this.onChanged(0, 0, text, true);
  }

  onChanged(position, gradeInput, text, isGoalGrade = false) {
      var newNumber = "";
      var numbers = "0123456789.";
      var { gradeArray, gradeGoal } = this.state;

      for (var i=0; i < text.length; i++) {
          if(numbers.indexOf(text[i]) > -1 ) {
              // Dont let the first number be 0
              if (!(i == 0 && text[i] == 0)) {
                  newNumber = newNumber + text[i];
              }
          }
      }

      if (isGoalGrade) gradeGoal = newNumber;
      else if (gradeInput) gradeArray[position].grade = newNumber;
      else gradeArray[position].value = newNumber;

      this.setState({ gradeArray: gradeArray, gradeGoal: gradeGoal });
  }

  renderTextInputs() {
    const gradeArray = this.state.gradeArray;
    return gradeArray.map((object, i) => {
        return (
          <View key={i} style={styles.row}>
            <TextInput
                style={styles.textInput}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text)=> this.onChanged(i, true, text)}
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.gradeArray[i].grade}
            />
            <TextInput
                style={styles.textInput}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text) => this.onChanged(i, false, text)}
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.gradeArray[i].value}
            />
          </View>
        );
      });
  }

  addNewGrade() {
    let { gradeArray } = this.state;
    let newGrade = {
        "grade": "",
        "value": ""
    };
    gradeArray.push(newGrade);

    this.setState({ gradeArray: gradeArray });
  }

  calculateGrade() {
    let currentGrade = 0;
    let totalPercent = 0;
    let neededGrade = 0;
    let maxMark = 0;
    const { gradeArray, gradeGoal } = this.state;

    gradeArray.forEach((object) => {
        if (object.value > 0) {
            currentGrade += object.grade * (object.value / 100);
            totalPercent += object.value / 1;
        }
    });

    if (totalPercent < 100) {
      let remainingPercent = 100 - totalPercent;

      neededGrade = 100 * (gradeGoal - currentGrade) / remainingPercent;
      maxMark = currentGrade + remainingPercent
    } else {
      maxMark = currentGrade;
    }

    this.setState({
        calculated: true,
        totalPercent: totalPercent,
        grade: currentGrade.toFixed(2),
        neededGrade: neededGrade.toFixed(2),
        maxMark: maxMark.toFixed(2)
    });
  }

  // Strong Exception Guarentee
  saveGrade = () => {
    const { className, grade, gradeArray } = this.state;
    this.props.actions.saveGrade(className, grade, gradeArray);
  }

  renderGoalView() {
    let text;
    const { totalPercent, gradeGoal, neededGrade, calculated, maxMark, grade } = this.state;

    if (gradeGoal > 0 && totalPercent < 100 && 0 < neededGrade && neededGrade <= 100) {
      text = (
        <Text style={styles.gradeGoal}>
          To reach a mark of {gradeGoal}%, you need {neededGrade}% on
          the remaining {100 - totalPercent}%.
        </Text>
      );
    }
    else if (gradeGoal > 0 && totalPercent < 100 && neededGrade > 100) {
      text = (
        <Text style={styles.gradeGoal}>
          Unfortunately, you cannot reach a mark of {gradeGoal}%, your maximum mark is {maxMark}%.
        </Text>
      );
    }
    else if (gradeGoal > 0 && totalPercent < 100 && neededGrade <= 0) {
      text = (
        <Text style={styles.gradeGoal}>
          Congratulations! You've already reached your goal of {gradeGoal}%.
        </Text>
      );
    }

    return text;
  }

  render() {
    const { totalPercent, gradeGoal, neededGrade, calculated, maxMark, grade, className, warning, editId } = this.state;
    return (
      <View style={styles.container}>
      {(!calculated) &&
        <View style={{flex: 1}}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
              {(editId >= 0) &&
                <View style={styles.row}>
                  <Text style={styles.className}>{className}</Text>
                </View>
              }
              <View style={styles.row}>
                <Text style={styles.title}>Grade</Text>
                <Text style={styles.title}>Value</Text>
              </View>
              {this.renderTextInputs()}
            </ScrollView>
            <View style={styles.textRow}>
              <View style={styles.remainingBox}>
                <Text style={styles.text}>Goal Grade:</Text>
                <TextInput
                    style={styles.textInputSpecial}
                    placeholder="0"
                    keyboardType="numeric"
                    onChangeText={(text)=> this.changeGradeGoal(text)}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    value={gradeGoal}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => this.addNewGrade()}>
                <Text style={[styles.text, {color: 'white'}]}>Add a grade</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.specialButton} onPress={() => this.calculateGrade()}>
                <Text style={[styles.text, {color: 'white'}]}>CALCULATE</Text>
              </TouchableOpacity>
            </View>
        </View>
      }
      {calculated &&
        <View style={styles.gradeBox}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
              <Text style={styles.text}>Current Grade: {grade}%</Text>
              <Text style={styles.text}>Amount of Course Completed: {totalPercent}%</Text>
              {this.renderGoalView()}
            </ScrollView>
            <View style={styles.textRow}>
                {!!(warning) &&
                  <View style={styles.warningBox}>
                    <Text>{warning}</Text>
                  </View>
                }
              <View style={styles.remainingBox}>
                <TextInput
                    style={styles.classInput}
                    placeholder="Class name..."
                    onChangeText={(text)=> this.setState({className: text})}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    value={className}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => this.saveGrade()}>
                <Text style={[styles.text, {color: 'white'}]}>Save this grade</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.specialButton} onPress={() => this.setState({calculated: false})}>
                <Text style={[styles.text, {color: 'white'}]}>BACK</Text>
              </TouchableOpacity>
            </View>
       </View>
      }
      </View>
    );
  }

}

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

function mapStateToProps(state) {
  return {
    warning: state.grade.warning,
    gradeLibrary: state.grade.gradeLibrary
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      saveGrade,
      updateSaveWarning
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeEntry);
