import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Counter from "./Counter";
import { Button, Paper, Snackbar, Tabs } from "@material-ui/core";

import Tab from "@material-ui/core/Tab";
import Report from "./Report";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "100hw",
    },
  },
}));

export default function BillForm() {
  const classes = useStyles();
  const bCost = 129;
  const cCost = 25;

  const [countC, setCountC] = useState(0);
  const [countB, setCountB] = useState(0);
  const [loading, setLoading] = useState(false);

  const [mobile, setMobile] = useState("");
  const [openToast, setOpenToast] = useState(false);

  const [min] = useState(0);
  const [max] = useState(100);

  const [total, setTotal] = useState(0);

  const updateCountB = (newCount) => {
    let result = newCount;
    if (newCount > max) result = max;
    if (newCount < min) result = min;
    setCountB(result);
  };
  const updateCountC = (newCount) => {
    let result = newCount;
    if (newCount > max) result = max;
    if (newCount < min) result = min;
    setCountC(result);
  };

  const increaseCountB = () => updateCountB(countB + 1);
  const decreaseCountB = () => updateCountB(countB - 1);

  const increaseCountC = () => updateCountC(countC + 1);
  const decreaseCountC = () => updateCountC(countC - 1);

  useEffect(() => {
    let c = cCost * countC;
    let b = bCost * countB;

    setTotal(c + b);
  }, [countB, countC]);

  const handleClick = () => {
    let m = mobile.trim();
    if (m.length != 10) {
      alert("Enter 10 digit number");
      return false;
    } else if (Number.isNaN(m)) {
      alert("Please enter a number only");
      return false;
    } else if (total === 0) {
      alert("Please add some food");
      return false;
    }
    doSave();
  };

  const doSave = () => {
    setLoading(true);

    let items = [
      {
        name: "Chicken Biriyani",
        count: 0,
        amountForOne: bCost,
      },
      {
        name: "Chicken 65 (2Pcs)",
        count: 0,
        amountForOne: cCost,
      },
    ];
    if (countB > 0) {
      items[0].count = countB;
    }
    if (countC > 0) {
      items[1].count = countC;
    }
    let data = {
      mobileNumber: mobile,
      items: items,
      total: total,
    };
    fetch("http://localhost:5000/billing", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-no-compression": true,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setOpenToast(true);
        clear();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setMobile(e.target.value);
  };
  const clear = () => {
    setCountC(0);
    setCountB(0);
    setMobile("");
  };
  const [tabindex, setTabIndex] = React.useState(0);

  const handleTabIndex = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };
  return (
    <>
      <Tabs
        className="tab"
        value={tabindex}
        onChange={handleTabIndex}
        variant="standard"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
      >
        <Tab label="Bill" />
        <Tab label="Report" />
      </Tabs>

      {tabindex == 0 && (
        <div id="bill">
          <form
            onSubmit={(e) => e.preventDefault()}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <div style={{ marginBottom: 0 }}>
              Date: {new Date().toLocaleDateString()}
            </div>
            <TextField
              onChange={handleChange}
              id="outlined-basic"
              label="Mobile number"
              variant="outlined"
              value={mobile}
              inputProps={{ maxLength: 10 }}
            />
            <Counter
              name="Chicken Biriyani"
              count={countB}
              cost={bCost}
              up={() => increaseCountB()}
              down={() => decreaseCountB()}
            />
            <Counter
              name="Chicken 65 (2Pcs)"
              count={countC}
              cost={cCost}
              up={() => increaseCountC()}
              down={() => decreaseCountC()}
            />

            <table className="table-result">
              <tr>
                <td>Chicken Biriyani</td>
                <td>
                  <span>&#8377;</span>
                  {bCost} x {countB}
                </td>
                <td>
                  = <span>&#8377;</span>
                  {bCost * countB}
                </td>
              </tr>
              <tr>
                <td>Chicken 65 (2Pcs)</td>
                <td>
                  <span>&#8377;</span>
                  {cCost} x {countC}
                </td>
                <td>
                  = <span>&#8377;</span>
                  {cCost * countC}
                </td>
              </tr>
            </table>
            <div>
              {/* <div className="p-5">
            Chicken Biriyani : {bCost} x {countB} = {bCost * countB}
            </div>
            <div className="p-5">
            Chicken 65 (2Pcs) : {cCost} x {countC} = {cCost * countC}
            </div> */}

              <div className="p-5 total">
                Total Amount:
                <span className="total-val">
                  {" "}
                  <span>&#8377;</span>
                  {total}
                </span>
              </div>
            </div>
            <Button
              onClick={handleClick}
              variant="contained"
              color="primary"
              disableElevation
              disabled={loading}
            >
              Save
            </Button>
          </form>
        </div>
      )}
      {tabindex == 1 && <Report></Report>}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openToast}
        onClose={handleCloseToast}
        autoHideDuration={2000}
        message="Saved Successfully"
      />
    </>
  );
}
