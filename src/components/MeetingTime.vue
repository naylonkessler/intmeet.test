<template>
  <section class="result">
    <header class="result__header">
      <h2 class="result__title">Horário da reunião</h2>
    </header>
    <section>
      <ul>
        <li>
          <span>{{ times.local.place }} -</span>
          {{ times.local.time }}
        </li>
        <li>
          <span>{{ times.remote.place }} -</span>
          {{ times.remote.time }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  name: 'meeting-time',

  props: ['times']
}
</script>

<style lang="scss">
.result {
  border-top: 2px solid #292;
  margin-top: 30px;
  padding: 10px;

  ul {
    list-style: none;
    margin: 10px 0 0 0;
    padding: 0;
  }

  li {
    border: 1px solid #e5e5e5;
    border-bottom: none;
    padding: 10px;

    &:last-child {
      border: 1px solid #e5e5e5;
    }

    span {
      color: #888;
    }
  }
}

.result__header {
  padding: 10px 0;
}

.result__title {
  font-size: 1.5em;
  font-weight: 100;
  margin: 0;
}
</style>
