import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';

export default class App extends React.Component {
  constructor() {
        super();
        this.state = {
            calculated: false,
            grade: "0",
            totalPercent: "0",
            gradeArray: [{"grade":"","value":""}]
        };
  }

  componentDidMount(){
    // for (i = 0; i < 25; ++i) {
    //   this.addNewGrade();
    // }
  }

  onChanged(position, gradeInput, text){
        var newText = '';
        var numbers = '0123456789';
        var newNumber = "";
        var gradeArray = this.state.gradeArray;

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                // Dont let the first number be 0
                if (!(i == 0 && text[i] == 0)) {
                    newText = newText + text[i];
                }
            }
            newNumber = newText;
        }

        if (gradeInput) gradeArray[position].grade = newNumber;
        else gradeArray[position].value = newNumber;

        this.setState({ gradeArray: gradeArray });
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
    const { gradeArray } = this.state;

    gradeArray.forEach((object) => {
        if (object.value > 0) {
            currentGrade += object.grade * (object.value / 100);
            totalPercent += object.value / 1;
        }
    });

    this.setState({
        calculated: true,
        totalPercent: totalPercent,
        grade: currentGrade + "%"
    });
  }

  render() {
    return (
      <View style={styles.container}>
      {(!this.state.calculated) &&
        <View style={{flex: 1}}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
                {this.renderTextInputs()}
            </ScrollView>
            <View style={styles.textRow}>
                <TouchableOpacity style={styles.button} onPress={() => this.addNewGrade()}>
                    <Text>Add a grade.</Text>
                </TouchableOpacity>
                <Text onPress={() => this.calculateGrade()}>CALCULATE</Text>
            </View>
        </View>
      }
      {this.state.calculated &&
        <View style={styles.gradeBox}>
            <Text>{this.state.grade}</Text>
            <Text onPress={() => this.setState({calculated: false})}>Back</Text>
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
    //alignItems: 'center',
    //justifyContent: 'center',
    //margin: 2,
    padding: 20,
  },
  row: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 2,
    //backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 35,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  gradeBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    //width: 300,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 1,
  },
  scrollViewContainer: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingBottom: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});
