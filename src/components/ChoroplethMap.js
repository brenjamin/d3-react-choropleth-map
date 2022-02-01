import { Marks } from "./Marks"
import { Tooltip } from "./Tooltip"
import { scaleThreshold, range, max, min, schemeGreens } from "d3"
import { useMemo, useState } from "react"

export const ChoroplethMap = ({ width, height, margin, data, usMap }) => {
  const [activeCounty, setActiveCounty] = useState({ id: null, x: null, y: null })
  const bachelorsValue = d => d.bachelorsOrHigher
  const legendWidth = width / 3
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const minValue = min(data, bachelorsValue)
  const maxValue = max(data, bachelorsValue)
  const colorScale = useMemo(
    () =>
      scaleThreshold()
        .domain(range(minValue, maxValue, (maxValue - minValue) / 8))
        .range(schemeGreens[9]),
    [minValue, maxValue]
  )

  const handleMouseOver = useMemo(
    () => (e, id) => {
      console.log(e)
      setActiveCounty({
        id,
        x: e.pageX,
        y: e.pageY
      })
    },
    []
  )

  const handleMouseOut = useMemo(
    () => e => {
      setActiveCounty({ id: null, x: null, y: null })
    },
    []
  )

  return (
    <>
      <Tooltip activeCounty={activeCounty} data={data} />
      <svg width={width} height={height}>
        <Marks data={data} colorScale={colorScale} usMap={usMap} bachelorsValue={bachelorsValue} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      </svg>
    </>
  )
}
