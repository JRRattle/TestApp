
import {doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'
import { StyleSheet, Text,Button, Alert, TextInput, View, Pressable } from 'react-native'
import React, { useState} from 'react'
import { router } from 'expo-router';

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
      // Perform further actions like API calls here
    }
  };

  

  return (
    <View style={styles.container}>
      
      <Pressable onPress={() => {router.dismiss(1)}}>
        <Text>BACK</Text>
      </Pressable>
        <Pressable onPress={() =>{router.push("/viewSchedules")}}>                        
          <Text>
            View Schedule
         </Text>
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
});

export default createJob;