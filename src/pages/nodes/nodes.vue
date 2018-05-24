<template>
  <div>nodes</div>
</template>

<script>
import { getAllNodes } from '@/utils/api'

export default {
  data () {
    return {
      nodes: []
    }
  },
  mounted () {
    this.getAllNodes()
  },
  methods: {
    async getAllNodes () {
      const nodes = await getAllNodes()
      console.log(nodes)
    }
  }
}
</script>

<style>

</style>
