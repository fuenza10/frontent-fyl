import React from "react";
import PropTypes from "prop-types";


import { connect } from "react-redux";




import "../../components/CommonForBoth/rightbar.scss";

//Import images


//constants

import { changeLayout, changeLayoutMode, changeLayoutWidth, changePreloader, changeSidebarTheme, changeSidebarThemeImage, changeSidebarType, changeTopbarTheme, showRightSidebar } from "@/src/store/layout/layoutSlice";
 //@ts-ignore
const RightSidebar = props => {
   //@ts-ignore
  const onCloseRightBar = () => {
    const { onClose } = props;
    if (onClose) {
      onClose();
    }
  };
  return (
    <React.Fragment>
      <div/>
    </React.Fragment>
  );
};

RightSidebar.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changePreloader: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarThemeImage: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  isPreloader: PropTypes.any,
  layoutType: PropTypes.any,  
  layoutModeType : PropTypes.any,
  changeLayoutMode : PropTypes.func,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarThemeImage: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  topbarTheme: PropTypes.any,
  onClose: PropTypes.func,
};
 //@ts-ignore
const mapStateToProps = state => {
  return { ...state.Layout };
};

export default connect(mapStateToProps, {
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  changePreloader,
  showRightSidebar,
})(RightSidebar);
