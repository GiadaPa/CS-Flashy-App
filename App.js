import React from 'react';
import {Image, Button, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import DeckList from './DeckOperations/DeckList';
import { lightblue, white } from './colors';


import Constants from 'expo-constants';


export default class FlashCardApp extends React.Component {
  state = {
    showDeckList: false,
  }

  toggleDeckList = () => {
    this.setState(prevState => ({showDeckList: !prevState.showDeckList}))
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        { this.state.showDeckList ? (
            <DeckList />
            ) : 
          <View style={styles.view}>
            <Text style={styles.welcome}>Welcome to Flashy App</Text>
            <Text style={styles.spaceRep}>This is an app based on "Spaced repetition": </Text>
            <Text style={styles.introduction}>it is an evidence-based learning technique which incorporates increasing time intervals between each review of a flashcard in order to exploit the psychological spacing effect. Newly introduced and more difficult flashcards are shown more frequently while older and less difficult flashcards are shown less frequently.</Text>
            <Text> </Text>
            <Separator />  
            <Button title='SHOW DECKS'
                    color = "blue"
                    onPress={this.toggleDeckList}/>
            <Separator />  
            <Text> </Text>
            <Image source={require('./Brain-Booster.jpg')} style={{ maxHeight:200, maxWidth: 350, marginLeft: 6}}/>
          </View>
        }
      </SafeAreaView>
    );
  }
}

function Separator() {
  return <View style={styles.separator} />;
};


//-------------------------------------------------------------------
//styles for the components in this file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    marginTop: Constants.statusBarHeight,
  },
  welcome: {
    color: white,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spaceRep:{
    color: white,
    fontSize: 18,
    fontWeight: "200",
    textAlign: 'auto',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  introduction: {
    color: white,
    fontSize: 18,
    fontWeight: "200",
    textAlign: 'auto',
    marginLeft: 10,
    marginRight: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: white,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
//--------------------------------------------------------------------