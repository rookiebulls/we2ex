<template>
  <div class="topic" @click="getTopicContent">
    <div class="top">
      <div class="top__first">
        <img :src="topic.member.avatar_normal" alt="">
        <div class="user">
          <div>{{ topic.member.username }}</div>
          <div class="user__time">
            <span>{{ lastTouched }}</span>
            <span class="reply">{{ topic.replies }} 回贴</span>
          </div>
        </div>
      </div>
      <div>
        <span class="node">{{ topic.node.title }}</span>
      </div>
    </div>
    <p>
      {{ topic.title }}
    </p>
  </div>
</template>

<script>
import { timeTransfer } from '@/utils'

export default {
  props: {
    topic: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    lastTouched () {
      return timeTransfer(this.topic.last_touched)
    }
  },
  methods: {
    getTopicContent () {
      this.$emit('on-get-topic-content',
        {
          id: this.topic.id,
          title: this.topic.title,
          created: this.topic.created,
          last_touched: this.topic.last_touched,
          avatar: this.topic.member.avatar_normal,
          username: this.topic.member.username,
          replies: this.topic.replies,
          node: this.topic.node.title,
          content: this.topic.content_rendered
        }
      )
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
  padding: 2px 4px;
  color: #888;
}

.reply {
  margin-left: 15px;
}
</style>
