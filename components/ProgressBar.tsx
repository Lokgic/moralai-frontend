import { motion } from "framer-motion";

interface ProgressProp {
  percent: number;
}

// const ProgressContainer = styled.div<ProgressProp>`
//     display:grid;
//     grid-template-columns: ${({percent})=>`${percent}fr ${100-percent}fr`};
//     width:100%;
//     height:100%;
// `

export default (props: ProgressProp) => (
  <motion.div
    style={{
      display: "grid",
      width: "100%",
      height: "3rem",
      gridTemplateColumns: "0fr 100fr"
    }}
    animate={{
      gridTemplateColumns: `${props.percent}fr ${100 - props.percent}fr`
    }}
  >
    <div style={{ background: "black" }} />
    <div />
  </motion.div>
);
