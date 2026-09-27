import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../models/study_task.dart';

class StorageService {
  static const String _tasksKey = 'studyflow_tasks';

  Future<void> saveTasks(List<StudyTask> tasks) async {
    final preferences = await SharedPreferences.getInstance();

    final encodedTasks = jsonEncode(
      tasks.map((task) => task.toJson()).toList(),
    );

    await preferences.setString(_tasksKey, encodedTasks);
  }

  Future<List<StudyTask>> loadTasks() async {
    final preferences = await SharedPreferences.getInstance();
    final savedData = preferences.getString(_tasksKey);

    if (savedData == null || savedData.isEmpty) {
      return [];
    }

    final decodedData = jsonDecode(savedData) as List<dynamic>;

    return decodedData
        .map(
          (item) => StudyTask.fromJson(
            Map<String, dynamic>.from(item as Map),
          ),
        )
        .toList();
  }

  Future<void> clearTasks() async {
    final preferences = await SharedPreferences.getInstance();
    await preferences.remove(_tasksKey);
  }
}