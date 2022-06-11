import '../css/SummaryCard.css'

import React from 'react'
import moment from 'moment'

function SummaryCard({day}) {
    const day_icon = `${process.env.REACT_APP_ICON_URL + day.weather[0]["icon"]}@2x.png`
  return (
      <li className='summary-items'>
          <div>
              <p>{Math.round(day.main.temp)}&deg;D</p>
              <p>
                  {day.weather[0].main}
                  <img src={day_icon} alt="" />
              </p>
              <p>{day.weather[0].description}</p>
              <p>{moment(day.dt_txt).format('hh:mm a')}</p>
          </div>
      </li>
  )
}

export default SummaryCard