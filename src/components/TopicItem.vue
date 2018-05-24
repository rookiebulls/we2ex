<template>
  <div class="topic" @click="getTopicContent">
    <div class="top">
      <div class="top__first">
        <img :src="topic.member.avatar_normal" alt="">
        <div class="user">
          <div>{{ topic.member.username }}</div>
          <div class="user__time">
            <span>{{ lastModified }}</span>
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
    lastModified () {
      const now = new Date()
      const last = this.topic.last_touched
      const diff = (now.getTime() - last * 1000) / 1000
      if (diff < 0) {
        return '刚刚'
      } else if (diff < 60) {
        return `${diff} 秒前`
      } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} 分钟前`
      } else if (diff < 24 * 3600) {
        return `${Math.floor(diff / 3600)} 小时前`
      } else {
        return `${Math.floor(diff / (24 * 3600))} 天前`
      }
    }
  },
  methods: {
    getTopicContent () {
      this.$emit('on-get-topic-content',
        {
          id: this.topic.id,
          created: this.topic.created,
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
