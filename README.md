🚀 EduDrift AI
Concept Drift Detection for Student Learning Behavior


<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/49b5c5ab-2691-4599-a28d-1f3336267c90" />



🌐 Live Demo
https://edudrift-ai.vercel.app

EduDrift AI is an intelligent learning analytics platform designed to detect concept drift in student learning behavior.

Traditional learning systems evaluate students mainly using final scores. However, learning behavior changes over time. Students may improve, struggle, or disengage.

EduDrift analyzes behavioral learning patterns and detects these changes early using AI-driven drift detection techniques.

📌 Problem

Online learning platforms generate large amounts of student interaction data such as:

Quiz attempts

Coding exercise submissions

Time spent per question

Accuracy trends

Assignment completion behavior

Despite this rich data, most platforms only analyze final performance metrics.

This leads to several problems:

Struggling students are detected too late

Educators lack behavioral insights

Learning personalization becomes difficult

The missing component is Concept Drift Detection in learning behavior.

💡 Solution

EduDrift AI introduces a system that continuously analyzes student learning interactions and detects when their learning behavior changes.

The system:

Collects interaction data

Extracts behavioral features

Detects drift in learning patterns

Generates insights and visual analytics

This enables real-time adaptive learning insights.

🌐 Live Demo

Frontend Interface:

https://edudrift-ai.vercel.app

The demo includes:

Student analytics dashboard

Learning behavior heatmaps

Performance trend graphs

Concept drift indicators

Interactive visualizations

🧠 Core Idea

EduDrift focuses on how students learn, not just their final scores.

Key behavioral signals analyzed include:

Response time changes

Accuracy fluctuations

Attempt frequency

Learning speed

Topic mastery progression

These signals help detect learning pattern drift.

🏗 System Architecture
Student / Educator
        │
        ▼
React Frontend Dashboard
        │
        ▼
Node.js Backend API
        │
        ▼
Python ML Engine
        │
        ▼
Concept Drift Detection Models
        │
        ▼
Analytics & Insights
⚙️ Technology Stack
Frontend

React

TypeScript

Vite

Tailwind CSS

Data Visualization Libraries

Backend (Architecture Designed)

Node.js

Express.js

REST APIs

Machine Learning Engine

Python

FastAPI

NumPy

Pandas

Scikit-learn

📊 AI Algorithms Used
Concept Drift Detection

Detects changes in statistical properties of student learning behavior.

Adaptive Windowing (ADWIN)

Maintains adaptive windows of data to detect behavior shifts.

Sliding Window Analysis

Compares recent behavior with historical patterns.

Behavioral Feature Extraction

Key extracted features:

Accuracy trends

Response time

Attempt count

Learning velocity

Topic progression

📂 Project Structure
EduDrift-AI
│
├── src
│   ├── components
│   ├── pages
│   ├── dashboard
│   ├── analytics
│   └── visualizations
│
├── backend
│   ├── api routes
│   └── server logic
│
├── ml-engine
│   ├── drift detection models
│   ├── behavioral analytics
│   └── prediction modules
│
└── README.md
🚧 Current Status

The repository currently hosts the frontend prototype deployed on Vercel.

Backend and ML engine deployment were designed but not deployed due to hackathon time constraints.

However, the system architecture is ready for integration with:

Node.js backend APIs

Python ML drift detection engine

🔮 Future Enhancements

Planned improvements include:

Real-time drift detection

LMS integration

Personalized learning recommendations

Predictive student performance modeling

AI-driven intervention suggestions

Large-scale educational analytics

🎯 Impact

EduDrift AI enables:

Early detection of struggling students

Personalized learning experiences

Data-driven teaching strategies

Improved student engagement monitoring

By focusing on learning behavior instead of only results, EduDrift provides deeper educational insights.

👩‍💻 Author

Developed as part of an AI / ML Hackathon Project exploring intelligent educational analytics.

📜 License

his project is open for educational and research purposes.
