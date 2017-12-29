import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView
} from 'react-native';

export default class App extends React.Component {
  constructor() {
        super();
        this.state = {
            calculated: false,
            grade: "0/0",
            gradeArray: [{"grade":"0","value":"0"}]
        };
  }

  onChanged(position, gradeInput, text){
        var newText = '';
        var numbers = '0123456789';
        var newNumber = "";
        var gradeArray = this.state.gradeArray;

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
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
                            placeholder="0"
                            keyboardType="numeric"
                            onChangeText={(text)=> this.onChanged(i, true, text)}
                            value={this.state.gradeArray[i].grade}
                        />
                        <TextInput
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
        "grade": "0",
        "value": "0"
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
            currentGrade += object.grade / (object.value / 100);
            totalPercent += object.value / 1;
        }
    });

    this.setState({
        calculated: true,
        grade: currentGrade + " / " + totalPercent
    });
  }

  render() {
    return (
      <View style={styles.container}>
      {(!this.state.calculated) &&
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {this.renderTextInputs()}
            <Text onPress={() => this.addNewGrade()}>Add a grade.</Text>
            <Text onPress={() => this.calculateGrade()}>CALCULATE</Text>
        </ScrollView>
      }
      {this.state.calculated &&
        <View>
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  row: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 2,
  },
});
