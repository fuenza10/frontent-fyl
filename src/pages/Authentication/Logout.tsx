/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";

import withRouter from "../../components/Common/withRouter";

//redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/src/store/auth/authSlice";

const Logout: React.FC = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser({ history }));
  }, [dispatch, history]);

  return <></>;
};

export default withRouter(Logout);
