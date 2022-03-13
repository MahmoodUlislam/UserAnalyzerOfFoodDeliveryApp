// used Material UI by considering easy optimization in future

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box, Button, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modal from '@mui/material/Modal';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import React from "react";
import { RiEqualizerLine } from "react-icons/ri";
import files from "../components/files";
import Header from "../layouts/header/Header";
import Styles from "./Landing.module.css";


export default function Landing(props) {

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

  // for search by user name
  // const requestSearch = (e) => {
  //   const search = e.target.value;
  //   const filtered = files.filter((user) => {
  //     return user.name.toLowerCase().includes(search.toLowerCase());
  //   });
  //   setProfile(filtered);
  // };


  // for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // for back arrow event handler in header.
  const backArrowClickHandler = e => {
    setProfile([]);
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
  if (profile.length === 0) {

    return (
      <>
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
            <button className={Styles.button}>Generate</button>
          </form>
        </Container>
      </>
    );
  } else {
    return (
      <>
        {/* header section  */}
        <Header showBackArrow={true} backArrowClickHandler={backArrowClickHandler} />

        {/* app container section  */}
        <Container >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>

            <p className={Styles.paragraphFont}>
              Showing {userStatus} users
            </p>
            <Button onClick={handleOpen} style={{ color: "#1490a6" }}>
              Edit Filter
              <RiEqualizerLine style={{ marginLeft: "5px" }} />
            </Button>

            {/* added modal in edit filter */}
            <Modal
              open={open}
              onClose={handleClose}
            >
              <Box classes={Styles.box}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "2rem", color: "#1490a6" }}>
                    Edit Filter
                  </p>
                  <Button onClick={handleClose} style={{ fontSize: "2rem", color: "#1490a6" }}>
                    X
                  </Button>
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
                  <button className={Styles.button}>Generate</button>
                </form>

              </Box>
            </Modal>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <input style={{ width: '300px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              type="text"
              placeholder="Search by name"
              value={profile}
              onChange={(e) => {
                setProfile(e.target.value)
              }}
            />
          </div>
          <ImageList >
            {/* mapping of the profile data for rendering the user's profile */}
            {profile.map((item) => (
              <ImageListItem sx={{ maxWidth: "250px", textAlign: "center" }} key={item.name}>
                <img
                  src={`${item.pictureUrl}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.pictureUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.name}
                  subtitle={<span>by: {item.name}</span>}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </>
    );
  }
}



