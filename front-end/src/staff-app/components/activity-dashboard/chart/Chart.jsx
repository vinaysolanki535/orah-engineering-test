import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"

export default function ChartComponent({ studSummary }) {
  const [series, setSeries] = useState(null)

  useEffect(() => {
    if (studSummary) {
      setSeries([
        {
          name: "Rolls Data",
          data: Object.keys(studSummary)?.map((item) => studSummary?.[item]?.count),
        },
      ])
    }
  }, [studSummary])

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      // formatter: function (val) {
      //   return val + "%"
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758", "#12943B"],
      },
    },

    xaxis: {
      categories: ["Present", "Late", "Absent", "Unmark"],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        // formatter: function (val) {
        //   return val + "%"
        // },
      },
    },
    title: {
      text: "Student Roll Summary",
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
    },
  }

  return <>{studSummary && series && <Chart options={options} series={series} height={350} type="bar" />}</>
}