import { StyleSheet } from "react-native"


export default StyleSheet.create({
    container:{
        //ekranda yüzüyormuş gibi
        //component başka componentin üzerine eklenebilir gibi
        position:'absolute',
        bottom:20,
        right:20,
        borderRadius:50,
        // width:80,
        // height:80,
        // alignItems:'center',
        // justifyContent:'center',
        backgroundColor:'#1D1CE5',
        paddingHorizontal:30,
        padding:10
    },
    title:{
        color:'white',
        fontWeight:'bold',

    }
})