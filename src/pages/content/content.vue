<template>
  <div>
    <div class="detail">
      <div class="top">
        <div class="top__first">
          <img :src="query.avatar" alt="">
          <div class="user">
            <div>{{ query.username }}</div>
            <div class="user__time">
              <span>创建于 {{ created }}</span>
              <span class="reply">{{ query.replies }} 回贴</span>
            </div>
          </div>
        </div>
        <div>
          <span class="node">{{ query.node}}</span>
        </div>
      </div>
      <wxParse class-name="wx-parse" :content="query.content" no-data=""></wxParse>
    </div>
    <div v-for="(reply, index) in loadedReplies" :key="reply.id">
      <reply-item :reply="reply" :index="index"></reply-item>
    </div>
    <div class="comments" v-if="replies.length && (loadedReplies.length === replies.length)">没有更多评论了~</div>
  </div>
</template>

<script>
import { getReplies, getTopicContent } from '@/utils/api'
import wxParse from 'mpvue-wxparse'
import ReplyItem from '@/components/ReplyItem'
import { timeTransfer, decodeObj } from '@/utils'
import wx from '@/utils/wx'

export default {
  data () {
    return {
      topic: {
        member: {},
        node: {}
      },
      query: {},
      replies: [],
      loadedReplies: [],
      pageSize: 5
    }
  },
  components: {
    wxParse,
    ReplyItem
  },
  computed: {
    created () {
      return timeTransfer(this.query.created)
    }
  },
  mounted () {
    const query = this.$root.$mp.query
    this.query = decodeObj(query)
    this.getReplies(query.id)
  },
  onPullDownRefresh () {
    console.log('on pull down request')
    this.getTopicDetail(this.query.id)
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    console.log('on reach bottom')
    this.refresh()
  },
  methods: {
    async getTopicDetail (id) {
      const topic = await getTopicContent(id)
      this.topic = topic[0]
      const replies = await getReplies({ topic_id: id })
      this.replies = replies
      this.loadedReplies = replies.slice(0, this.pageSize)
    },
    async getReplies (id) {
      const replies = await getReplies({ topic_id: id })
      this.replies = replies
      this.loadedReplies = replies.slice(0, this.pageSize)
    },
    loadMore () {
      const loadedLen = this.loadedReplies.length
      if (loadedLen === this.replies.length) return
      const nextPage = this.replies.slice(loadedLen, loadedLen + this.pageSize)
      for (const item of nextPage) {
        this.loadedReplies.push(item)
      }
    },
    refresh () {
      wx.showNavigationBarLoading()
      this.loadMore()
      this.$nextTick(() => {
        wx.hideNavigationBarLoading()
      })
    }
  }
}
</script>

<style scoped>
.detail {
  padding: 10px 10px;
  border-top: 1px solid #eee;
}

img {
  width: 32px;
  height: 32px;
  margin-right: 15px;
}

span {
  font-size: 12px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.top__first {
  display: flex;
}

.user {
  font-size: 12px;
}

.user__time {
  color: #aaa;
}

.node {
  background-color: #eee;
  border-radius: 2px;
  padding: 2px 4px;
  color: #888;
}

.reply {
  margin-left: 15px;
}

.comments {
  padding: 10px 10px;
  color: #888;
  background-color: #eee;
  text-align: center;
  font-size: 14px;
}
</style>
