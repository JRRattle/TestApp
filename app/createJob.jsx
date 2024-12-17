
import {doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'
import { StyleSheet, Text,Button, Alert, TextInput, View, Pressable } from 'react-native'
import React, { useState} from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const createJob = () =>{




const [formData, setFormData] = useState({
    customerId: '',
    jobId: '',
    addressLine1: '',
    city: '',
    state: '', 
    description: '',
    allotedTime: '',
    pricePerService: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const newJobDoc = doc(collection(db, "jobs"));
  
  const handleSubmit = async () => {
    if (!formData.customerId || !formData.jobId || !formData.addressLine1
      || !formData.city || !formData.state || !formData.description
      || !formData.allotedTime || !formData.pricePerService
    ) {
      Alert.alert('Validation Error', 'All fields are required.');
    } else {
      try{
        await setDoc(newJobDoc, formData);
        Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
      } catch (error) {
        Alert.alert('Submission Error', error.message)
      } 
      
    }
  };
    const [fontsLoaded] = useFonts({
    'TekoBold': require('../fonts/Teko-Bold.ttf'),
    'TekoLight': require('../fonts/Teko-Light.ttf'),
    'TekoMedium': require('../fonts/Teko-Medium.ttf'),
    'TekoRegular': require('../fonts/Teko-Regular.ttf'),
    'TekoSemiBold': require('../fonts/Teko-SemiBold.ttf'),
  });

  if (!fontsLoaded){
    return (
      console.log("fonts weren't loaded")
    )
  } else{




  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter details about this job</Text>
       {/*Back Button*/}
      <Pressable onPress={() => router.dismiss(1)} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      {/*View Schedules Button*/}
      <Pressable onPress={() => router.push('/viewJobs')} style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View Jobs</Text>
        <MaterialIcons name='view-stream' size={24} color="#333" />
      </Pressable>

        
      <TextInput
        style={styles.input}
        placeholder="Customer ID"
        value={formData.customerId}
        onChangeText={(value) => handleInputChange('customerId', value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Job ID"
        value={formData.jobId}
        onChangeText={(value) => handleInputChange('jobId', value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        value={formData.addressLine1}
        onChangeText={(value) => handleInputChange('addressLine1', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.city}
        onChangeText={(value) => handleInputChange('city', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="State"
        value={formData.state}
        onChangeText={(value) => handleInputChange('state', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={formData.description}
        onChangeText={(value) => handleInputChange('description', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Alloted Time in man-hours"
        value={formData.allotedTime}
        onChangeText={(value) => handleInputChange('allotedTime', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Price per Service"
        value={formData.pricePerService}
        onChangeText={(value) => handleInputChange('pricePerService', value)}
      />
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
      
  )  }
}



const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontFamily: 'TekoBold',
    fontSize: 24,
    color: 'black'
  },
  wrapperCustom: {
    borderRadius: 8,
    backgroundColor: "#E7E2D2",
    padding: 6,
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    textAlign: 'left'
  },
  viewButton: {
    position: 'absolute',
    top:16,
    right: 16,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  viewButtonText: {
    color: '#333',
    fontSize: 16,
  },
  backButton: {
    flexDirection: 'row',
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
  },
 
});

export default createJob;