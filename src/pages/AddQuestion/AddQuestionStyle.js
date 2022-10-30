import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    keyboardView:{flex:1},
    container:{flex:1,
    backgroundColor:'white'},
    inner_container:{
        padding:20
    },
    text:{
        fontSize:20,
        textAlign:'center',
        color:'black'
    },
    quizTitle:{
        textAlign:'center',
        marginBottom:20
    },
    options:{
        marginTop:20
    },
    image:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#BCCEF8' + '50',
        padding:28

    },
    image_text:{
        opacity:0.8,
        color:'#98A8F8',
       fontSize:15
    },
    image_mode:{
        width:'100%',
        height:200,
        borderRadius:5
    }
    
})