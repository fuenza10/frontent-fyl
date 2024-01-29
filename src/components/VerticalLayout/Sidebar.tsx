/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

//i18n

import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";
//import images
import logo from "../../assets/images/1.png";
import logoLightPng from "../../assets/images/1.png";
import logoLightSvg from "../../assets/images/1.png";
import logoDark from "../../assets/images/1.png";
// import Interfaces
import { ISidebar, IState } from "../../Interfaces";


const Sidebar: React.FC <ISidebar> = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" height="40" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="50" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoLightSvg} alt="" height="40" />
            </span>
            <span className="logo-lg">
              <img src={logoLightPng} alt="" height="50" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>

        <div className="sidebar-background" />
      </div>
    </React.Fragment>
  );
};



const mapStatetoProps = (state: IState) => {
  return {
    layout: state.layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter((Sidebar)));
