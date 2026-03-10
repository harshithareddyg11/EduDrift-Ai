import { 
  LayoutDashboard, 
  Users, 
  Grid3X3, 
  Bell, 
  TrendingUp, 
  Clock, 
  Target, 
  AlertTriangle,
  BookOpen,
  BrainCircuit,
  Zap
} from 'lucide-react';

export const MOCK_STUDENTS = [
  { id: '1', name: 'Alex Johnson', risk: 'Low', accuracy: 85, avgTime: '45s', drift: false },
  { id: '2', name: 'Sarah Williams', risk: 'High', accuracy: 42, avgTime: '120s', drift: true },
  { id: '3', name: 'Michael Chen', risk: 'Medium', accuracy: 68, avgTime: '75s', drift: true },
  { id: '4', name: 'Emily Davis', risk: 'Low', accuracy: 92, avgTime: '30s', drift: false },
  { id: '5', name: 'James Wilson', risk: 'Medium', accuracy: 61, avgTime: '90s', drift: false },
];

export const TOPICS = [
  'Variables', 'Loops', 'Recursion', 'Data Structures', 'Algorithms', 'OOP', 'Databases'
];

export const DRIFT_ALERTS = [
  {
    id: '1',
    type: 'Concept Drift',
    topic: 'Recursion',
    message: 'Concept drift detected in Recursion topic for 15% of the class.',
    severity: 'High',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'Performance Drop',
    topic: 'Loops',
    message: 'Accuracy dropped by 30% in last 5 attempts for Sarah Williams.',
    severity: 'Medium',
    time: '5 hours ago'
  },
  {
    id: '3',
    type: 'Behavioral Shift',
    topic: 'Algorithms',
    message: 'Solving time increased significantly for Michael Chen.',
    severity: 'Low',
    time: '1 day ago'
  }
];

export const ACCURACY_TREND = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'Average Accuracy',
      data: [65, 72, 68, 75, 82, 78],
      borderColor: 'rgb(79, 70, 229)',
      backgroundColor: 'rgba(79, 70, 229, 0.5)',
      tension: 0.4,
    },
    {
      label: 'Target Accuracy',
      data: [70, 70, 70, 70, 70, 70],
      borderColor: 'rgba(239, 68, 68, 0.5)',
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false,
    }
  ],
};

export const TIME_TREND = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'],
  datasets: [
    {
      label: 'Time per Question (s)',
      data: [120, 95, 150, 80, 60, 110, 45, 55],
      backgroundColor: 'rgba(16, 185, 129, 0.6)',
      borderRadius: 4,
    }
  ],
};

export const HEATMAP_DATA = MOCK_STUDENTS.map(student => ({
  studentId: student.id,
  studentName: student.name,
  scores: TOPICS.map(() => Math.floor(Math.random() * 100))
}));
