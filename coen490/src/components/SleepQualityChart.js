import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const SleepQualityChart = () => {
  const data = {
    labels: ['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am'],
    datasets: [
      {
        label: 'Deep Sleep',
        data: [2, 3, 1, 4, 5, 3, 2, 3, 2],
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        borderWidth: 1,
      },
      {
        label: 'Light Sleep',
        data: [4, 2, 3, 1, 2, 4, 3, 2, 4],
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        borderWidth: 1,
      },
      {
        label: 'REM Sleep',
        data: [1, 1, 2, 0, 1, 1, 0, 1, 1],
        backgroundColor: '#ffc107',
        borderColor: '#ffc107',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SleepQualityChart;
