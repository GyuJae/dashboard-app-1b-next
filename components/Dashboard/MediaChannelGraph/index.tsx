import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryTheme,
  VictoryLegend,
  VictoryLabel,
  VictoryTooltip,
} from 'victory'
import { CHART_STYLE } from './chartStyle'
import { useRecoilValue } from 'recoil'
import { dateState } from '@state/dashBoard'
import { getBarChartData } from '@utils/getBarChartData'
import { numberToDot } from 'utils'
import { IMedia } from 'types/media'

interface IProps {
  media: IMedia[]
}

const CATEGORYS = ['광고비', '매출', '노출수', '클릭수', '전환수']
const MediaChannelGraph = ({ media }: IProps) => {
  const date = useRecoilValue(dateState)
  const { sum, chartData } = getBarChartData(date, media)

  return (
    <VictoryChart
      width={1000}
      domainPadding={{ x: 90, y: 10 }}
      theme={VictoryTheme.material}
      animate={{
        duration: 1000,
        onLoad: { duration: 1000 },
        easing: 'linear',
      }}
    >
      <VictoryLegend
        x={620}
        y={333}
        orientation='horizontal'
        gutter={50}
        style={{ labels: { fill: CHART_STYLE.grayColor } }}
        colorScale={[...CHART_STYLE.colorscale]}
        data={[{ name: '네이버' }, { name: '카카오' }, { name: '구글' }, { name: '페이스북' }]}
      />
      <VictoryAxis
        tickFormat={CATEGORYS}
        style={{ axis: { stroke: '#EDEFF1' }, tickLabels: { fill: CHART_STYLE.grayColor } }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => `${x}%`}
        tickLabelComponent={<VictoryLabel dy={15} textAnchor='start' />}
        style={{ axis: { stroke: 'none' }, tickLabels: { fill: CHART_STYLE.grayColor, fontWeight: 'bold' } }}
      />
      <VictoryStack
        colorScale={[...CHART_STYLE.colorscale]}
        labels={[
          numberToDot({ num: sum.costSum }),
          numberToDot({ num: sum.salesSum }),
          numberToDot({ num: sum.impSum }),
          numberToDot({ num: sum.clickSum }),
          numberToDot({ num: sum.convSum }),
        ]}
        labelComponent={
          <VictoryTooltip
            style={{ fontSize: 14, fill: '#ffffff' }}
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
            pointerLength={5}
            dy={-15}
          />
        }
      >
        <VictoryBar data={chartData[3]} {...CHART_STYLE.bar} />
        <VictoryBar data={chartData[2]} {...CHART_STYLE.bar} />
        <VictoryBar data={chartData[1]} {...CHART_STYLE.bar} />
        <VictoryBar data={chartData[0]} {...CHART_STYLE.bar} cornerRadius={{ top: 8 }} />
      </VictoryStack>
    </VictoryChart>
  )
}

export default MediaChannelGraph
