import React,{useState,useRef,useEffect} from "react";
import { View,Text,StyleSheet, Button,Alert, ScrollView } from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";

const generateRandomNumberBetween=(min,max,exclude)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    const randomNo=Math.floor(Math.random()*(max-min))+min;
    if(randomNo===exclude){
        return generateRandomNumberBetween(min,max,exclude);
    }else{
        return randomNo;
    }
}

const renderListItem=(guess,noOfRounds)=>(
    <View key={guess} style={styles.listItem}>
        <Text>
            #{noOfRounds}
        </Text>
        <Text>{guess}</Text>
    </View>
)

const GameScreen=props=>{
    const initialGuess=generateRandomNumberBetween(1,100,parseInt(props.userChoice))
    const [currentGuess,setCurrentGuess]=useState(initialGuess);
    //const [rounds,setRounds]=useState(0);
    const[pastGuesses,setPastGuesses]=useState([initialGuess]);

    const currentLow=useRef(1);
    const currentHigh=useRef(100);

    const{userEnteredChoice,onGameOVerVar}=props;

    // use useEffect hook to execute fn after every render cycle
    useEffect(()=>{
        if(currentGuess===props.userChoice){
            props.onGameOver(pastGuesses.length);
        }
    },[currentGuess,userEnteredChoice,onGameOVerVar])

    const nextGuessHandler=direction=>{
        if((direction==='lower' && currentGuess<props.userChoice)||(direction==='greater' && currentGuess>props.userChoice)){
            Alert.alert("Don't lie!",'You know that this is wrong ..',[{
                text:'Sorry!',
                style:'cancel'
            }]);
            return;
        }
        if(direction==='lower'){
            currentHigh.current=currentGuess 
        }
        else{
            currentLow.current=currentGuess+1;
        }

        const nextNumber= generateRandomNumberBetween(currentLow.current,currentHigh.current,currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(rounds=>rounds+1);
        setPastGuesses(curPastGuesses=>[nextNumber,...curPastGuesses])


    } 

    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <View style={styles.numberContainer}>
                <Text style={styles.number}>{currentGuess}</Text>
            </View>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this,'lower')}/>
                <Button title="GREATER" onPress={nextGuessHandler.bind(this,'greater')}/>
            </Card>
            <View style={styles.list}>
            <ScrollView>
                {pastGuesses.map((guess,index)=>renderListItem(guess,pastGuesses.length-index))}
            </ScrollView>
            </View>
        </View>
    )
   
}

const styles=StyleSheet.create({
    screen:{
        
        flex:1,
        padding:10,
        alignItems:'center'
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
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    },
    list:{
        width:'80%',
        flex:1
    },
    listItem:{
        borderColor:'#ccc',
        borderWidth:1,
        padding:15,
        marginVertical:10,
        backgroundColor:'white',
        justifyContent:'space-between',
        flexDirection:'row'
    }
});

export default GameScreen;