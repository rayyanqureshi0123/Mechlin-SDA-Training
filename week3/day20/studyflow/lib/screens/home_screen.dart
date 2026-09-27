import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/study_task.dart';
import '../state/study_planner.dart';
import '../widgets/progress_card.dart';
import '../widgets/study_task_tile.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  Future<void> _showAddTaskDialog(BuildContext context) async {
    final titleController = TextEditingController();
    final subjectController = TextEditingController();
    final minutesController = TextEditingController(text: '30');

    await showDialog<void>(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          title: const Text('Add Study Task'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: titleController,
                  decoration: const InputDecoration(
                    labelText: 'Task title',
                    hintText: 'e.g. Practice Java',
                    prefixIcon: Icon(Icons.task_alt),
                  ),
                ),
                const SizedBox(height: 14),
                TextField(
                  controller: subjectController,
                  decoration: const InputDecoration(
                    labelText: 'Subject',
                    hintText: 'e.g. Data Structures',
                    prefixIcon: Icon(Icons.menu_book_outlined),
                  ),
                ),
                const SizedBox(height: 14),
                TextField(
                  controller: minutesController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Study time',
                    hintText: '30',
                    suffixText: 'minutes',
                    prefixIcon: Icon(Icons.timer_outlined),
                  ),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(dialogContext);
              },
              child: const Text('Cancel'),
            ),
            FilledButton.icon(
              onPressed: () {
                final title = titleController.text.trim();
                final subject = subjectController.text.trim();
                final minutes =
                    int.tryParse(minutesController.text.trim()) ?? 30;

                if (title.isEmpty || subject.isEmpty) {
                  return;
                }

                context.read<StudyPlanner>().addTask(
                      StudyTask(
                        id: DateTime.now()
                            .millisecondsSinceEpoch
                            .toString(),
                        title: title,
                        subject: subject,
                        scheduledDate: DateTime.now(),
                        estimatedMinutes: minutes,
                      ),
                    );

                Navigator.pop(dialogContext);
              },
              icon: const Icon(Icons.add),
              label: const Text('Add Task'),
            ),
          ],
        );
      },
    );

    titleController.dispose();
    subjectController.dispose();
    minutesController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final planner = context.watch<StudyPlanner>();

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'StudyFlow',
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.notifications_none_rounded,
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            const Text(
              'Good evening 👋',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Plan your study. Track your progress.',
              style: TextStyle(
                fontSize: 15,
                color: Colors.grey.shade600,
              ),
            ),
            const SizedBox(height: 20),
            ProgressCard(
              completed: planner.completedCount,
              total: planner.tasks.length,
              minutes: planner.completedStudyMinutes,
            ),
            const SizedBox(height: 28),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "Today's Plan",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  '${planner.tasks.length} tasks',
                  style: TextStyle(
                    color: Colors.grey.shade600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            if (planner.tasks.isEmpty)
              Card(
                elevation: 0,
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    children: [
                      Icon(
                        Icons.menu_book_outlined,
                        size: 42,
                        color: Theme.of(context)
                            .colorScheme
                            .primary,
                      ),
                      const SizedBox(height: 12),
                      const Text(
                        'No study tasks yet',
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        'Add your first task to start planning.',
                        style: TextStyle(
                          color: Colors.grey.shade600,
                        ),
                      ),
                    ],
                  ),
                ),
              )
            else
              ...planner.tasks.map(
                (task) => StudyTaskTile(
                  task: task,
                  onToggle: () => planner.toggleTask(task.id),
                ),
              ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showAddTaskDialog(context),
        icon: const Icon(Icons.add),
        label: const Text('Add Task'),
      ),
    );
  }
}