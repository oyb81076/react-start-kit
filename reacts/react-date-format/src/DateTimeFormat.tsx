import moment, { isMoment, Moment } from "moment";
import React from "react";
export interface IDateFormatProps {
  toNow?: boolean;
  date?: string | number | Moment | Date;
  format?: string;
}
export default class DateTimeFormat extends React.Component<IDateFormatProps> {
  public static defaultProps = {
    toNow: false,
    format: "YYYY-MM-DD HH:mm",
  };
  public render() {
    const { format, date, toNow } = this.props;
    if (!date) { return null; }
    const value: Moment = isMoment(date) ? date : moment(date);
    if (toNow) {
      return value.toNow();
    } else {
      return value.format(format);
    }
  }
}
