import { Button } from "@material-ui/core";
import React, { useMemo } from "react";

const Counter = React.memo(({ name, cost, count, down, up }) => (
  <div>
    <span className="step-name">{name}</span>
    <div className="step-btns">
      <Button variant="outlined" color="primary" onClick={down}>
        -
      </Button>
      <span className="step-val">{count}</span>
      <Button variant="outlined" color="primary" onClick={up}>
        +
      </Button>
    </div>
    {/* <div className="results">
      <span className="step-val">X</span>
      <span className="cost">
        <span>&#8377;</span> {cost} = {cost * count}
      </span>
    </div> */}
  </div>
));

export default Counter;
