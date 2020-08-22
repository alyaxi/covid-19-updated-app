import React, {useState, useEffect} from 'react';
import {fetchDailyData} from './../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';


const Chart = () => {
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
        setDailyData(await fetchDailyData());
    }
        console.log(dailyData);
        fetchApi();
    },[]);
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
    return(
        <div className={styles.container}>
            {linerChart}
        </div>
    )
}

export default Chart;