import * as React from "react"
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg"
import { SvgrProps } from "../types"

/**
 *
 * @param props
 * @returns
 */
const PlaySvg = (props: SvgrProps) => {
  const { size = 66, color = "#FFFFFF", ...rest } = props
  return (
    <Svg viewBox="0 0 65 66" width={size} height={size} fill="none" {...rest}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          fillOpacity={0.8}
          d="M48.75 33 24.375 49.5v-33L48.75 33ZM32.5.006C14.575.006.006 14.8.006 33c0 18.2 14.569 32.994 32.494 32.994C50.425 65.994 64.994 51.2 64.994 33S50.425.006 32.5.006Zm0 4.113c15.73 0 28.444 12.91 28.444 28.88 0 15.972-12.714 28.882-28.444 28.882-15.73 0-28.444-12.91-28.444-28.881C4.056 17.028 16.77 4.119 32.5 4.119Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill={color} d="M0 0h65v66H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default PlaySvg
