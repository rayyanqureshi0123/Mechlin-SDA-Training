import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const menuItems = [
  { title: 'Courses', screen: 'Courses', icon: '📚' },
  { title: 'Attendance', screen: 'Attendance', icon: '📊' },
  { title: 'Assignments', screen: 'Assignments', icon: '📝' },
  { title: 'Announcements', screen: 'Announcements', icon: '📢' },
];

export default function DashboardScreen({ navigation }) {
  const student = useSelector((state) => state.student);
  const assignments = useSelector(
    (state) => state.campus.assignments
  );

  const pendingAssignments = assignments.filter(
    (assignment) => !assignment.completed
  ).length;

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello, {student.name} 👋
      </Text>

      <Text style={styles.subtitle}>
        {student.semester} • {student.department}
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Today's Overview
        </Text>

        <Text style={styles.summaryText}>
          {assignments.length} assignments • {pendingAssignments} pending
        </Text>
      </View>

      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.icon}>{item.icon}</Text>

            <Text style={styles.cardTitle}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
  },
  subtitle: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  summaryText: {
    color: '#DBEAFE',
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 14,
    marginBottom: 14,
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});