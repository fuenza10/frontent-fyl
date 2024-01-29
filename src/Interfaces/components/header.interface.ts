/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HeaderProps {
  theme?: "light" | "dark" | undefined;
  isMenuOpened?: boolean;
  openLeftMenuCallBack?: () => void;
  changeSidebarType?: (
    sidebarType: any,
    isMobile?: any
  ) => {
    type: string;
    payload: {
      sidebarType?: any;
      isMobile?: any;
    };
  };
  leftMenu?: boolean;
  leftSideBarType?: "compact" | "icon" | "condensed" | undefined;
  showRightSidebar?: boolean;
  showRightSidebarAction?: (isopen: boolean) => {
    type: string;
    payload: any;
  };
  toggleLeftmenu?: (isopen: boolean) => {
    type: string;
    payload: any;
  };
  toggleMenuCallback?: () => void;
}
