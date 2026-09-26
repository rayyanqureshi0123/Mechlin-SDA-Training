import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function CoursesScreen() {
  const courses = useSelector((state) => state.campus.courses);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Courses</Text>

      <Text style={styles.subtitle}>
        Current semester subjects and attendance
      </Text>

      {courses.map((course) => (
        <View key={course.id} style={styles.card}>
          <View style={styles.header}>
            <View style={styles.codeContainer}>
              <Text style={styles.code}>{course.id}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{course.name}</Text>
              <Text style={styles.attendance}>
                Attendance: {course.attendance}%
              </Text>
            </View>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progress,
                { width: `${course.attendance}%` },
              ]}
            />
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeContainer: {
    width: 70,
    height: 55,
    borderRadius: 10,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  code: {
    color: '#1D4ED8',
    fontWeight: '700',
    fontSize: 13,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  attendance: {
    color: '#64748B',
    fontSize: 13,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 16,
  },
  progress: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
});