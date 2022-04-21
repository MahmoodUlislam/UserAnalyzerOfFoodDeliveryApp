// used Material UI by considering easy optimization in future
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import files from "../components/files";
import { profileArrayUpdate } from "../slices/filterByStatusSlice";
import Styles from "./Landing.module.css";

export default function Landing() {
  const [fromDate, setFromDate] = React.useState(new Date(new Date("2016-07-04")));
  const [toDate, setToDate] = React.useState(new Date(new Date()));
  const [userStatus, setUserStatus] = React.useState("");

  const [profileArray, setProfileArray] = React.useState([]);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  // for generating the result of customer based on user status and date.
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let From = formatDate(fromDate);
    let To = formatDate(toDate);

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
      setProfileArray(profileArray);

      console.log(From);
      console.log(To);
      console.log(userStatus);

      dispatch(profileArrayUpdate(element, userStatus));
      navigate("/profiles");
    });
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

  return (
    <>
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
                      setFromDate(newValue);
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
                  onChange={(e) => {
                    setUserStatus(e.target.value);
                  }}
                />
                <FormControlLabel
                  name="user_status"
                  value="superactive"
                  control={<Radio />}
                  label="Super Active"
                  onChange={(e) => {
                    setUserStatus(e.target.value);
                  }}
                />
                <FormControlLabel
                  name="user_status"
                  value="bored"
                  control={<Radio />}
                  label="Bored"
                  onChange={(e) => {
                    setUserStatus(e.target.value);
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <button type="submit" className={Styles.button}>Generate</button>

        </form>
      </Container>
    </>
  );

}