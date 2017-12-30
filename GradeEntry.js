import React from 'react';
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

const screenSize = Dimensions.get('window').width;

export default class GradeEntry extends React.Component {
  constructor() {
        super();
        this.state = {
            calculated: false,
            grade: "0",
            gradeGoal: "0",
            totalPercent: "0",
            neededGrade: "0",
            maxMark: "0",
            className: "",
            gradeArray: [{"grade":"","value":""}]
        };
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
                value={this.state.gradeArray[i].grade}
            />
            <TextInput
                style={styles.textInput}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text)=> this.onChanged(i, false, text)}
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
    const { totalPercent, gradeGoal, neededGrade, calculated, maxMark, grade, className } = this.state;
    return (
      <View style={styles.container}>
      {(!calculated) &&
        <View style={{flex: 1}}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
              <View style={styles.row}>
                <Text style={styles.title}>Grade</Text>
                <Text style={styles.title}>Value</Text>
              </View>
              {this.renderTextInputs()}
            </ScrollView>
            <View style={styles.textRow}>
              <View style={styles.remainingBox}>
                <Text style={styles.textBox}>What grade on the remaining percent do I need to get a:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="0"
                    keyboardType="numeric"
                    onChangeText={(text)=> this.changeGradeGoal(text)}
                    value={gradeGoal}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => this.addNewGrade()}>
                <Text style={{color: 'white'}}>Add a grade</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.specialButton} onPress={() => this.calculateGrade()}>
                <Text style={{color: 'white'}}>CALCULATE</Text>
              </TouchableOpacity>
            </View>
        </View>
      }
      {calculated &&
        <View style={styles.gradeBox}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
              <Text>Current Grade: {grade}%</Text>
              <Text>Amount of Course Completed: {totalPercent}%</Text>
              {this.renderGoalView()}
            </ScrollView>
            <View style={styles.textRow}>
              <View style={styles.remainingBox}>
                <TextInput
                    style={styles.classInput}
                    placeholder="Class name..."
                    onChangeText={(text)=> this.setState({className: text})}
                    value={className}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => this.addNewGrade()}>
                <Text style={{color: 'white'}}>Save this grade</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.specialButton} onPress={() => this.setState({calculated: false})}>
                <Text style={{color: 'white'}}>BACK</Text>
              </TouchableOpacity>
            </View>
       </View>
      }
      </View>
    );
  }

}

/* <View style={styles.row}>
  <TextInput
      style={styles.classInput}
      placeholder="Class name.."
      onChangeText={(name) => this.setState({class: name})}
      value={this.state.class}
  />
</View> */
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
  remainingBox: {
    width: screenSize,
    height: 50,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
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
  },
  gradeGoal: {
    marginTop: 20,
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
  }
});