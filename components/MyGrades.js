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
import styles from '../stylesheets/MyGradesStyles'
import Hamburger from 'react-native-hamburger';

import { getGrades } from '../actions/gradeActions.js';

class MyGrades extends React.Component {
  constructor() {
    super();
    this.state = {
      warning: "",
      calculated: false,
      grade: "0",
      gradeGoal: "0",
      totalPercent: "0",
      neededGrade: "0",
      maxMark: "0",
      className: "",
      gradeArray: [{"grade":"","value":""}],
      gradeLibrary: []
    };
  }

  componentWillReceiveProps(nextProps) {
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
                onChangeText={(text)=> this.onChanged(i, false, text)}
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

  renderGradeRow() {
    const { gradeLibrary } = this.props;

    return (
      <TouchableOpacity
        key={i}
        onPress={() => this.props.setEditMode(gradeLibrary[i].id)}
        style={(i % 2 == 0) ? styles.rowEven : styles.rowOdd}
        >
        <Text>{gradeLibrary[i].class}: {gradeLibrary[i].currentGrade}%.</Text>
      </TouchableOpacity>
    );
  }

  renderGradeRows() {
    const { gradeLibrary } = this.props;

    return (
      <ScrollView style={styles.scrollView}>
        {gradeLibrary.map((object, i) => { return renderGradeRow() })}
      </ScrollView>
    )
  }

  renderNoSavedGrades() {
    return (
      <View style={styles.noGradesView}>
        <Text style={styles.text}>You have no saved grades!</Text>
      </View>
    )
  }

  renderGrades() {
    const { gradeLibrary } = this.props;

    if (gradeLibrary.length === 0) return this.renderNoSavedGrades();
    return this.renderGradeRows();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderGrades()}
      </View>
    );
  }

}

function mapStateToProps(state) {
  return {
    gradeLibrary: state.grade.gradeLibrary
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getGrades
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGrades);
