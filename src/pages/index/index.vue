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
import { getLatestTopics } from '@/utils/api'
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
    this.getLatestTopics()
  },
  onPullDownRefresh () {
    console.log('on pull down request')
    this.getLatestTopics()
    wx.stopPullDownRefresh()
  },
  methods: {
    async getLatestTopics () {
      const topics = await getLatestTopics()
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
