import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";

export default function withRouter(Children: any) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const match = { params: useParams() };
    const location = useLocation();
    const { t } = useTranslation();
    return <Children {...props} match={match} location={location} t={t} />;
  };
}
