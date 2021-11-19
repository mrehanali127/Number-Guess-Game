import React from "react";

import { View,Text,StyleSheet, Button,Image, ScrollView } from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

const GameOverScreen=props=>{
    return(
        <ScrollView>
        <View style={styles.screen}>
            
            <Text style={styles.HeadStyle}>Game is Over!</Text>
            <View style={styles.imageContainer}>
            {/* Load Image Locally */}
            {/* <Image source={require('../assets/success.png')} style={styles.image} resizeMode="cover"/> */}
            {/* Load Image from Web */}
            <Image source={{uri:'https://assets.entrepreneur.com/content/3x2/2000/20150327221922-success-winning-inspirational.jpeg'}} style={styles.image} resizeMode="cover"/>
            </View>
            <Text style={styles.textStyle}>Rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text></Text>
            <Text style={styles.textStyle}> User Number:<Text style={styles.highlight}>{props.userNumber}</Text></Text>
    
            <MainButton onPress={props.onRestart}>START NEW GAME</MainButton>
           
        </View>
        </ScrollView>
    )

};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    summaryContainer:{
        marginTop:20,
        alignItems:"center"
    },
    textStyle:{
        color:Colors.accent,
        fontSize:22
    },
    HeadStyle:{
        color:Colors.primary,
        fontSize:32,
        marginBottom:10

    },
    imageContainer:{

        width:200,
        height:200,
        borderRadius:100,
        borderWidth:1,
        borderColor:Colors.accent,
        overflow:'hidden',
        marginVertical:30
    },
    image:{
        width:'100%',
        height:'100%',
       
    },
    highlight:{
        color:Colors.primary
    }

   

});

export default GameOverScreen;