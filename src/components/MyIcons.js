import React from "react";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SettingsIcon from '@material-ui/icons/Settings';

const MyIcon = (i) => {
  switch (i.type){
    case 'dashboard': return <DashboardIcon color="action"/>;
    case 'money': return  <AttachMoneyIcon color="action"/>;
    case 'lock': return  <LockOpenIcon color="action"/>;
    case 'setting': return  <SettingsIcon color="action"/>;
    default: return <p></p>;
  }
}

export default MyIcon;