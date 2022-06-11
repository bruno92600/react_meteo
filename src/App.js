import React, { useState } from 'react';
import { TbMapSearch, TbSearch } from 'react-icons/tb'
import Header from './components/Header.Js';
import DetailsCard from './components/DetailsCard';
import SummaryCard from './components/SummaryCard';

function App() {

  const API_KEY = process.env.REACT_APP_API_KEY

  const [noData, setnoData] = useState('No Data Yet !');
  const [searchTerm, setsearchTerm] = useState('');
  const [weatherData, setweatherData] = useState([]);
  const [city, setcity] = useState('Unknown Location !');
  const [weatherIcon, setweatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2px.png`);

  const handleChange = input => {
    const {value} = input.target
    setsearchTerm
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  const getWeather = async (location) => {
    setweatherData( [])
    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`
    
    try {
      let res = await fetch (`${process.env.REACT_APP_URL +how_to_search}
      &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)
      let data = await res.json()
      if(data.cod != 200) {
        setnoData ('geolocalisation non trouvé !')
        return
      }
      setweatherData(data)
      setcity(`${data.city.name}, ${data.city.country}`)
      setweatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`)
    } catch (error) {
      console.log(error);
    }
  }

  const myIP = (location) => {
    const {latitude, longtitude} = location.coords 
    getWeather()
  }

  return (
    <div className="container">

         <div className="blur" style={{top: '-10%', right: '0'}}></div>
         <div className="blur" style={{top: '-36%%', left: '-6rem'}}></div>
         <div className="content">
           <div className="form-container">
             <div className="name">
               <div className="logo"> App météo de Brû nö </div>
               <div className="city">
               <TbMapSearch />
                 <p>{city}</p>
               </div>
             </div>
             <div className="search">
               <h2> La seul météo qu'il vous faut ! </h2>
               <hr/>
               <form className='search-bar' noValidate onSubmit={handleSubmit}>
                 <input type="text" placeholder='#Explore ?' onChange={handleChange} required />
                 <button className='s-icon'>
                   <TbSearch
                   onClick={() => {
                     navigator.geolocation.getCurrentPosition(successCallback,myIP)
                   }} 
                   />
                 </button>
               </form>
             </div>
             </div>
             <div className='info-container'>
               <Header />
             {weatherData.length === 0 ?
             <div>
               <div className="nodata">
                 <h1>{noData}</h1>
               </div>
               <div>
             {weatherData.length === 0 ?
             <div>
               <div className="nodata">
                 <h1>{noData}</h1>
               </div>
               </div> :
             <>
               <h1> Aujourd'hui </h1>
               <DetailsCard weather_icon={weatherIcon} data={weatherData} />
               <h1 className='title'> plus sur {city} </h1>
               <ul className='summary'>
                 {weatherData.list.map((days, index) => {
                   if(index > 0) {
                     return (<SummaryCard key={index} day={days} />)
                   }
                 })}
               </ul>
             </> 
            }
         </div>
         </div>
         </div> 
    </div>
    </div>
  );
}

export default App;
