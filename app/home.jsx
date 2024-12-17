import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const home =() => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.mockEmail}>mockemail@example.com</Text>
        <Text style={styles.dateTime}>{getCurrentDateTime()}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}
                          onPress={() => router.push("/createJob")}>
          <Text style={styles.buttonText}>Create New Job</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => router.push("/viewJobs")}>
          <Text style={styles.buttonText}>View Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => router.push("/viewSchedules")}>
          <Text style={styles.buttonText}>Create New Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => router.push("/viewSchedules")} >
          <Text style={styles.buttonText}>View Schedules</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969', // Dim gray
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mockEmail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6', // Baby blue
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default home;
