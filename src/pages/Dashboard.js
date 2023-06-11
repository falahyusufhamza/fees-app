import React from 'react'
import "./Dashboard.css"
import DashboardCard from '../components/Students/Dashboard/Dashboard card/DashboardCard'

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
        <div className='numbers-overview'>
            <DashboardCard 
                count={35}
                title="Students"
            />
            <DashboardCard 
                count={25}
                title="Parents"
            />
            <DashboardCard 
                count={2}
                title="Buses"
            />
            <DashboardCard 
                count={10}
                title="Pending payment"
            />
            <DashboardCard 
                count={20}
                title="Recieved payment"
            />
        </div>
    </div>
  )
}

export default Dashboard