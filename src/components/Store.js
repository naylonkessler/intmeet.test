import axios from 'axios'
import DateUtil from './DateUtil'

class Store {
  constructor () {
    this.apiEndpoint = 'https://maps.googleapis.com/maps/api/timezone/json'
    this.apiKey = 'AIzaSyBdKcOOJljK0GCbqaM5EzsSkJorY7ZLsFo'
    this.language = 'pt-BR'
  }

  isMeetingPossible (local, remote) {
    const localTimestamp = DateUtil.timestamp(local)
    const remoteTimestamp = DateUtil.timestamp(remote)
    const diff = Math.abs(localTimestamp - remoteTimestamp) / 60

    return diff < 540
  }

  localTime (time, timestamp) {
    const offsets = (time.dstOffset * 1000) + (time.rawOffset * 1000)

    return new Date((timestamp * 1000) + offsets)
  }

  timeAt (location, timestamp) {
    const params = {
      key: this.apiKey,
      location,
      timestamp,
      language: this.language
    }

    return axios.get(this.apiEndpoint, { params })
  }

  timeString (date) {
    return DateUtil.format(date)
  }
}

export default Store
