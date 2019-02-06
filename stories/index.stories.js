import React from "react";
import Comparison from "../components/Comparison";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";

// import { Button, Welcome } from '@storybook/react/demo';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf("Comparison", module)
  .addDecorator(withKnobs)
  .add("Basic", () => {
    const a = number("A", 5);
    return <Comparison data={[a, 40]} />;
  });
