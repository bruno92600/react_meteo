import moment from 'moment'
import '../css/DetailsCards.css'

function DetailsCard({weather_icon, data}) {
    const {clouds, main, weather} = data.liste[0]
  return (
   <div className="details">
       <div className="clouds">
           <p className='celsius'>{Math.round(main.temp)}&deg;D</p>
           <div className="clouds-icon">
               {weather[0].main}
               <img src={weather_icon} alt="" />
           </div>
           <div className="des">{weather[0].description}</div>
           <div className="time">{moment().format("dddd MMM YYYY")}</div>
       </div>
       <div className="more-info">
           <p> Température ressentie: {Math.round(main.feels_like)}&deg;D</p>
           <p> Humidité: {main.humidity}%</p>
           <p> Couverture nuageuse: {clouds.all}</p>
           <p> Température min: {Math.round(main.temp_min)}&deg;D</p>
           <p> Température max: {Math.round(main.temp_max)}&deg;D</p>
       </div>
   </div>
  )
}

export default DetailsCard