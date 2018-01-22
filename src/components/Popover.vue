<template lang="html">
  <div>
    <slot></slot>
    <div>
      <ul>
        <li v-for="item in list">
          <button @click="$emit('clicked', item)">{{ item }}</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: 'popover',
  props: ['list']
}
</script>
