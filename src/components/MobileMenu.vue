<template>
    <div class="Menu">
      <button class="Menu__toggle">toggle</button>
      <ul class="Menu__dropdown">
        <li>
          Actions
        </li>
        <li>
          Backpack
        </li>
        <li>
          Crafting
        </li>
      </ul>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .Menu {
    @media screen and (min-width: 680px) {
      display: none;
    }
    &__dropdown {

    }
  }
</style>