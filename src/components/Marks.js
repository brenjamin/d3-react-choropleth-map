import { geoPath } from "d3-geo"

const path = geoPath()

export const Marks = ({ usMap: { counties, nation, states }, data, colorScale, onMouseOver, onMouseOut }) => {
  return (
    <g>
      {counties.features.map(feature => {
        const bachelorsValue = data.filter(county => county.fips === feature.id)[0].bachelorsOrHigher

        return <path className="county" fill={colorScale(bachelorsValue)} d={path(feature)} key={feature.id} />
      })}
      <path className="states" d={path(states)} />
    </g>
  )
}
