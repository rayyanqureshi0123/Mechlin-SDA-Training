import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/study_task.dart';
import '../state/study_planner.dart';

class PlannerScreen extends StatelessWidget {
  const PlannerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final planner = context.watch<StudyPlanner>();

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Study Planner',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            'Your study schedule',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 8),
          Text(
            'Keep your learning sessions organized.',
            style: TextStyle(color: Colors.grey.shade600),
          ),
          const SizedBox(height: 20),
          ...planner.tasks.map(
            (task) => _PlannerItem(
              task: task,
              onToggle: () => planner.toggleTask(task.id),
            ),
          ),
        ],
      ),
    );
  }
}

class _PlannerItem extends StatelessWidget {
  final StudyTask task;
  final VoidCallback onToggle;

  const _PlannerItem({
    required this.task,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    final dateText =
        '${task.scheduledDate.day}/${task.scheduledDate.month}';

    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        onTap: onToggle,
        leading: CircleAvatar(
          child: Text(
            task.subject.substring(0, 1).toUpperCase(),
          ),
        ),
        title: Text(
          task.title,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle: Text(
          '${task.subject} • $dateText • ${task.estimatedMinutes} min',
        ),
        trailing: Icon(
          task.completed
              ? Icons.check_circle
              : Icons.radio_button_unchecked,
        ),
      ),
    );
  }
}