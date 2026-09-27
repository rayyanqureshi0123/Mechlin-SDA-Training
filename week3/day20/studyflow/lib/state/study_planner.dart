import 'package:flutter/foundation.dart';

import '../models/study_task.dart';
import '../services/storage_service.dart';

class StudyPlanner extends ChangeNotifier {
  final StorageService _storageService = StorageService();

  List<StudyTask> _tasks = [
    StudyTask(
      id: 'task-1',
      title: 'Revise Binary Trees',
      subject: 'Data Structures',
      scheduledDate: DateTime.now(),
      estimatedMinutes: 45,
    ),
    StudyTask(
      id: 'task-2',
      title: 'Practice REST APIs',
      subject: 'Web Development',
      scheduledDate: DateTime.now(),
      estimatedMinutes: 30,
    ),
    StudyTask(
      id: 'task-3',
      title: 'Review Operating Systems',
      subject: 'Operating Systems',
      scheduledDate: DateTime.now(),
      estimatedMinutes: 40,
    ),
  ];

  List<StudyTask> get tasks => List.unmodifiable(_tasks);

  int get completedCount =>
      _tasks.where((task) => task.completed).length;

  int get totalStudyMinutes =>
      _tasks.fold(0, (total, task) => total + task.estimatedMinutes);

  int get completedStudyMinutes => _tasks
      .where((task) => task.completed)
      .fold(0, (total, task) => total + task.estimatedMinutes);

  double get completionRate {
    if (_tasks.isEmpty) return 0;
    return completedCount / _tasks.length;
  }

  Future<void> loadSavedTasks() async {
    final savedTasks = await _storageService.loadTasks();

    if (savedTasks.isNotEmpty) {
      _tasks = savedTasks;
      notifyListeners();
    }
  }

  Future<void> toggleTask(String taskId) async {
    final index = _tasks.indexWhere((task) => task.id == taskId);

    if (index == -1) return;

    _tasks[index] = _tasks[index].copyWith(
      completed: !_tasks[index].completed,
    );

    await _saveChanges();
    notifyListeners();
  }

  Future<void> addTask(StudyTask task) async {
    _tasks.add(task);

    await _saveChanges();
    notifyListeners();
  }

  Future<void> removeTask(String taskId) async {
    _tasks.removeWhere((task) => task.id == taskId);

    await _saveChanges();
    notifyListeners();
  }

  Future<void> _saveChanges() async {
    await _storageService.saveTasks(_tasks);
  }
}