import React,{useState} from "react";
import { View,Text,StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard,Alert, ScrollView, KeyboardAvoidingView, Dimensions} from "react-native";
import Card from "../components/Card";
import Colors from '../constants/colors';
import Input from "../components/Input";
import MainButton from "../components/MainButton";

const StartGameScreen=props=>{

    const [enteredValue,setEnteredValue]=useState('');
    const [isConfirmed,setCofirmed]=useState(false);
    const [selectedNumber,setSelectedNumber]=useState();

    const numberInputHandler=inputText=>{
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    }

    const resetInputHandler=()=>{

        setEnteredValue('');
        setCofirmed(false);
    }

    const confirmInputHandler=()=>{
            setCofirmed(true);
            const choosenNumber=setSelectedNumber(parseInt(enteredValue));
            if(choosenNumber===NaN){
                Alert.alert('Invalid number!','this is not a number',[{
                    text:'Ok',style:'destructive',onPress:resetInputHandler
                }]);
                return;
            }
            setEnteredValue('');
            Keyboard.dismiss();
            
    }

    let confirmedOutput;
    if(isConfirmed){
        confirmedOutput=<Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <View style={styles.numberContainer}>
                <Text style={styles.number}>{selectedNumber}</Text>
            </View>
            <MainButton onPress={()=>props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer }>
                <Text>Select a Number</Text>
                <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="numeric" maxLength={2} onChangeText={numberInputHandler} value={enteredValue}/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/></View>
                    <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/></View>
                </View>
            </Card>
            {confirmedOutput}
        </View> 
       
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView> 
        </ScrollView>
    )

};

const styles=StyleSheet.create({

    screen:{
        flex:1,
        padding:10,
        alignItems:'center',

    },
    title:{
        fontSize:20,
        marginVertical:10,
        

    },
    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center',
       
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15

    },
    button:{
        //width:90,
        width:Dimensions.get('window').width/4
    },
    input:{
        width:50,
        textAlign:"center" 
    },
    summaryContainer:{
        marginTop:20,
        alignItems:"center"
    },
    numberContainer:{
        borderWidth:2,
        borderColor:Colors.accent,
        padding:10,
        borderRadius:10,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center'
    },
    number:{
        color:Colors.accent,
        fontSize:22
    }


});

export default StartGameScreen;
