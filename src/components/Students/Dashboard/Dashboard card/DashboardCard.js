import React from 'react'
import "./DashboardCard.css"

const DashboardCard = ({
  title = "",
  count = 0,
}) => {
  return (
    <div className='dashboard-card-container'>
        <p className='title'>{title}</p>
        <div className='count-box'>{count}</div>
    </div>
  )
}

export default DashboardCard