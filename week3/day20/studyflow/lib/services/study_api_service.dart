import 'dart:convert';

import 'package:http/http.dart' as http;

class StudyApiService {
  static const String baseUrl = 'https://studyflow-api.example.com';

  Future<List<String>> fetchStudyTips() async {
    final response = await http.get(
      Uri.parse('$baseUrl/tips'),
    );

    if (response.statusCode != 200) {
      throw Exception('Unable to load study tips');
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final tips = data['tips'] as List<dynamic>;

    return tips.map((tip) => tip.toString()).toList();
  }

  Future<List<String>> fetchRecommendedTopics(
    String subject,
  ) async {
    final response = await http.get(
      Uri.parse(
        '$baseUrl/recommendations?subject=${Uri.encodeComponent(subject)}',
      ),
    );

    if (response.statusCode != 200) {
      throw Exception('Unable to load recommendations');
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final topics = data['topics'] as List<dynamic>;

    return topics.map((topic) => topic.toString()).toList();
  }

  Future<void> submitProgress({
    required String taskId,
    required bool completed,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/progress'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'taskId': taskId,
        'completed': completed,
      }),
    );

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception('Unable to submit study progress');
    }
  }
}