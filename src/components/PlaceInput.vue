<template>
  <div>
    <label>{{ label }}</label>
    <input class="input" type="text">
  </div>
</template>

<script>
export default {
  name: 'place-input',

  props: ['label'],

  data () {
    return {
      place: null
    }
  },

  computed: {
    location () {
      if (!this.place || !this.place.geometry) return ''

      const location = this.place.geometry.location

      return `${location.lat()},${location.lng()}`
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    changed (control) {
      this.place = control.getPlace()
      this.$emit('place-changed', this.place, this.location)
    },

    init () {
      const input = this.$el.querySelector('.input')
      let control = new window.google.maps.places.Autocomplete(input)

      control.addListener('place_changed', () => this.changed(control))
    }
  }
}
</script>
