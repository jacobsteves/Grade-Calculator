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

const screenSize = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor() {
        super();
        this.state = {
            calculated: false,
            grade: "0",
            gradeGoal: "0",
            totalPercent: "0",
            neededGrade: "0",
            gradeArray: [{"grade":"","value":""}]
        };
  }

  componentDidMount(){
    // for (i = 0; i < 25; ++i) {
    //   this.addNewGrade();
    // }
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
    const { gradeArray, gradeGoal } = this.state;

    gradeArray.forEach((object) => {
        if (object.value > 0) {
            currentGrade += object.grade * (object.value / 100);
            totalPercent += object.value / 1;
        }
    });

    if (totalPercent < 100) {
      neededGrade = 100 * (gradeGoal - currentGrade) / (100 - totalPercent);
    }

    this.setState({
        calculated: true,
        totalPercent: totalPercent,
        grade: currentGrade.toFixed(2),
        neededGrade: neededGrade.toFixed(2)
    });
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={{color: 'white'}}>GradeMe</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
      {this.renderHeader()}
      {(!this.state.calculated) &&
        <View style={{flex: 1}}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
                {this.renderTextInputs()}
            </ScrollView>
            <View style={styles.textRow}>
              <View style={styles.remainingBox}>
                <Text style={styles.textBox}>What grade on the remaining percent do I need to get a</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="0"
                    keyboardType="numeric"
                    onChangeText={(text)=> this.changeGradeGoal(text)}
                    value={this.state.gradeGoal}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={() => this.addNewGrade()}>
                <Text style={{color: 'white'}}>Add a grade.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.specialButton} onPress={() => this.calculateGrade()}>
                <Text style={{color: 'white'}}>CALCULATE</Text>
              </TouchableOpacity>
            </View>
        </View>
      }
      {this.state.calculated &&
        <View style={styles.gradeBox}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
              <Text>Current Grade: {this.state.grade}%</Text>
              <Text>Amount of Course Completed: {this.state.totalPercent}%</Text>
              {(this.state.totalPercent < 100 && this.state.grade < this.state.gradeGoal) &&
                <Text style={styles.gradeGoal}>
                  To reach a mark of {this.state.gradeGoal}%, you need {this.state.neededGrade}% on
                  the remaining {100 - this.state.totalPercent}%.
                </Text>
              }
            </ScrollView>
            <View style={styles.textRow}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  gradeBox: {
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
    alignItems: 'center',
    backgroundColor: '#2c445e',
    padding: 20,
    marginBottom: 20,
  },
  remainingBox: {
    width: screenSize,
    height: 50,
    backgroundColor: '#cccccc',
    justifyContent:'center',
    flexWrap: 'wrap',
    //flexDirection:'row',
    //padding: 20,
  },
  button: {
    width: screenSize,
    height: 50,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#aaaaaa',
    //padding: 20,
  },
  specialButton: {
    width: screenSize,
    height: 50,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#5889bd',
    //padding: 20,
  },
  textBox: {
    width: 2 * screenSize / 3,
    marginLeft: 20,
    marginRight: 20,
  },
  gradeGoal: {
    marginTop: 20,
  },
});
