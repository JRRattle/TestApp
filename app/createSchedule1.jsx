import {doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'
import { StyleSheet, FlatList, Text, Button, Alert, ScrollView, View, Pressable,Flatlist, ActivityIndicator } from 'react-native'
import React, { useState, useEffect} from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const createSchedule = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [schedule, setSchedule] = useState({
            date: new Date(),
            jobs: [],
            totalAllotedTime: 0,
    });
    const [selectedItemId, setSelectedItemId] = useState(null);

    const MAX_WORKING_HOURS = 16;
    const deadline = new Date();
    const [formData, setFormData] = useState({
        customerId: '',
        jobId: '',
        addressLine1: '',
        city: '',
        state: '', 
        description: '',
        allotedTime: '',  // Time in hours for each job
        pricePerService: '',
    });


const addJobToSchedule = (jobData) => {
    const allotedTime = parseFloat(jobData.allotedTime);

    if (schedule.totalAllotedTime + allotedTime <= MAX_WORKING_HOURS){
        const newJob = {
            jobId: jobData.jobId,
            customerId: jobData.customerId,
            addressline1: jobData.addressline1,
            city: jobData.city,
            state: jobData.state,
            description: jobData.description,
            allotedTime: allotedTime,
            pricePerService: jobData.pricePerService,
            scheduledTime: deadline,
        };
        setSchedule(prevSchedule => {
            const updatedJobs = [...prevSchedule.jobs, newJob ];
            const updatedTotalTime = prevSchedule.totalAllotedTime + allotedTime;
            return{
            ...prevSchedule,
            jobs: updatedJobs,
            totalAllotedTime: updatedTotalTime,
        };
});
    }
}

//add job to jobs array in prevScedule
//add allotedTime to totalAllotedTime

const handleItemPress = (item) => {
    setSelectedItemId(item.id); // Set the selected item ID
    setFormData({
      customerId: item.customerId,
      jobId: item.jobId,
      addressLine1: item.addressLine1,
      city: item.city,
      state: item.state,
      description: item.description,
      allotedTime: item.allotedTime,
      pricePerService: item.pricePerService,
    });
    //Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
    //addJobToSchedule(item); // Optionally add selected job to the schedule
  };
    

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, 'jobs');
        const jobsSnapshot = await getDocs(jobsCollection);
        const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsList);
      } catch (err) {
        console.error("Error fetching jobs: ", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
    return (
      <ScrollView >
        <View >
            <Pressable onPress={() => router.dismiss(1)} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
                <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
             <Text style={styles.header}>
                Create a Schedule
            </Text>

        </View>

            {/*Same View as viewJobs*/}
           <View style={styles.container}>
                 {jobs.length > 0 ? (
                   <FlatList
                     data={jobs}
                     keyExtractor={(item) => item.id}
                     renderItem={({ item }) => {
                        const isSelected = item.id === selectedItemId;
                        return(
                            <Pressable
                                    style={[styles.jobItem, isSelected && styles.selectedItem]} // Highlight selected item
                                    onPress={() => handleItemPress(item)}> {/*Set selected item and update formData*/}
                                    <Text style={styles.header}>Job ID: {item.jobId}</Text>
                                    <Text>
                                        <Text style={styles.label}>Customer ID:</Text> 
                                        {item.customerId}</Text>
                                    <Text>
                                        <Text style={styles.label}>Address:</Text> 
                                        {item.addressLine1}, {item.city}, {item.state}</Text>
                                    <Text>
                                        <Text style={styles.label}>Description:</Text> 
                                        {item.description}</Text>
                                    <Text>
                                        <Text style={styles.label}>Allotted Time:</Text> 
                                        {item.allotedTime}</Text>
                                    <Text>
                                        <Text style={styles.label}>Price per Service:</Text> 
                                        {item.pricePerService}</Text>
                            </Pressable>    
                        )
                       
                         
                     }}
                     horizontal={true}
                   />
                 ) : (
                   <Text>No jobs found.</Text>
                 )}
               </View>
      </ScrollView>

    )
} 
export default createSchedule;

const styles = StyleSheet.create({
    jobItem: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
      },
    selectedItem: {
        backgroundColor: '#f9f9f9'
    },
    header: {
      alignSelf: 'center',
      fontFamily: 'TekoBold',
      fontSize: 24,
      color: 'black',
      marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
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
    label: {
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
      },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
   
  });


  