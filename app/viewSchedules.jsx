import { StyleSheet, Text, View, Pressable} from 'react-native'
import React, {useState} from 'react'
import { router } from 'expo-router'

let isManager = (true);

const viewSchedule =() => {
  return (
    <>
      <View style={styles.container}> 
          <Text style={styles.header}>
              VIEW SCHEDULE</Text>
              <Pressable onPress={() => {router.push("/home")}}><Text>BACK</Text></Pressable>
              <Text style={styles.header}>IS MANAGER</Text>
          </View>
          </>
   )};
   



const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 40,
    },
    header: {
      fontSize: 25,
      marginBottom: 25,
    },
    wrapperCustom: {
      borderRadius: 8,
      backgroundColor: "#E7E2D2",
      padding: 6,
    }
  });

export default viewSchedule;