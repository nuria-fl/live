<template>
  <ul>
    <li v-for="item in list">
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
