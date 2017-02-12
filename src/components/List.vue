<template>
  <ul class="c-grid">
    <li v-for="item in list" class="c-grid__item">
      {{item.name}}
      <consume :item="item"></consume>
    </li>
  </ul>
</template>

<script>
import consume from './Consume'

export default {
  name: 'list',
  props: ['list'],
  components: {
    consume
  }
}
</script>
