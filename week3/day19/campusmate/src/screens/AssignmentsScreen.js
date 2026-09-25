import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { toggleAssignment } from '../store/campusSlice';

export default function AssignmentsScreen() {
  const dispatch = useDispatch();

  const assignments = useSelector(
    (state) => state.campus.assignments
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Assignments</Text>

      <Text style={styles.subtitle}>
        Track and update your coursework
      </Text>

      {assignments.map((assignment) => (
        <TouchableOpacity
          key={assignment.id}
          style={styles.card}
          onPress={() => dispatch(toggleAssignment(assignment.id))}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{assignment.title}</Text>

            <View
              style={[
                styles.badge,
                assignment.completed
                  ? styles.completedBadge
                  : styles.pendingBadge,
              ]}
            >
              <Text style={styles.badgeText}>
                {assignment.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </View>

          <Text style={styles.course}>
            Course: {assignment.course}
          </Text>

          <Text style={styles.action}>
            Tap to mark as{' '}
            {assignment.completed ? 'pending' : 'completed'}
          </Text>
        </TouchableOpacity>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    marginRight: 10,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  completedBadge: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  course: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 10,
  },
  action: {
    color: '#2563EB',
    fontSize: 13,
    marginTop: 14,
  },
});