import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },

    inner_container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginVertical:5,
        marginHorizontal:10,
        padding: 20,
        borderRadius:5,
        flexDirection:'row',
        backgroundColor:'white',
        elevation:2
    },
    flatlist:{
        paddingVertical:20
    },
    quiz:{
        flex:1,
        paddingRight:10
    },
    title:{fontSize:18},
    description:{opacity:0.5},
    play_button:{
        paddingVertical:10,
        paddingHorizontal:30,
        borderRadius:50,
        backgroundColor:'#EAEAEA'+'80'
    },
    play_text:{
        color:'grey'
    },
    create_quiz_button:{
        position:'absolute',
        bottom:20,
        right:20,
        borderRadius:50,
        paddingHorizontal:30,
    }



})