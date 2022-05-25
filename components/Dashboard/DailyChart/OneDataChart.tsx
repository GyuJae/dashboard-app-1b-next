import { dateToKorean, numberToDot } from '@utils/index'
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
import ONE_CHART_STYLE from './OneChartStyle'

interface IProps {
  inView: boolean
  data: { x: string; y: number }[]
  unit: string
}

const OneDataChart = ({ inView, data, unit }: IProps) => {
  if (!inView) return null

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
        tickFormat={(tick) => dateToKorean(tick, true)}
        scale={{ x: 'time' }}
        fixLabelOverlap
        tickLabelComponent={<VictoryLabel renderInPortal />}
        {...ONE_CHART_STYLE.xAxis}
      />
      <VictoryAxis
        dependentAxis
        tickLabelComponent={<VictoryLabel renderInPortal dx={20} dy={-10} />}
        {...ONE_CHART_STYLE.yAxis}
        tickFormat={(tick) => `${numberToDot({ num: tick })} ${unit}`}
      />

      <VictoryLine
        data={data}
        labels={({ datum }) => `${numberToDot({ num: datum.y })}`}
        y={(datum) => datum.y}
        {...ONE_CHART_STYLE.line}
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
      <VictoryScatter data={data} y={(datum) => datum.y} size={7} {...ONE_CHART_STYLE.scratter} />
    </VictoryChart>
  )
}

export default OneDataChart
