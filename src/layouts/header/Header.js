import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { headerPropsUpdate } from '../../slices/filterByStatusSlice';
import Styles from './Header.module.css';
export default function Header() {

    const headerProps = useSelector((state) => state.filterByStatusSlice.showBackArrow);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const backArrowClickHandler = () => {
        //set state data to previous state
        dispatch(headerPropsUpdate(
            state => {
                state.showBackArrow = false;
            }
        ));

        navigate('/');
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className={Styles.appBar}>
                    <Toolbar sx={{ color: "#fff" }}>

                        {/* for conditionally rendering the back arrow with its action */}
                        {headerProps ?

                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={backArrowClickHandler}
                            >
                                <Link className={Styles.backArrow} to="/">
                                    <FiArrowLeft />
                                </Link>

                            </IconButton> : null}

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}