import moment from "moment";

export const formatDate = (date: Date, dateFormat = "LL") =>
  date && moment(date).format(dateFormat);
