import * as React from "react"
import Svg, { Ellipse, Path } from "react-native-svg"
import { SvgrProps } from "./types"

const SearchSvg = (props: SvgrProps) => {
  const { size = 22, color = "#67686D", ...rest } = props
  return (
    <Svg width={size} height={size} fill="none" {...rest}>
      <Ellipse
        cx={10.658}
        cy={11.767}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        rx={8.142}
        ry={8.989}
      />
      <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.32 18.485 19.514 22" />
    </Svg>
  )
}
export default SearchSvg
