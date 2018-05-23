<template>
  <div class="container">
    <div>
      <div v-for="topic in topics" :key="topic.id">
        <topic-item :topic="topic" @on-get-topic-content="getTopicContent"></topic-item>
      </div>
    </div>
  </div>
</template>

<script>
import TopicItem from '@/components/TopicItem'
import Tab from '@/components/Tab'
import { getHotTopics } from '@/utils/api'
import wx from '@/utils/wx'
import { obj2Uri } from '@/utils'

export default {
  data () {
    return {
      topics: []
    }
  },
  components: {
    TopicItem,
    Tab
  },
  mounted () {
    this.getHotTopics()
  },
  onPullDownRefresh () {
    this.getHotTopics()
    wx.stopPullDownRefresh()
  },
  methods: {
    async getHotTopics () {
      const topics = await getHotTopics()
      this.topics = topics
    },
    getTopicContent (payload) {
      const uri = obj2Uri(payload)
      wx.navigateTo({ url: `/pages/content/main?${uri}` })
    }
  }
}
</script>

<style scoped>
</style>
