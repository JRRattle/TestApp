import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db }from '../firebase/firebaseConfig';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';


const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <View style={styles.container}>
      <Text style={styles.title}>Job Listings</Text>
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
