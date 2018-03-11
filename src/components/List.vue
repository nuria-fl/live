<template>
  <ul class="List">
    <li v-for="item in list">
      <consume
        :item="item" />
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
