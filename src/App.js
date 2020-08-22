import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronalogo from './img/image.png'


class App extends React.Component{
    state = {
        data : {},
        country:'',
    }
    async componentDidMount(){
        const fetchedData = await fetchData();
        // console.log(data);
        this.setState({data : fetchedData})
    }
    handleCountryDataChanged = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({data : fetchedData, country:country})
    }
    render(){
        const { data ,country } = this.state;
        return(
            <div className={styles.container}>
                <img src={coronalogo} className={styles.img} alt="Covid-19 App"/>
                <p>Created by Syed Ali Uz Zaman</p>
                <Cards data = {data}/>
                <CountryPicker handleCountryDataChanged={this.handleCountryDataChanged} />
                <Chart data={data} country={country}/>
            </div>
        )
    }
}
export default App;