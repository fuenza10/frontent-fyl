import React from "react";
import withRouter from "./Common/withRouter";

interface NonAuthLayoutProps {
  children: React.ReactNode;
}

const NonAuthLayout: React.FC<NonAuthLayoutProps> = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};



export default withRouter(NonAuthLayout);
