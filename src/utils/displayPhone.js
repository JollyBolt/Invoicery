export const displayPhone = (phone = "0000000000") => {
  return phone.replace(/^(\d{5})(\d{5})$/, "+91 $1 $2")
}
