import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          centerTitle: true,
          title: Text('Top Navigation Bar',
            style: TextStyle(
              fontSize: 20,
              color: Colors.green[500],
              fontWeight: FontWeight.bold
            ),
            ),
            leading: Icon(Icons.menu, color: Colors.green[500]),
            actions: [
              IconButton(
                onPressed: () {}, 
                icon: Icon(
                  Icons.logout, 
                  color: Colors.green[500]
                  )
              )
            ],
        ),
        backgroundColor: Colors.green[500],
        body: Center(
          child: Container(
            height: 300,
            width: 300,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Icon(Icons.favorite, size: 180, color: Colors.green[500]),
          ),
        ),
      ),
    );
  }
}
