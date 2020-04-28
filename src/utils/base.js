export function getDate(date, type) {
  let newDate = new Date(date)
  let year = newDate.getFullYear()
  let month = newDate.getMonth()+1
  let day = newDate.getDate()
  let hours = newDate.getHours()
  let minutes = newDate.getMinutes()
  let seconds = newDate.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  if (type == 1) {
    return `${year}-${month}-${day}`
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
}