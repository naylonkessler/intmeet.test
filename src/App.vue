<template>
  <div id="app">
    <header class="top-bar">
      FrontendTest
    </header>
    <section>
      <header class="app-header">
        <h1 class="app-header__title">Marcador de reunião internacional</h1>
      </header>
      <form action="#" class="form" method="GET">
        <div class="form-group">
          <date-input label="Melhor data para a reunião" @date-changed="dateChanged"></date-input>
        </div>
        <div class="form-group">
          <place-input label="Sua localidade" @place-changed="localChanged"></place-input>
        </div>
        <div class="form-group">
          <place-input label="Outra localidade" @place-changed="remoteChanged"></place-input>
        </div>
      </form>
      <meeting-time :times="result" v-if="hasTimes && !hasNoOverlap"></meeting-time>
      <div class="no-overlap-msg" v-if="hasTimes && hasNoOverlap">Não é possível marcar uma reunião entre as localidades selecionadas. Não há overlap em horário comercial.</div>
    </section>
  </div>
</template>

<script>
import Store from './components/Store'
import DateInput from './components/DateInput'
import PlaceInput from './components/PlaceInput'
import MeetingTime from './components/MeetingTime'

export default {
  name: 'app',

  components: {
    DateInput,
    PlaceInput,
    MeetingTime
  },

  data () {
    return {
      local: null,
      localLocation: '',
      remote: null,
      remoteLocation: null,
      result: {
        local: {
          date: null,
          place: '',
          time: ''
        },
        remote: {
          date: null,
          place: '',
          time: ''
        }
      },
      timestamp: 0
    }
  },

  computed: {
    hasTimes () {
      return this.result.local.time.length > 0 &&
        this.result.remote.time.length > 0
    },

    hasPlaces () {
      return this.result.local.place.length > 0 &&
        this.result.remote.place.length > 0
    },

    hasNoOverlap () {
      if (!this.hasTimes) return true

      return !this.store.isMeetingPossible(
        this.result.local.date,
        this.result.remote.date
      )
    }
  },

  watch: {
    'result.local.place': 'tryToFetchTimes',
    'result.remote.place': 'tryToFetchTimes'
  },

  mounted () {
    this.store = new Store()
  },

  methods: {
    dateChanged (date, timestamp) {
      this.timestamp = timestamp
    },

    fetchTimes () {
      this.store.timeAt(this.localLocation, this.timestamp)
        .then((response) => {
          let local = this.result.local
          local.date = this.store.localTime(response.data, this.timestamp)
          local.time = this.store.timeString(local.date)
        })
      this.store.timeAt(this.remoteLocation, this.timestamp)
        .then((response) => {
          let remote = this.result.remote
          remote.date = this.store.localTime(response.data, this.timestamp)
          remote.time = this.store.timeString(remote.date)
        })
    },

    localChanged (place, location) {
      this.local = place
      this.localLocation = location
      this.result.local.date = null
      this.result.local.place = place.formatted_address
      this.result.local.time = ''
    },

    remoteChanged (place, location) {
      this.remote = place
      this.remoteLocation = location
      this.result.remote.date = null
      this.result.remote.place = place.formatted_address
      this.result.remote.time = ''
    },

    tryToFetchTimes (result) {
      if (!this.hasTimes && this.hasPlaces) {
        this.fetchTimes()
      }
    }
  }
}
</script>

<style lang="scss">
$font-family: Roboto, sans-serif;

* {
  box-sizing: border-box;
}

body {
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

#app {
  color: #353537;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 50px 10%;
  padding: 30px;
  text-rendering: optimizeLegibility !important;
}

.top-bar {
  color: #999;
  font-style: italic;
}

.app-header {
  border-bottom: 1px solid #f0f0f0;
  margin: 0 0 20px 0;
  padding: 20px 0;
}

.app-header__title {
  font-weight: 100;
  margin: 0;
}

.form {
  display: flex;
  justify-content: space-between;
}

.form-group {
  width: 31%;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    border: 1px solid #cecece;
    display: block;
    font-family: $font-family;
    font-size: 1em;
    padding: 10px 15px;
    width: 100%;
  }

  .error {
    color: #d22;
  }
}

.no-overlap-msg {
  border-top: 2px solid #922;
  color: #922;
  margin-top: 30px;
  padding: 10px;
}

@media (max-width: 900px) {
  .form {
    display: block;
  }

  .form-group {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
