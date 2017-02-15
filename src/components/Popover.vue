<template lang="html">
  <div class="c-popover">
    <slot></slot>
    <div class="c-popover__bd">
      <ul>
        <li v-for="item in list">
          <button class="o-btn o-btn--link" @click="$emit('clicked', item)">{{ item }}</button>
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
