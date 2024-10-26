import { Line } from 'react-chartjs-2';
import { Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
} from 'chart.js';

// -_- --------------- Si no se importa el ChartJS.register, no se muestra el grafico de lineas --------------- -_- //
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const mockData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
        {
            label: 'Ataques de DDOS',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: ['rgba(255, 99, 132, 1)'],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: 'rgba(255, 99, 132, 1)',
        },
        {
            label: 'Ataques de SQL Injection',
            data: [1, 2, 1, 1, 2, 2],
            borderColor: ['rgba(54, 162, 235, 1)'],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: 'rgba(54, 162, 235, 1)',
        },
        {
            label: 'Ataques de XSS',
            data: [5, 3, 6, 8, 7, 9],
            borderColor: ['rgba(255, 206, 86, 1)'],
            backgroundColor: ['rgba(255, 206, 86, 0.2)'],
            pointBackgroundColor: 'rgba(255, 206, 86, 1)',
            pointBorderColor: 'rgba(255, 206, 86, 1)',
        },
    ],
};


const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

export const LineChart = () => {
    return <Line options={options} data={mockData} />
}   
