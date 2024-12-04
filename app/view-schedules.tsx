import { FlatList, StyleSheet, Text, View, Pressable} from 'react-native'
import React, {useState} from 'react'
import { router } from 'expo-router'

let isManager = (false);

const viewSchedule =() => {
    if (isManager!) {
        return (
            <View> 
                <Text> 
                    Upcoming Schedules
                </Text>
            </View>
        )
    } else {
        <View>
            <Text>
                Upcoming Jobs
            </Text>
        </View>
    }
}