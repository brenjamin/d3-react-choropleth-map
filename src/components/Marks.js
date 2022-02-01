import { useMemo } from "react"
import { geoPath } from "d3-geo"

const path = geoPath()

export const Marks = ({ usMap: { counties, states }, data, colorScale, onMouseOver, onMouseOut }) => {
  return (
    <g>
      {useMemo(() => {
        console.log("memo")
        return (
          <>
            {counties.features.map(feature => {
              const bachelorsValue = data.find(county => county.fips === feature.id).bachelorsOrHigher
              return <path className="county" fill={colorScale(bachelorsValue)} d={path(feature)} key={feature.id} onMouseOver={e => onMouseOver(e, feature.id)} onMouseOut={e => onMouseOut()} />
            })}
            <path className="states" d={path(states)} />
          </>
        )
      }, [data, counties, states, colorScale, onMouseOver, onMouseOut])}
    </g>
  )
}
