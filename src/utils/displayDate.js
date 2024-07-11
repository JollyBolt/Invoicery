const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const displayDate = (date) => {
  return date.day + " " + months[date.month] + " " + date.year
}
