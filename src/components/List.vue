<template>
  <ul class="List">
    <li
      v-for="item in list"
      :key="item.id">
      <consume
        :item="item" />
    </li>
  </ul>
</template>

<script>
import consume from './Consume'

export default {
  name: 'List',
  components: {
    consume
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>
