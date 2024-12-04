import { FlatList, StyleSheet, Text, View, Pressable} from 'react-native'
import React, {useState} from 'react'
import { router } from 'expo-router'



const about = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>PROFILE</Text>
      <Pressable onPress={() => {router.dismiss(1)}}>
        <Text>BACK</Text>
      </Pressable>
      <Pressable onPress={() => {router.push("/view-schedules.tsx")}}>
        <Text style={styles.wrapperCustom}>
          View Schedule
        </Text>
      </Pressable>
    </View>
  )
}

export default about

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