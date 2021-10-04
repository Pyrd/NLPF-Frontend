import 'package:flutter/material.dart';
import 'package:nlpf_web_app/screens/dev.dart';
import 'package:nlpf_web_app/screens/profile.dart';


void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      //home: HomeScreen(),
      theme: ThemeData(
        primarySwatch: Colors.amber
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => (DevScreen()),
        '/profile': (context) => ProfileScreen(),
      },
    );
  }
}


