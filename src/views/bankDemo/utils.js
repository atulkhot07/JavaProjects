export const isEmail = (email = '') => {
  if (!email) {
    email = ''
  }
  const mailformat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.\w{2,10})\s*$/
  if (email.match(mailformat)) {
    if (email.indexOf('+') !== -1) {
      return false
    }
    return true
  }
  return false
}
