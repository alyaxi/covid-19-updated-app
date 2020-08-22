import React, {useState, useEffect} from 'react';
import {fetchDailyData} from './../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';


const Chart = ({ data:{confirmed, recovered, deaths} , country}) => {
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
        setDailyData(await fetchDailyData());
    }
        console.log(dailyData);
        fetchApi();
    },[]);
    console.log(confirmed, recovered, deaths);
    const linerChart = (
        dailyData.length
        ? (<Line data={{
            labels : dailyData.map(({date}) => date),
            datasets: [{
                data : dailyData.map(({confirmed}) => confirmed),
                fill: true,
                borderColor: '#3333ff',
                label : 'Infected'
            } , {
                data : dailyData.map(({deaths}) => deaths),
                fill: true,
                borderColor: 'red',
                label : 'Deaths',
                backgroundColor: 'rgb(255,0 , 0, 0.5)'
            }],
        }}/>) : null
        );
        const barChart = (
            confirmed ? 
            <Bar
            data = {{
                labels : ['Infected' , 'Recovered'
                , 'Deaths' ],
                datasets: [{
                    labels: "People",
                    backgroundColor: [
                        'rgb(0, 0, 255, 0.5)',
                        'rgb(0, 255, 0, 0.5)',
                        'rgb(255, 0, 0, 0.5)',
                    ],
                    data: [confirmed.value,recovered.value,deaths.value]
                }]
            }}
            options = {{
                legend:{display: false},
                title: {display : true , title: `Counrty Sitution in ${country}`}
            }}
            /> : null
        )
    return(
        <div className={styles.container}>
            {country ? barChart : linerChart}
        </div>
    )
}

export default Chart;