import { DialogProps } from "./types";
import {
  Overlay,
  Dialog,
  DialogTextWrapper,
  DialogParagraph,
  DialogInputWrapper,
  DialogButton,
  MCResponsive,
  MCItem
} from "../../components/StyledComps";
import ProgressBar from "../../components/ProgressBar";
import oxfordScaleData from "../../data/ous.json";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const oxfordScale: {
  [index: string]: any;
  q: string[];
  a: string[];
} = {
  ...oxfordScaleData
};

const totalTime = 1;
let timeLeft = totalTime;
const seqN = 10;
const AAITimeSeq = [...Array(seqN).keys()].map(d => {
  let out: number;
  if (d < seqN / 2) {
    out = Math.random() * (timeLeft / 2);
  } else {
    out = Math.random() * timeLeft;
  }
  const loc = totalTime - timeLeft + out;
  timeLeft = timeLeft - out;

  return loc;
});

const totalLength = 100;
let lengthLeft = 100;
const AAILengthSeq = [...Array(seqN).keys()].map(d => {
  let out: number;
  if (d === 0) {
    return "0fr 100fr";
  } else if (d === seqN - 1) {
    return "100fr 0fr";
  } else if (d < seqN / 2) {
    out = (Math.random() * lengthLeft) / 2;
  } else {
    out = Math.random() * lengthLeft;
  }
  const loc = totalLength - lengthLeft + out;
  lengthLeft = lengthLeft - out;
  return `${loc}fr ${100 - loc}fr`;
});

export default (props: DialogProps) => {
  const {
    uiState,
    chosen,
    handleConfirm,
    handleExit,
    ousIndex,
    setChosen,
    ousProgress
  } = props;
  const { dialog } = uiState;

  switch (dialog) {
    case "confirm": {
      return (
        <Overlay>
          <Dialog>
            <DialogTextWrapper>
              <DialogParagraph>You have decided to....</DialogParagraph>
              <DialogParagraph centering big>
                give {["A", "B"][chosen]} the kidney
              </DialogParagraph>
            </DialogTextWrapper>
            <DialogInputWrapper>
              <DialogButton emph onClick={handleConfirm}>
                Yes, Proceed
              </DialogButton>
              <DialogButton onClick={handleExit}>No, Go back</DialogButton>
            </DialogInputWrapper>
          </Dialog>
        </Overlay>
      );
    }
    case "ass": {
      return (
        <Overlay>
          <Dialog>
            <DialogTextWrapper>
              <DialogParagraph>
                According to our AI algorithm, you care
              </DialogParagraph>
              <DialogParagraph centering big>
                more about whether a patient is responsible for their own kidney
                failure than how long a patient is expected to live
              </DialogParagraph>
            </DialogTextWrapper>
            <DialogInputWrapper>
              <DialogButton emph onClick={handleConfirm}>
                I Have taken note of my AI Assessment
              </DialogButton>
            </DialogInputWrapper>
          </Dialog>
        </Overlay>
      );
    }
    case "oxford": {
      return (
        <OUSDialog
          handleConfirm={handleConfirm}
          qIndex={ousIndex}
          chosen={chosen}
          setChosen={setChosen}
          ousProgress={ousProgress}
        />
      );
    }
    case "aai": {
      return <AAI handleConfirm={handleConfirm} />;
    }
    default:
      return null;
  }
};

const OUSDialog = ({
  qIndex,
  handleConfirm,
  chosen,
  setChosen,
  ousProgress
}: {
  qIndex: number;
  handleConfirm: () => void;
  chosen: number;
  setChosen: (payload: number) => void;
  ousProgress: number;
}) => (
  <Overlay>
    <Dialog>
      <ProgressBar percent={ousProgress} />
      <DialogTextWrapper>
        <DialogParagraph>
          Do you agree with the following statement?
        </DialogParagraph>
        <DialogParagraph big>{oxfordScale.q[qIndex]}</DialogParagraph>
      </DialogTextWrapper>
      <MCResponsive>
        {oxfordScale.a.map((d, i) => (
          <MCItem
            onClick={() => setChosen(i)}
            key={`lsitem${d}`}
            active={i == chosen}
          >
            <button />
            <p>{d}</p>
          </MCItem>
        ))}
      </MCResponsive>
      <DialogInputWrapper centering>
        {chosen > -1 ? (
          <DialogButton emph onClick={() => handleConfirm()}>
            Continue
          </DialogButton>
        ) : null}
      </DialogInputWrapper>
    </Dialog>
  </Overlay>
);

const AAI = ({ handleConfirm }: { handleConfirm: () => void }) => {
  const [aai, setAAI] = useState(0);
  useEffect(() => {
    if (aai === 0) {
      setTimeout(() => {
        handleConfirm();
        setAAI(1);
      }, 10000);
    }
  }, [aai]);
  return aai == 0 ? (
    <Overlay>
      <Dialog>
        <DialogTextWrapper>
          <DialogParagraph big>
            Please wait while our AI algorithm analyze your response....
          </DialogParagraph>
        </DialogTextWrapper>
        <AAIWrapper>
          <motion.div
            className="spinner"
            animate={{
              scale: [0.5, 1, 1, 1, 0.5],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.7, 0.8],
              loop: Infinity,
              repeatDelay: 1
            }}
          />
          <motion.div
            className="spinner"
            animate={{
              scale: [0.5, 1, 1, 1, 0.5],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.3, 0.4, 0.8, 0.9],
              loop: Infinity,
              repeatDelay: 1
            }}
          />
          <motion.div
            className="spinner"
            animate={{
              scale: [0.5, 1, 1, 1, 0.5],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.4, 0.5, 0.9, 1],
              loop: Infinity,
              repeatDelay: 1
            }}
          />
        </AAIWrapper>
        <motion.div
          style={{
            display: "grid",
            width: "100%",
            height: "1rem",
            marginTop: "1rem"
          }}
          className="pbar"
          animate={{
            gridTemplateColumns: AAILengthSeq
          }}
          transition={{
            duration: 10,
            ease: "linear",
            times: AAITimeSeq
          }}
        >
          <div style={{ background: "black" }} />
          <div />
        </motion.div>
      </Dialog>
    </Overlay>
  ) : null;
};

const AAIWrapper = styled.div`
  padding: 1rem 1rem;

  display: flex;
  justify-content: space-evenly;
  width: 100%;
  min-width: 90rem;
  .spinner {
    border-radius: 20%;
    width: 5rem;
    height: 5rem;
    background: ${props => props.theme.colors.main};
  }
  /* .pbar {
    display: grid;
    width: 100%;
    height: 1rem;
    margin-top: 1rem;
    background: ${props => props.theme.colors.darkAccent};
  } */
`;
