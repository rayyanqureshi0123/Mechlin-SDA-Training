import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'screens/home_screen.dart';
import 'screens/planner_screen.dart';
import 'state/study_planner.dart';

void main() {
  runApp(const StudyFlowApp());
}

class StudyFlowApp extends StatelessWidget {
  const StudyFlowApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => StudyPlanner()..loadSavedTasks(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'StudyFlow',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.indigo,
          ),
          scaffoldBackgroundColor: const Color(0xFFF6F7FB),
        ),
        home: const StudyFlowShell(),
      ),
    );
  }
}

class StudyFlowShell extends StatefulWidget {
  const StudyFlowShell({super.key});

  @override
  State<StudyFlowShell> createState() => _StudyFlowShellState();
}

class _StudyFlowShellState extends State<StudyFlowShell> {
  int _selectedIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    PlannerScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: _screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_outlined),
            selectedIcon: Icon(Icons.dashboard_rounded),
            label: 'Dashboard',
          ),
          NavigationDestination(
            icon: Icon(Icons.calendar_month_outlined),
            selectedIcon: Icon(Icons.calendar_month_rounded),
            label: 'Planner',
          ),
        ],
      ),
    );
  }
}