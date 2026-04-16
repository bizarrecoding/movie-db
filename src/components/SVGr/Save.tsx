import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { SvgrProps } from "../types"

const SaveSvg = (props: SvgrProps) => {
  const { size = 22, color = "#67686D", ...rest } = props
  return (
    <Svg width={size} height={size} fill="none" {...rest}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.566 18.632 5.193 21.88c-.429.246-.957.072-1.194-.394v0a1.13 1.13 0 0 1-.107-.466V6.622c0-2.746 1.7-3.844 4.145-3.844h5.746c2.371 0 4.145 1.025 4.145 3.661v14.582c0 .26-.093.508-.26.692a.847.847 0 0 1-.627.287.904.904 0 0 1-.43-.119l-5.407-3.25a.616.616 0 0 0-.638 0Z"
        clipRule="evenodd"
      />
    </Svg>
  )
}

export default SaveSvg
