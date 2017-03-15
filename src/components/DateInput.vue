<template>
  <div>
    <label>{{ label }}</label>
    <input maxlength="10" type="text" @change="changed" v-model="date">
    <small class="error" v-if="isCompleted && isNoWorkday">Informe um dia útil</small>
    <small class="error" v-if="isCompleted && isOutOfRange">
      Informe uma data entre {{ min.toLocaleDateString('pt-BR') }} e
      {{ max.toLocaleDateString('pt-BR') }}
    </small>
  </div>
</template>

<script>
import DateUtil from './DateUtil'

export default {
  name: 'date-input',

  props: ['label'],

  data () {
    const min = new Date()
    let max = new Date()

    max.setFullYear(max.getFullYear() + 1)

    return {
      date: '',
      datepicker: {
        options: {},
        limit: [{
          type: 'weekday',
          available: [1, 2, 3, 4, 5]
        }, {
          type: 'fromto',
          from: min,
          to: max
        }]
      },
      max,
      min
    }
  },

  computed: {
    isCompleted () {
      return this.date.length === 10
    },

    isNoWorkday () {
      return !DateUtil.isWorkday(this.parse(this.date))
    },

    isOutOfRange () {
      return !DateUtil.inRange(this.parse(this.date), this.min, this.max)
    },

    isValid () {
      return this.isCompleted && !this.isNoWorkday && !this.isOutOfRange
    }
  },

  methods: {
    changed () {
      const timestamp = DateUtil.timestampFromString(this.date)

      if (this.isValid) this.$emit('date-changed', this.date, timestamp)
    },

    parse (date) {
      if (!date) return new Date()

      return DateUtil.parse(date)
    }
  }
}
</script>
