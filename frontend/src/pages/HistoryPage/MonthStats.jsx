import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from 'chart.js';

function MonthStats({ journals, monthDate }) {
    const displayMonth = monthDate.toLocaleString('default', { month: 'long', year: "numeric" });

    const averageMonthlyMood = journals?.length ?
        journals.reduce((acc, currJorunal) => acc + currJorunal.mood, 0) / journals.length :
        0

    let daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    daysInMonth = daysInMonth.getDate();

    const dailyMoods = Array(daysInMonth);
    journals?.forEach(journal => (
        dailyMoods[parseInt(journal.date.slice(8, 10)) - 1] = journal.mood
    ))

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

    const data = {
        labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
        datasets: [
            {
                label: "Mood rating",
                data: dailyMoods,
                borderColor: 'rgba(0, 0, 120, 0.4)',
                backgroundColor: 'rgba(0, 0, 120, 0.5)',
                spanGaps: true
            }
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: { grid: { display: false }, ticks: { display: false } },
            y: { ticks: { stepSize: 1 }, suggestedMin: 1, suggestedMax: 5 }
        }
    }

    return (
        <div>
            <div className="flex items-center text-right">
                <div className="text-xl font-semibold">{displayMonth}</div>
                <div className="ml-auto mr-5">
                    <div className='text-xs opacity-60'>Journals</div>
                    <div className='text-xl font-medium'>{journals?.length || 0}</div>
                </div>
                <div>
                    <div className='text-xs opacity-60'>Avg Mood</div>
                    <div className='text-xl font-medium'>{averageMonthlyMood.toFixed(2)}</div>
                </div>
            </div>

            <Line data={data} options={options} className='max-h-40 my-1' />
        </div>
    )
}

export default MonthStats;