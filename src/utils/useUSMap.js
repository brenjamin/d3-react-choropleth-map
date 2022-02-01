import { useEffect, useState } from "react"
import { json } from "d3"
import { feature, mesh } from "topojson"

export const useUSMap = () => {
  const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
  const [data, setData] = useState()
  useEffect(() => {
    json(url).then(data => {
      const { counties, states } = data.objects
      console.log("States", states)

      setData({
        counties: feature(data, counties),
        states: mesh(data, states, (a, b) => a !== b)
      })
    })
  }, [])
  return data
}
