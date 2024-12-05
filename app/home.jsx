import { StyleSheet, Text, View, Pressable} from 'react-native'
import React from 'react'
import { router, Link } from 'expo-router'

//ONLY 

const home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        HOME
      </Text>
      <Pressable onPress={() => {router.dismiss(1)}}>
        <Text>BACK</Text>
      </Pressable>
        <Pressable onPress={() =>{router.push("/viewSchedules")}}>                        
          <Text>
            View Schedule
         </Text>
        </Pressable>
    </View>
  )
}



const styles = StyleSheet.create({
  header: {
    fontSize: 25,
  },
  wrapperCustom: {
    borderRadius: 8,
    backgroundColor: "#E7E2D2",
    padding: 6,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
})
export default home;