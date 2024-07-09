export const displayPhone = (phone = "0000000000") => {
  return "+91" + " " + phone.slice(0, 5) + " " + phone.slice(5, 10)
}
