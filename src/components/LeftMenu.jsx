import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HistoryIcon from '@material-ui/icons/History';

const LeftMenu = () => {
    return (
        <div className="leftMenu">
            <div className="btn_menu">
                <NavLink to='/' className="menu_link" activeClassName="active_link" exact>
                    <HomeIcon /> <span className="res_content">Home</span>
                </NavLink>
            </div>
            <div className="btn_menu">
                <NavLink to='/additems' className="menu_link" activeClassName="active_link" exact>
                    <AddIcon /> <span className="res_content">Add Item</span>
                </NavLink>
            </div>
            <div className="btn_menu">
                <NavLink to='/activity' className="menu_link" activeClassName="active_link" exact>
                    <TrendingUpIcon /> <span className="res_content">Activity</span>
                </NavLink>
            </div>
            <div className="btn_menu">
                <NavLink to='/history' className="menu_link" activeClassName="active_link" exact>
                    <HistoryIcon /> <span className="res_content">History</span>
                </NavLink>
            </div>
        </div>
    )
}

export default LeftMenu;