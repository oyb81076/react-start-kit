import DateTimeFormat from "./DateTimeFormat";
export default class DateFormat extends DateTimeFormat {
  public static defaultProps = {
    ...DateTimeFormat.defaultProps,
    format: "YYYY-MM-DD",
  };
}
