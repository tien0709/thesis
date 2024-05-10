import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import EventSource from 'react-native-event-source';

const App = () => {
  const [isRequestingNotifications, setIsRequestingNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://192.168.31.62:3005/api/notifications');

    eventSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      console.log('Received notification:', data);
      setNotifications([...notifications, data]);
    });

    return () => eventSource.close();
  }, []);

  const handleRequestNotifications = () => {
    setIsRequestingNotifications(true);

    // Simulate sending a request to the server (replace with actual request)
    setTimeout(() => {
      setIsRequestingNotifications(false);
      setNotifications([...notifications, { id: Date.now(), message: 'Notification received from server!' }]);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Button title="Request Notifications" onPress={handleRequestNotifications} disabled={isRequestingNotifications} />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.notification}>{item.message}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  notification: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default App;
