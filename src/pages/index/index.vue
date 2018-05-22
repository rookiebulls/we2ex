<template>
  <div class="container">
    <div>
      <div v-for="(topic, idx) in topics" :key="idx">
        <topic-item :topic="topic" @on-get-topic-content="getTopicContent"></topic-item>
      </div>
    </div>
  </div>
</template>

<script>
import TopicItem from '@/components/TopicItem'
import { getHotTopics } from '@/utils/api'
import wx from '@/utils/wx'
import { obj2Uri } from '@/utils'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      topics: []
    }
  },
  components: {
    TopicItem
  },
  mounted () {
    this.getHotTopics()
  },
  onPullDownRefresh () {
    console.log('on pull down request')
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
