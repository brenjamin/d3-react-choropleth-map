import "./App.css"
import React from "react"
import { scaleThreshold, range, max, min, schemeGreens } from "d3"
import { useData } from "./utils/useData"
import { useUSMap } from "./utils/useUSMap"
import { Marks } from "./components/Marks"

const width = 960
const height = 600
const margin = { top: 50, bottom: 150, left: 120, right: 20 }
const legendWidth = width / 3

const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const App = () => {
  const data = useData()
  const usMap = useUSMap()

  if (!data || !usMap) {
    return <pre>Loading...</pre>
  }

  const bachelorsValue = d => d.bachelorsOrHigher

  const minValue = min(data, bachelorsValue)
  const maxValue = max(data, bachelorsValue)
  const colorScale = scaleThreshold()
    .domain(range(minValue, maxValue, (maxValue - minValue) / 8))
    .range(schemeGreens[9])
  console.log(colorScale.domain())
  console.log(colorScale.range())

  return (
    <main>
      <div className="svg-wrapper">
        <svg width={width} height={height}>
          <Marks data={data} colorScale={colorScale} usMap={usMap} bachelorsValue={bachelorsValue} />
        </svg>
      </div>
    </main>
  )
}

export default App
