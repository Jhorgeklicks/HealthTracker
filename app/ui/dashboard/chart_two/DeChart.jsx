"use client"
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './chart.module.css';


const DeChart = ({newData,facility}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gender Age BreakDown Count By {facility === null ? 'All Facilities' : facility}</h2>
    <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={300}
      data={newData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      
      <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" 
           axisLine={{ stroke: '#fff' }} // color for x-axis line
           axisTick={{ stroke: '#f00' }} // color for x-axis ticks
           tick={{ fill: '#00ED64' }} // color for x-ax
          />
          <YAxis 
            contentStyle={{color:"#000", border:"none"}}
            axisLine={{ stroke: '#fff' }} // color for x-axis line
            axisTick={{ stroke: '#f00' }} // color for x-axis ticks
            tick={{ fill: '#00ED64' }} // color for x-ax
          
          />
          <Tooltip contentStyle={{background:"#00A35C", border:"none"}}  cursor={{fill: "#e8edebe0"}} />
          <Legend className="custom-legend"/>
          <Bar dataKey="male" fill="#fcb900" activeBar={<Rectangle fill="pink" stroke="" />} />
          <Bar dataKey="female" fill="#023430" activeBar={<Rectangle fill="gold" stroke="" />} />
        </BarChart>
      </ResponsiveContainer>
      </div>
  )
}

export default DeChart