import { Line } from 'react-chartjs-2';

const HeartRateChart = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        label: 'Heart Rate',
        data: [65, 59, 80, 81, 56, 55, 40, 30, 70, 60, 65, 55],
        fill: false,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      },
    ],
  };

  return <Line data={data} />;
};

export default HeartRateChart;
