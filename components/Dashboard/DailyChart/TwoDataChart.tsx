import { dateToKorean, numberToDot } from 'utils'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory'
import TWO_CHART_STYLE from './twoChartStyle'

interface IProps {
  inView: boolean
  data: { x: string; y: number }[][]
  unit: string[]
}

const TwoDataChart = ({ inView, data, unit }: IProps) => {
  if (!inView) return null

  const xOffsets = [80, (typeof window !== 'undefined' ? window.innerWidth : 1000) - 60]
  const maxima = data.map((dataset) => Math.max(...dataset.map((d) => d.y)))
  const anchors = ['end', 'start']
  const colors = ['#4FADF7', '#85DA47']

  return (
    <VictoryChart
      height={500}
      theme={VictoryTheme.material}
      width={typeof window !== 'undefined' ? window.innerWidth : 1000}
      domainPadding={50}
      containerComponent={<VictoryVoronoiContainer />}
      animate={{
        duration: 2000,
        onLoad: { duration: 1000 },
        easing: 'linear',
      }}
    >
      <VictoryAxis
        standalone={false}
        {...TWO_CHART_STYLE.xAxis}
        tickFormat={(tick) => dateToKorean(tick, true)}
        scale={{ x: 'time' }}
        fixLabelOverlap
        tickLabelComponent={<VictoryLabel renderInPortal />}
      />
      {data.map((item, index) => {
        const key = `${item[0].y}-${index}`
        return (
          <VictoryAxis
            dependentAxis
            key={key}
            offsetX={xOffsets[index]}
            tickLabelComponent={<VictoryLabel renderInPortal dy={-10} />}
            {...TWO_CHART_STYLE.yAxis(anchors[index])}
            tickValues={[0.25, 0.5, 0.75, 1]}
            tickFormat={(tick) => `${numberToDot({ num: tick * maxima[index] })} ${unit[index]}`}
          />
        )
      })}
      {data.map((item, index) => {
        const key = `${item[0].y}-${index}`
        return (
          <VictoryLine
            key={key}
            data={item}
            labels={({ datum }) => `${numberToDot({ num: datum.y })}`}
            {...TWO_CHART_STYLE.line(colors[index])}
            y={(datum) => datum.y / maxima[index]}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 20, fill: '#ffffff' }}
                renderInPortal
                flyoutStyle={{
                  stroke: 'none',
                  fill: '#3A474E',
                }}
                cornerRadius={5}
                flyoutPadding={{
                  left: 25,
                  right: 25,
                  top: 10,
                  bottom: 10,
                }}
                pointerLength={0}
                dy={-15}
              />
            }
          />
        )
      })}
      {data.map((item, index) => {
        const key = `${item[0].y}-${index}`
        return (
          <VictoryScatter
            key={key}
            data={item}
            y={(datum) => datum.y / maxima[index]}
            size={7}
            {...TWO_CHART_STYLE.scratter(colors[index])}
          />
        )
      })}
    </VictoryChart>
  )
}

export default TwoDataChart
