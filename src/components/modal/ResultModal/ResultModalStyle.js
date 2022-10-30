import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000000' + '90',
        justifyContent:'center',
        alignItems : 'center'
    },
    inner_container:{
        backgroundColor:'white',
        width:'90%',
        borderRadius:5,
        padding:40,
        alignItems:'center'
    },
    count_container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    button_try_again:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
        width:'100%',
        backgroundColor:'#1D1CE5',
        marginTop:20,
        borderRadius:50
    },
    text_try_again:{
        textAlign:'center',
        color:'white',
        marginLeft:10
    }

})