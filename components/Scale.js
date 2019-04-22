import styled from "styled-components";
import { theme } from "./Page";
import { Spring, animated } from "react-spring/renderprops";

const SvgWrapper = styled.svg`
  width: 100%;
  height: 100%;
`;

export default props => {
  return (
    <SvgWrapper>
      <rect
        width="100%"
        height="20%"
        x="0"
        y="40%"
        rx="5"
        ry="5"
        fill="#dadada"
      />
      <text x="0" y="95%" textAnchor="start" fontSize="12">
        {props.relation[0]}
      </text>
      <text x="99.5%" y="95%" textAnchor="end" fontSize="12">
        {props.relation[1]}
      </text>
      <Spring
        from={{ degree: "0%" }}
        to={{ degree: `${props.degree}%` }}
        native
      >
        {({ degree }) => (
          <animated.circle
            r="2%"
            fill={theme.sharpContrast}
            cy="50%"
            cx={degree}
            fillOpacity="0.9"
          />
        )}
      </Spring>
    </SvgWrapper>
  );
};
