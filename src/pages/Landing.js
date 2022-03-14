// used Material UI by considering easy optimization in future

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import files from "../components/files";
import Header from "../layouts/header/Header";
import Styles from "./Landing.module.css";

export default function Landing() {

  // for setting the default date of the date picker field.
  const [fromDate, setFromData] = React.useState(
    new Date(new Date("2016-07-04"))
  );
  const [toDate, setToDate] = React.useState(
    new Date(new Date())
  );

  // for setting the default value of the radio button group to select the user status.
  const [userStatus, setUserSTatus] = React.useState();


  // for setting all the users of the selected status in an array to be used in the next render component.
  const [profile, setProfile] = React.useState([]);



  // for handling the user's action by changeHandler function as a event handler for setting the user status.
  const changeHandler = (e) => {
    let value = e.target.value;
    setUserSTatus(value);
  };

  // for formatting the date to be used in the next render component, to be calculated for selected user status.
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  // for generating the result of customer based on user status and date.
  const formSubmitHandler = (e) => {
    e.preventDefault();
    let From = formatDate(fromDate);
    let To = formatDate(toDate);
    const profileArray = [];

    //  calculating the logic for the selected user status based on date & meals ordered.
    files.forEach((element) => {
      let count = 0;

      Object.keys(element.calendar.dateToDayId).forEach(function (dayId) {
        if (
          new Date(From) <= new Date(dayId) &&
          new Date(To) >= new Date(dayId)
        ) {
          Object.keys(element.calendar.mealIdToDayId).forEach(function (
            mealId
          ) {
            if (
              element.calendar.dateToDayId[dayId] ===
              element.calendar.mealIdToDayId[mealId]
            ) {
              count++;
            }
          });
        }
      });

      // condition applied for calculating the user status based on the meals ordered.
      if (userStatus === "active") {

        if (count >= 5 && count <= 10) {
          profileArray.push(element.profile);
        }

      } else if (userStatus === "superactive") {

        if (count > 10) {
          profileArray.push(element.profile);
        }

      } else if (userStatus === "bored") {

        if (count === 0) {
          profileArray.push(element.profile);
        }

      }
      setProfile(profileArray);
    });
  };



  // conditional rendering the result.


  return (
    <React.Fragment>
      {/* header section  */}
      <Header showBackArrow={false} />

      {/* app container section */}
      <Container maxWidth="sm">
        <div>
          <h1 className={Styles.headingFont}>User Analyzer</h1>
          <p className={Styles.paragraphFont}>
            Select filters to generate report
          </p>
        </div>

        <form className={Styles.filterBox} onSubmit={formSubmitHandler}>
          <div className={Styles.heading}>
            <h3 className={Styles.headingFont}>Date</h3>
            <Divider sx={{ width: "400px" }} />
            <div className="dateSelection">
              <div className={Styles.dateSelection}>
                <label className={Styles.label} htmlFor="startDate">
                  From
                </label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    name="from_date"
                    value={fromDate}
                    onChange={(newValue) => {
                      setFromData(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div className={Styles.dateSelection}>
                <label
                  className={Styles.label}
                  style={{ marginRight: "35px" }}
                  htmlFor="endDate"
                >
                  To
                </label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    name="to_date"
                    value={toDate}
                    onChange={(newValue) => {
                      setToDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className={Styles.heading}>
            <h3 className={Styles.headingFont}>Status</h3>
            <Divider sx={{ width: "400px" }} />
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="status"
                defaultValue="Active"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  name="user_status"
                  value="active"
                  control={<Radio />}
                  label="Active"
                  onChange={changeHandler}
                />
                <FormControlLabel
                  name="user_status"
                  value="superactive"
                  control={<Radio />}
                  label="Super Active"
                  onChange={changeHandler}
                />
                <FormControlLabel
                  name="user_status"
                  value="bored"
                  control={<Radio />}
                  label="Bored"
                  onChange={changeHandler}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <BrowserRouter>
            <Link className={Styles.button} to="/Profile">
              Generate
            </Link>
          </BrowserRouter>
        </form>
      </Container>
    </React.Fragment>
  );
}



