import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import firebase from 'firebase'
export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:' ',
            password:' '
        }
    }
    login=async(emailId,password)=>{
        if(emailId &&password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(emailId,password)
                if( response){
                    this.props.navigation.navigate("Transaction")
                }
            }
            catch(error){
                switch (error.code){
                    case 'auth/user-not-found':Alert.alert('USER DOESNT EXSIST')
                    break;
                    case ' auth/invalid-email':Alert.alert("Incorrect Email or Password")
                }
            }
        }else{
            Alert.alert("ENTER EMAIL AND PASSWORD")
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style={{alignItems:'center',marginTop:20}} >
                <View>
            <Image
              source={require("../assets/booklogo.jpg")}
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ textAlign: "center", fontSize: 30 }}>Wily</Text>
          </View>
          <View>
              <TextInput style={styles.loginbox} 
              placeholder="ABC@example.com"
              keyboardType='email-address'
              onChangeText={(text)=>{
                  this.setState({
                      emailId:text
                  })
              }}
              />
              <TextInput style={styles.loginbox} 
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={(text)=>{
                  this.setState({
                     password:text
                  })
              }}
              />
          </View>
          <View>
              <TouchableOpacity style={{height:30,width:30,borderwidth:1,marginTop:20,padding:5,borderRadius:5}}
              onPress={()=>{
                  this.login(this.state.emailId,this.state.password)
              }}
              > <Text style={{textAlign:'center'}}>LOGIN</Text></TouchableOpacity>
          </View>
            </KeyboardAvoidingView>
        )
    }
}
const style=StyleSheet.create({
    loginbox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10
    }
})