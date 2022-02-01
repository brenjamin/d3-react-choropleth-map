import "./App.css"
import React, { useMemo, useState } from "react"
import { useData } from "./utils/useData"
import { useUSMap } from "./utils/useUSMap"
import { ChoroplethMap } from "./components/ChoroplethMap"

const width = 960
const height = 600
const margin = { top: 50, bottom: 150, left: 120, right: 20 }

const App = () => {
  const data = useData()
  const usMap = useUSMap()

  return !data || !usMap ? (
    <pre>Loading...</pre>
  ) : (
    <main>
      <div className="svg-wrapper">
        <ChoroplethMap width={width} height={height} margin={margin} data={data} usMap={usMap} />
      </div>
    </main>
  )
}

export default App
