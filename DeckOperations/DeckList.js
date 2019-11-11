//--------------------------------------------------------------------------------------
//Imports for this component
import React from 'react'
import { ScrollView, SafeAreaView, StyleSheet, Text, View, Button } from 'react-native'
import { white } from '../colors'
import decks from '../CardOperations/flashcards' 
import RenameDeck from './RenameDeck'
import AddDeck from './AddDeck'
import CardList from './CardList'
//--------------------------------------------------------------------------------------



export default class DeckList extends React.Component {
//--------------------------------------------------------------------------------------
//Constructor for this component
    constructor(props) {
        super(props);

        this.state = { 
            decks: decks,
            showAddDeck: false,
            showDeck: false,
            selectedDeck: null,
        }
    }
//--------------------------------------------------------------------------------------
 

//--------------------------------------------------------------------------------------
//Functions to add a deck to the list of decks
    toggleAdd = () => {
        this.setState(prevState => ({showAddDeck: !prevState.showAddDeck}))
    }

    addDeck = newDeck => {
        this.setState(prevState => ({
            showAddDeck: false,
            decks: [...prevState.decks, newDeck]
            }))
    }
//--------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------
//Function to add a new card to the selected deck
    addNewCard = newCard => {
        this.setState({
            showDeck: false,
        })
        this.state.selectedDeck.push(newCard)
    }
//--------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------
//Functions to rename a deck in the list of decks
    toggleRename = deck => {
        this.setState(prevState => ({
            showRenameDeck: !prevState.showRenameDeck,
            selectedDeck: deck.name
        }))
    } 
//--------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------
//does not show the renamed deck in the list ----> it renames the deck but when the component is rerendered does not save the state
    renameDeck = newName => {
        this.state.selectedDeck = newName.name
        this.setState({
            //showRenameDeck: false,
            selectedDeck: newName.name,
            })
        console.log(this.state.selectedDeck)
    }
//--------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------
//Function to select a deck and show the cards it contains
    selectDeck = deck => {
        this.setState(prevState => ({
            showDeck: !prevState.showDeck,
            selectedDeck: deck.cards,
            }))
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to delete a deck from the list of existing decks
    toggleDeleteDeck = deck => {
        const deckname = deck.name

        this.setState({
            decks: this.state.decks.filter( deck =>
                deck.name !== deckname
                )
            })
    }
//--------------------------------------------------------------------------------------

//Function to delete a card ----> It deletes the card inside the deck but does not save the deletion when the component is rerendered
    deleteCard = cardToDelete => {
        const cardFront = cardToDelete.front

        this.setState({
            selectedDeck:  this.state.selectedDeck.filter(card =>
                card.front !== cardFront
                )
            })
        //console.log(cardFront, this.state.selectedDeck)
    }

//--------------------------------------------------------------------------------------
//Function to handle the coming back to this component
    backToDeckList = () => {
        this.setState({
            showDeck: false
        })
    }
//--------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------
//Render method for this component
    render() {
        const deckNames = this.state.decks.map( deck => 
            <View key={deck.name}>
                <Separator/>
                <Button title={deck.name.concat(' (', deck.cards.length, ' cards)')}
                        color='blue'
                        onPress={() => this.selectDeck(deck)}
                        />
                <View style={styles.fixToText}>
                
                <Button title="DELETE"
                        color='darkred'
                        onPress={() => this.toggleDeleteDeck(deck)}
                    />
                <Button title="RENAME"
                        color='pink'
                        onPress={() => this.toggleRename(deck)}
                    />
                </View>
            </View>
        )
        
        return (
            <SafeAreaView style={styles.container}>
                {
                    this.state.showAddDeck ? (
                        <AddDeck onSave={this.addDeck}/>
                    ):

                    this.state.showDeck ? (
                        <CardList   cards={this.state.selectedDeck}
                                    onBack={this.backToDeckList}
                                    onSaveOfNewCard={this.addNewCard}
                                    onDeleteCard={this.deleteCard}/>
                    ):

                    this.state.showRenameDeck ? (
                        <RenameDeck onSubmit={this.renameDeck}
                                    name={this.state.selectedDeck}
                        />
                    ): 
                        
                    <View>
                        <Text style={styles.deckList}>Choose one of the following {this.state.decks.length} decks </Text>
                        <ScrollView >
                            {deckNames}
                        </ScrollView>
                        <Separator />  
                        <View style={styles.fixToText}>       
                            <Button color="lightgreen"
                                    title="ADD DECK" 
                                    onPress={this.toggleAdd}
                            />
                        </View>
                    </View> 
                } 
            </SafeAreaView>
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
//Styles for the DeckList component
const styles = StyleSheet.create ({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckList:{
        margin: 10,
        color: white,
        fontSize: 20,
        textAlign: 'center'
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: white,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})
//--------------------------------------------------------------------------------------
