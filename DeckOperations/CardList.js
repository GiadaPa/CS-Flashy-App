//--------------------------------------------------------------------------------------
//Imports for this component
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput } from 'react-native';
import { Card } from 'react-native-elements'
import { white, green, black, red } from '../colors';
//--------------------------------------------------------------------------------------

export default class CardList extends React.Component{
//--------------------------------------------------------------------------------------
//Constructor fo the CardList component
    constructor(props){
        super(props);

        this.state = {
            index: 0,
            correctList: [],
            incorrectList: [],
            showFront: true,
            showRes: false,
            showTheEnd: false,
            showAddCard: false,
            showBack: false,
            front: '',
            back: '',
        }
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to handle the flip of the card to show the answer
    flip = () => {
        this.setState(prevState => ({
            showFront: !prevState.showFront,
            showRes: false,
            showTheEnd: false,
        }))     
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to handle the restart button for the deck exercise
    toggleRestart = (index) => {
        index = this.setState(index => ({index:0}))
        this.setState(prevState => ({
            showFront: prevState.showFront
        }))
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to add the card to the deck of correct cards
    addToCorrect = (currentCard) => {
        correctList = this.state.correctList.push(currentCard)
        if(this.state.index === this.props.cards.length-1){
            this.toggleTheEnd()
        }else{
            index = this.state.index++,
            this.setState(prevState => ({
                showFront: !prevState.showFront
            }))
        }
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to add the card to the deck of wrong cards
    addToIncorrect = (currentCard) => {
        incorrectList = this.state.incorrectList.push(currentCard) 
        if(this.state.index === this.props.cards.length-1){
            this.toggleTheEnd()
        }else{
            index = this.state.index++,
            this.setState(prevState => ({
                showFront: !prevState.showFront
            }))
        }   
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to show the result after the deck exercise
    toggleShowRes = () => {
        this.setState(prevState => ({
            showRes: !prevState.showRes
        }))
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to handle the end of the deck exercise
    toggleTheEnd = () => {
        this.setState(prevState => ({
            showTheEnd: !prevState.showTheEnd
        }))
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to handle the exercise continuation for the deck of incorrect cards
    toggleIncorrectCards = () => {
        if(this.state.incorrectList.length === 0){
            this.setState(prevState => ({
                showBack: !prevState.showBack
            }))
        } else{
            this.setState(prevState => ({
                showFront: !prevState.showFront,
            }))   
            this.props.cards = this.state.incorrectList
            this.state.correctList = []
            this.state.incorrectList = []
        }
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to handle end of deck exercise and go back to list of all decks
    handleBack = () => {
        this.props.onBack()
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Function to handle end of deck exercise and go back to list of all decks
handleDelete = () => {
    this.props.onDeleteCard({
        front: this.props.cards[this.state.index].front,
        back: this.props.cards[this.state.index].back
    })
}
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Functions to handle card operations
    toggleAddCard = () => {
        this.setState(prevState => ({
            showAddCard: !prevState.showAddCard
        }))
    }

    handleCardFront = front => {
        this.setState({front})
    }

    handleCardBack = back => {
        this.setState({back})
    }

    handleSaveOfNewCard = () => {
        this.props.onSaveOfNewCard({
            front: this.state.front,
            back: this.state.back
        })
    }
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//Render method of the CardList component
    render() {     
        return(
            <SafeAreaView> 
                {
                    this.state.showBack ? (
                        <View>
                            <Separator/>
                            <Button title="BACK TO DECKS"
                                    color='blue'
                                    onPress={this.handleBack}
                                    />
                            <Separator/>
                        </View>
                    ):
                    
                    this.state.showFront ? (
                    <View >
                            <Text style={styles.question}>What is the answer?</Text>
                            <Card> 
                                <Text style={styles.cardstyle}>
                                    {this.props.cards[this.state.index].front}
                                </Text>
                            </Card>
                            <View>
                            <Separator/>
                            <View style={styles.fixToText}>
                                <Button title="SHOW ANSWER"
                                        color="darkviolet"
                                        onPress={this.flip}
                                        />
                                <Button title="RESTART"
                                        color='yellow'
                                        onPress={() => this.toggleRestart(this.state.index)}
                                        />
                            </View>
                            <Separator/>
                            </View>
                            <View>
                            <Separator/>
                                <Button title="BACK"
                                        color='blue'
                                        onPress={this.handleBack}
                                    />
                            <Separator/>
                            </View>
                            <View>
                            <Separator/>
                                <Button title="DELETE"
                                        color='blue'
                                        onPress={this.handleDelete}
                                    />
                            <Separator/>
                            </View>
                    </View>
                    ):

                    this.state.showAddCard ? (
                        <View >
                        <Text style={styles.headings}>Here you can add a new card</Text>
                        <TextInput  placeholder = ' Insert new front'
                                    style={styles.input}
                                    value={this.state.front}
                                    onChangeText={this.handleCardFront}
                                    />
                        <Text> </Text>
                        <TextInput  placeholder = ' Insert new back'
                                    style={styles.input}
                                    value={this.state.back}
                                    onChangeText={this.handleCardBack}
                                    />
                        <Separator/>
                        <Button title="SAVE" 
                                color="lightgreen"
                                onPress={this.handleSaveOfNewCard}
                                />
                        <Separator/>
                    </View>
                    ):

                    this.state.showRes ? (    
                        <View>
                            <Text style={styles.comment}>RESULTS out of {this.props.cards.length} cards: </Text>
                            <Text style={styles.scoreC}>     {this.state.correctList.length} correct cards</Text>
                            <Text style={styles.scoreI}>     {this.state.incorrectList.length} incorrect cards</Text>
                            <Separator />
                            <Button title="GO TO DECK OF INCORRECT CARDS"
                                    color='cyan'
                                    onPress={this.toggleIncorrectCards}
                                    />
                            <Button title="ADD A CARD"
                                    color="orange"
                                    onPress={this.toggleAddCard}
                                    />
                            <Separator />
                            <View>
                            <Separator/>
                                <Button title="BACK"
                                        color='blue'
                                        onPress={this.handleBack}
                                    />
                            <Separator/>
                            </View>
                        </View>
                    ):

                    this.state.showTheEnd ? (
                        <View>
                            <Separator />
                            <Button title="SHOW RESULTS"
                                    color="green"
                                    onPress={this.toggleShowRes}
                                    />
                            <Separator />
                        </View>
                    ):

                    <View >
                        <Card >
                            <Text style={styles.cardstyle}>
                                {this.props.cards[this.state.index].back}
                            </Text>
                        </Card> 
                        <View>
                        <Separator/>
                        <View style={styles.fixToText}>
                        <Separator/>
                            <Button title="CORRECT"
                                    color="green"
                                    onPress={() => this.addToCorrect(this.props.cards[this.state.index])}
                                    />
                            <Button title="INCORRECT"
                                    color="darkred"
                                    onPress={() => this.addToIncorrect(this.props.cards[this.state.index])}
                                    />                          
                        </View>
                        <Separator/>
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
//Styles for CardList component
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5,
      },
    scoreC: {
        color: green,
        fontSize: 32,
        fontWeight: 'bold',
    },
    scoreI:{
        color: red,
        fontSize: 32,
        fontWeight: 'bold',  
    },
    incorrectComment:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        color: white,
        fontSize: 20,
    },
    comment:{
        color: white,
        fontSize: 24,
    },
    cardstyle:{
        color: black,
        fontSize: 32,
    }, 
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
    question:{
        padding: 15,
        color: white,
        fontSize: 24,
    }
})
//--------------------------------------------------------------------------------------
