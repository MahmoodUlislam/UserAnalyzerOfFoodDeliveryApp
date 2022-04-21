import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box, Button, Container, Divider, FormControl, FormControlLabel, ImageList, ImageListItem, ImageListItemBar, Modal, Radio, TextField } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import React from 'react';
import { RiEqualizerLine } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import files from "../components/files";
import { headerPropsUpdate, profileArrayUpdate } from "../slices/filterByStatusSlice";
import Styles from "./Landing.module.css";

export default function Profiles() {
    const profiles = useSelector((state) => state.filterByStatusSlice.profileArray);
    // for setting the default date of the date picker field.
    const [fromDate, setFromDate] = React.useState(new Date(new Date("2016-07-04")));
    const [toDate, setToDate] = React.useState(new Date(new Date()));
    // for setting the default value of the radio button group to select the user status.
    const [userStatus, setUserStatus] = React.useState();

    const [searched, setSearched] = React.useState([]);

    let dispatch = useDispatch();

    // for modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // for search by user name
    function requestSearch(e) {
        setSearched(profiles.filter(files => files.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }
    // function cancelSearch() {
    //     setSearched(profiles);
    // }

    // function filterByStatus() {
    //     return profiles.filter(files => files.status === userStatus);

    // }

    // for generating the result of customer based on user status and date.
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        let From = formatDate(fromDate);
        let To = formatDate(toDate);

        //  calculating the logic for the selected user status based on date & meals ordered.
        files.forEach((element) => {
            let count = 0;
            // const profileArray = [];
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

                    profiles.push(element.profile);
                }

            } else if (userStatus === "superactive") {

                if (count > 10) {

                    profiles.push(element.profile);

                }

            } else if (userStatus === "bored") {

                if (count === 0) {

                    profiles.push(element.profile);

                }
            }

            dispatch(profileArrayUpdate(element));
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
    dispatch(headerPropsUpdate(
        state => {
            state.showBackArrow = true;
        }
    ));

    return (
        <>
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
                                <button className={Styles.button}>Generate</button>
                            </form>

                        </Box>
                    </Modal>
                </div>

                <input style={{ width: '300px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    type="text"
                    placeholder="Search by name"
                    value={searched}
                    onChange={requestSearch}
                />

                <ImageList >
                    {/* mapping of the profile data for rendering the user's profile */}
                    {profiles.map((profile) => (
                        <ImageListItem sx={{ maxWidth: "250px", textAlign: "center" }} key={profile.profile.name}>
                            <img
                                src={`${profile.profile.pictureUrl}?w=248&fit=crop&auto=format`}
                                srcSet={`${profile.profile.pictureUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={profile.profile.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={profile.profile.name}
                                subtitle={<span>by: {profile.profile.name}</span>}
                                position="below"
                            />
                        </ImageListItem>
                    ))}

                </ImageList>
            </Container>
        </>

    )
}
