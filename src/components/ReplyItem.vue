<template>
  <div class="topic">
    <div class="top">
      <div class="top__first">
        <img :src="reply.member.avatar_normal" alt="">
        <div class="user">
          <div>{{ reply.member.username }}</div>
          <div class="user__time">
            <span>{{ lastModified }}</span>
            <span class="reply">{{ reply.thanks }} 赞同</span>
          </div>
        </div>
      </div>
      <div class="node">{{ index + 1 }}&nbsp;楼</div>
    </div>
    <wxParse class-name="wx-parse" :content="reply.content_rendered"></wxParse>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
import { timeTransfer } from '@/utils'

export default {
  props: {
    reply: {
      type: Object,
      default () {
        return {}
      }
    },
    index: Number
  },
  components: {
    wxParse
  },
  computed: {
    lastModified () {
      return timeTransfer(this.reply.last_modified)
    }
  },
  methods: {
    getTopicContent () {
      console.log('click..')
      this.$emit('on-get-topic-content', { id: this.topic.id })
    }
  }
}
</script>

<style scoped>
.topic {
  padding: 10px;
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
  padding: 1px 3px;
  color: #888;
  font-size: 12px;
}

.reply {
  margin-left: 15px;
}
</style>
