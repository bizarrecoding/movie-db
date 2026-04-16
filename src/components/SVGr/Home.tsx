import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

type HomeProps = SvgProps & {
  size?: number
  color?: string
}

const HomeSVG = (props: HomeProps) => {
  const { size = 22, color = "#67686D", ...rest } = props
  return (
    <Svg width={size} height={size} fill="none" {...rest}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16.329 22H5.41c-1.737 0-3.146-1.54-3.146-3.438V9.847c.007-.747.329-1.45.872-1.904L9.07 2.685a2.671 2.671 0 0 1 3.573 0l5.96 5.248c.541.456.862 1.158.872 1.905v8.724c0 1.899-1.409 3.438-3.146 3.438Z"
      />
    </Svg>
  )
}
export default HomeSVG
