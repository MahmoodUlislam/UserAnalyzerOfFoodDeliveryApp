import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Styles from './Layout.module.css';


const Layout = () => {

    return (
        <React.Fragment>

            <Header />
            <div className={Styles.outlet}>
                {/* for future optimization */}
                <Outlet />
            </div>

        </React.Fragment>
    )
}

export default Layout;