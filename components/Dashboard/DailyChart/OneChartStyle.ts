const ONE_CHART_STYLE = {
  xAxis: {
    style: {
      tickLabels: {
        fill: '#aaaaaa',
        fontWeight: 700,
      },
      axis: {
        stroke: '#dddddd',
        strokeWidth: 1.5,
      },
    },
  },
  yAxis: {
    style: {
      tickLabels: {
        textAnchor: 'end',
        fill: '#aaaaaa',
        fontWeight: 700,
      },
      axis: { stroke: 'transparent' },
    },
  },
  line: {
    style: {
      data: { stroke: '#4FADF7' },
    },
  },
  scratter: {
    style: {
      data: { fill: '#4FADF7', stroke: '#fff', strokeWidth: 4 },
    },
  },
}

export default ONE_CHART_STYLE
