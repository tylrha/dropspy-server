import ChartApex from 'react-apexcharts'

import { ChartContainerStyled } from './bar-chart.styles'

const getInitialOptions = (options) => {

  const horizontalOffset = options.isCurrency === true ? 70 : 40

  const offsetX = options.isHorizontal === true ? horizontalOffset : 0
  const offsetY = options.isHorizontal === true ? 0 : -30
  const showYAxis = options.isHorizontal === true ? true : false

  return {
    chart: {
      background: "var(--background-color-alt)",
      foreColor: "var(--text-color)"
    },
    grid: {
      show: false,
      xaxis: {
        lines: {
            show: false
        }
      },
    },
    xaxis: {
      position: 'bottom',
      categories: options.categoriesLabels,
      labels: {
        show: !options.isHorizontal
      },
    },
    yaxis: {
      show: showYAxis
    },

    plotOptions: {
      bar: {
        horizontal: options.isHorizontal,
        dataLabels: {
          position: "top"
        }
      }
    },
    fill: {
      colors: ['var(--first-color)']
    },
    dataLabels: {
      enabledOnSeries: undefined,
      formatter: function (val, opts) {
        if (options.isCurrency === true) {
          return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(val)
        } else {
          return Intl.NumberFormat('pt-br').format(val)
        }
      },
      style: {
        colors: ['var(--text-color)']
      },
      textAnchor: 'middle',
      offsetX: offsetX,
      offsetY: offsetY
    }
  }
}

const getInitialSeries = (options) => ([{
  name: options.cateroryTitle,
  data: options.categoriesValues
}])

const BarChart = (props) => {

  const options = getInitialOptions(props.value)
  const series = getInitialSeries(props.value)

  return (
    <ChartContainerStyled>
      <ChartApex
        options={options}
        series={series}
        type="bar"
        height={props.value.height}
        width="100%"
      />
    </ChartContainerStyled>
  )
}

export { BarChart }

