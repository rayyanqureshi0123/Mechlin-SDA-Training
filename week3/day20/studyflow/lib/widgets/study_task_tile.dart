import 'package:flutter/material.dart';

import '../models/study_task.dart';

class StudyTaskTile extends StatelessWidget {
  final StudyTask task;
  final VoidCallback onToggle;

  const StudyTaskTile({
    super.key,
    required this.task,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 6,
        ),
        leading: Checkbox(
          value: task.completed,
          onChanged: (_) => onToggle(),
        ),
        title: Text(
          task.title,
          style: TextStyle(
            fontWeight: FontWeight.w600,
            decoration:
                task.completed ? TextDecoration.lineThrough : null,
          ),
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 5),
          child: Text(
            '${task.subject} • ${task.estimatedMinutes} min',
          ),
        ),
        trailing: Icon(
          task.completed
              ? Icons.check_circle_rounded
              : Icons.schedule_rounded,
          color: task.completed
              ? Colors.green
              : Theme.of(context).colorScheme.primary,
        ),
      ),
    );
  }
}