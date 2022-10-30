import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        position: 'relative'
    },
    inner_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        elevation: 4
    },
    title: {
        fontSize: 16,
        marginLeft: 10
    },
    count_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    correct_count: {
        backgroundColor: '#4BB543',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    incorrect_count: {
        backgroundColor: '#FF0000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    count_title: {
        color: 'white',
        marginLeft: 6
    },
    questions: {
        flex: 1,

    },
    question_container: {
        marginTop: 14,
        marginHorizontal: 10,
        backgroundColor:'white',
        elevation:2,
        borderRadius:2
    },
    question_field: {
         padding:20
    },
    image:{
        resizeMode:'contain',
        width:'80%',
        height:150,
        marginTop:20,
        marginLeft:'10%',
        borderRadius:5
    },
    options:{
        paddingVertical:14,
        paddingHorizontal:20,
        borderTopWidth:1,
        borderColor:'#bcbcbc',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        
       
    },
    options_text:{
        width:25,
        height:25,
        padding:2,
        borderWidth:1,
        borderColor:'#bcbcbc',
        textAlign:'center',
        marginRight:16,
        borderRadius:25
    }

})