import React from 'react';

const Layout = ({ children }) => {
    return (
        <>
            {/* for future optimization */}

            {/* <Header /> */}
            <main style={{ marginTop: "80px" }} className='mainContent'>{children}</main>
        </>
    )
}

export default Layout;