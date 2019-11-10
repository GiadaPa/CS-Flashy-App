//--------------------------------------------------------------------------------------
//Imports for this component
import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { white } from '../colors'
//--------------------------------------------------------------------------------------

export default class AddDeck extends React.Component{
//--------------------------------------------------------------------------------------
//Constructor fo the AddDeck component
    constructor(props){
        super(props);

        this.state = {
            name: '',
            cards: [],
        }
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Functions to handle the input and the saving of the new deck
    handleNameChange = name => {
        this.setState({name})
    }

    handleSave = () => {
        this.props.onSave({...this.state})
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Render method of the AddDeck component
    render(){
        return(
            <View >
                <Text style={styles.headings}>Here you can add a new deck</Text>
                <TextInput  placeholder = ' Insert name of new deck'
                            style={styles.input}
                            value ={this.state.name}
                            onChangeText={this.handleNameChange}
                            />
                <Separator/>
                <Button title ="SAVE" 
                        color = "lightgreen"
                        onPress = {this.handleSave}
                        />
                <Separator/>
            </View>
        )
    }
}
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to style a Separator between component of the UI
function Separator() {
    return <View style={styles.separator} />;
}

//--------------------------------------------------------------------------------------
//Styles for AddDeck component
const styles = StyleSheet.create ({
    headings:{
        color: white,
        fontSize: 20,
        padding: 20,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: white,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    input:{
        borderColor: 'black',
        borderWidth: 2,
        height: 40,
    },
})
//--------------------------------------------------------------------------------------