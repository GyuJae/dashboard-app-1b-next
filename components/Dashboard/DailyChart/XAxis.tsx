import { dateToKorean } from 'utils'
import { VictoryAxis, VictoryLabel } from 'victory'

const XAxis = () => {
  return (
    <VictoryAxis
      standalone={false}
      style={{
        tickLabels: {
          fill: '#aaaaaa',
          fontWeight: 700,
        },
        axis: {
          stroke: '#dddddd',
          strokeWidth: 1.5,
        },
      }}
      tickFormat={(tick) => dateToKorean(tick, true)}
      tickLabelComponent={<VictoryLabel renderInPortal />}
    />
  )
}

export default XAxis
