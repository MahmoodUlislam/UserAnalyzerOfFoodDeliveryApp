import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import Styles from './Header.module.css';

export default function Header(props) {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className={Styles.appBar}>
                    <Toolbar sx={{ color: "#fff" }}>

                        {/* for conditionally rendering the back arrow with its action */}
                        {props.showBackArrow ?

                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={props.backArrowClickHandler}
                            >
                                <FiArrowLeft />

                            </IconButton> : null}

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}