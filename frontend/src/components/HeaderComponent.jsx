import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const HeaderComponent = () => {
    const history = useHistory();
    const location = useLocation();

    const onLogoutClick = () => {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-brand">Employee Management</div>
                    {(location.pathname !== "/") ? <button className="btn btn-primary" style={{ marginRight: 0 }} onClick={onLogoutClick}> Logout</button> : <></>}
                </nav>
            </header>
        </div>
    )
}
export default HeaderComponent;
