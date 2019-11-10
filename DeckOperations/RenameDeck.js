//--------------------------------------------------------------------------------------
//Imports for this component
import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import { grey , white} from '../colors'
//--------------------------------------------------------------------------------------

export default class RenameDeck extends React.Component {
//--------------------------------------------------------------------------------------
//Constructor fo the Rename component
    constructor(props){
        super(props);

        this.state = {
            name: '',
        }
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Functions to handle the input and submitting of the new deck's name
    handleNameChange = name => {
        this.setState({name})
    }

    handleSubmit = () => { 
        this.props.onSubmit({...this.state})
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Render method for the RenameDeck component
    render(){
        return(
            <View>
            <Text style={styles.headings}>Here you can rename the deck</Text>
            <TextInput  placeholder = " Insert new name"
                        style={styles.input} 
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                        />
            <Separator/>
            <Button title="Submit"
                    color="lightgreen"
                    onPress={this.handleSubmit}
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

//--------------------------------------------------------------------------------------
//Styles for RenameDeck component
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
