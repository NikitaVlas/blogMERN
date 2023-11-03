import React from 'react';
import {Navbar} from "./Navbar";

const Layout = ({children}) => {
    return (
        <React.Fragment>
            <div>
                <Navbar/>
                {children}
            </div>
        </React.Fragment>
            

    );
};

export default Layout;