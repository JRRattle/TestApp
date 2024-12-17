import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db }from '../firebase/firebaseConfig';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
      const [fontsLoaded] = useFonts({
      'TekoBold': require('../fonts/Teko-Bold.ttf'),
      'TekoLight': require('../fonts/Teko-Light.ttf'),
      'TekoMedium': require('../fonts/Teko-Medium.ttf'),
      'TekoRegular': require('../fonts/Teko-Regular.ttf'),
      'TekoSemiBold': require('../fonts/Teko-SemiBold.ttf'),
    });



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

  if (!fontsLoaded){
    return (
      console.log("fonts weren't loaded")
    );
  }

  
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
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Jobs</Text>
      <Pressable onPress={() => router.dismiss(1)} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/createJob')} style={styles.viewButton}>
        <Text style={styles.viewButtonText}>Create Job</Text>
        <MaterialIcons name='add' size={24} color="#333" />
      </Pressable>

      {jobs.length > 0 ? (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.jobItem}>
              <Text style={styles.jobTitle}>Job ID: {item.jobId}</Text>
              <Text><Text style={styles.label}>Customer ID:</Text> {item.customerId}</Text>
              <Text><Text style={styles.label}>Address:</Text> {item.addressLine1}, {item.city}, {item.state}</Text>
              <Text><Text style={styles.label}>Description:</Text> {item.description}</Text>
              <Text><Text style={styles.label}>Allotted Time:</Text> {item.allotedTime}</Text>
              <Text><Text style={styles.label}>Price per Service:</Text> {item.pricePerService}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No jobs found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  jobItem: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default JobsPage;
