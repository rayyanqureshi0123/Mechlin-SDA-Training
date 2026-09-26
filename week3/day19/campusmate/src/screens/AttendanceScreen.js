import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function AttendanceScreen() {
  const courses = useSelector((state) => state.campus.courses);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Attendance</Text>

      <Text style={styles.subtitle}>
        Current semester attendance
      </Text>

      {courses.map((course) => {
        const isSafe = course.attendance >= 75;

        return (
          <View key={course.id} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.subject}>{course.name}</Text>

              <Text
                style={[
                  styles.percentage,
                  isSafe ? styles.safe : styles.warning,
                ]}
              >
                {course.attendance}%
              </Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progress,
                  { width: `${course.attendance}%` },
                ]}
              />
            </View>

            <Text style={styles.status}>
              {isSafe
                ? 'Attendance is on track'
                : 'Attendance needs attention'}
            </Text>
          </View>
        );
      })}
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subject: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  percentage: {
    fontSize: 20,
    fontWeight: '700',
  },
  safe: {
    color: '#16A34A',
  },
  warning: {
    color: '#DC2626',
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 14,
  },
  progress: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  status: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 8,
  },
});