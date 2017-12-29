import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

export default class App extends React.Component {
  constructor() {
        super();
        this.state = {
            myNumber: "0",
            gradeArray: [{"grade":0,"value":0}]
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
                    <View style={styles.row}>
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
        "grade": 0,
        "value": 0
    };
    gradeArray.push(newGrade);

    this.setState({ gradeArray: gradeArray });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Test.</Text>
        {this.renderTextInputs()}
        <Text onPress={() => this.addNewGrade()}>Add a grade.</Text>
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
  },
  row: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
});
