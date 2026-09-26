import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function AnnouncementsScreen() {
  const announcements = useSelector(
    (state) => state.campus.announcements
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Announcements</Text>

      <Text style={styles.subtitle}>
        Latest campus updates
      </Text>

      {announcements.map((announcement) => (
        <View key={announcement.id} style={styles.card}>
          <View style={styles.dateBadge}>
            <Text style={styles.date}>{announcement.date}</Text>
          </View>

          <Text style={styles.title}>{announcement.title}</Text>

          <Text style={styles.message}>
            Important campus information is available for students.
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 10,
  },
  subtitle: {
    color: '#64748B',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
  },
  dateBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    marginBottom: 12,
  },
  date: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 21,
  },
});