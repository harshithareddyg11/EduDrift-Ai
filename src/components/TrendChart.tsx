import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TrendChartProps {
  type: 'line' | 'bar';
  data: any;
  title?: string;
}

const TrendChart = ({ type, data, title }: TrendChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
        color: '#f1f5f9', // slate-100
      },
      tooltip: {
        backgroundColor: '#1e293b', // slate-800
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#94a3b8', // slate-400
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8', // slate-400
        }
      },
    },
  };

  return (
    <div className="h-64 w-full">
      {type === 'line' ? (
        <Line options={options} data={data} />
      ) : (
        <Bar options={options} data={data} />
      )}
    </div>
  );
};

export default TrendChart;
