
class DateUtil {
  static format (date) {
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hour = date.getHours()
    let minute = date.getMinutes()
    const period = hour > 11 ? 'PM' : 'AM'

    if (day < 10) day = '0' + day

    if (month < 10) month = '0' + month

    if (hour > 12) hour -= 12

    if (hour === 0) hour = 12

    if (minute < 10) minute = '0' + minute

    return `${day}/${month}/${year} ${hour}:${minute} ${period}`
  }

  static inRange (date, min, max) {
    min.setHours(0)
    max.setHours(23)

    return date >= min && date <= max
  }

  static isWorkday (date) {
    return date.getDay() !== 0 && date.getDay() !== 6
  }

  static parse (dateString) {
    let [ day, month, year ] = dateString.split('/')

    month = parseInt(month) - 1

    return new Date(year, month, day, 9)
  }

  static timestamp (date) {
    return (date.getTime() / 1000) + (date.getTimezoneOffset() * 60)
  }

  static timestampFromString (dateString) {
    return DateUtil.timestamp(DateUtil.parse(dateString))
  }
}

export default DateUtil
