<template>
  <div class="tab">
    <ul @click="onTabClic">
      <li id="latest" class="item" :class="{'active': id === 'latest'}">最新</li>
      <li id="hot" class="item" :class="{'active': id === 'hot'}">最热</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: 'latest'
      }
    },
    methods: {
      onTabClic (e) {
        const id = e.target.id
        if (id === this.id) return
        this.id = id
        this.$emit('on-tab-click', id)
      }
    }
  }
</script>

<style scoped>
.tab {
  display: flex;
  justify-content: center;
  width: 100%;
}

.item {
  display: inline-block;
  padding: 5px 20px;
  margin: 0 10px;
  color: #ccc;
}

.active {
  color: black;
  border-bottom: 2px solid black;
}
</style>
