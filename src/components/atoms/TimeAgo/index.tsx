import React from "react";
import ReactTimeAgo from "react-time-ago";
import useLocale from "@hooks/useLocale";
interface Props {
  date: Date;
}

const TimeAgo = (props: Props) => {
  const { locale, setLocale } = useLocale();

  return <ReactTimeAgo date={props.date} locale={locale} />;
};

export default TimeAgo;
