const TWO_CHART_STYLE = {
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
  yAxis: (anchor: string) => ({
    style: {
      tickLabels: {
        textAnchor: anchor,
        fill: '#aaaaaa',
        fontWeight: 700,
      },
      axis: { stroke: 'transparent' },
    },
  }),
  line: (stroke: string) => ({
    style: {
      data: { stroke },
    },
  }),
  scratter: (fill: string) => ({
    style: {
      data: { fill, stroke: '#fff', strokeWidth: 4 },
    },
  }),
}

export default TWO_CHART_STYLE
