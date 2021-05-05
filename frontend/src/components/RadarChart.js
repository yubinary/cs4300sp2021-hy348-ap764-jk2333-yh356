import React from 'react';
import { Radar } from 'react-chartjs-2';

export default function RadarChart({ wine }) {
  let wineData = [];
  for (const key in wine) {
    wineData.push(wine[key][0])
  }

  let legendData = [];
  for (const key in wine) {
    legendData.push(wine[key][1])
  }

  const data = {
    labels: legendData,
    datasets: [
      {
        label: "Personality Match (%)",
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        data: wineData
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scale: {
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 5
      }
    }
  }

  return (
    <Radar data={data} options={options} />
  )
}
