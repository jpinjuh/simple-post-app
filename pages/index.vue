<template>
  <v-row justify="center" align="center">
    <div>
      <v-container style="margin-bottom: 100px">
        <v-row v-for="post in posts" :key="post.id" justify="center">
          <v-col cols="12" sm="8">
            <v-card outlined>
              <v-card-title style="word-break: initial;">
                <div class="d-flex align-center">
                  <v-btn
                    icon
                    class="mr-4"
                    @click="goToUser(post.user_id)"
                  >
                    <v-icon color="info" size="48">
                      mdi-account-circle
                    </v-icon>
                  </v-btn>
                  <span>
                    {{ post.title }}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pb-0">
                {{ post.body }}
              </v-card-text>

              <v-card-actions class="px-3">
                <span
                  style="cursor: pointer;"
                  class="font-weight-medium"
                  @click="getComments(post.id)"
                >
                  Komentari
                </span>
              </v-card-actions>

              <v-container
                v-if="postId === post.id"
                class="pt-0"
              >
                <v-row>
                  <v-col>
                    <div v-if="comments.length > 0">
                      <v-list-item
                        v-for="comment in comments"
                        :key="comment.id"
                        class="px-0 px-sm-3"
                      >
                        <v-list-item-avatar class="d-flex align-self-start">
                          <v-icon size="32">mdi-account-circle</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-medium">
                            {{ comment.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ comment.body }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                    <div
                      v-else
                      class="text-center text--disabled"
                    >
                      No comments for this post.
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="loading" justify="center">
          <v-progress-circular
            :size="56"
            color="primary"
            indeterminate />
        </v-row>
      </v-container>
    </div>
  </v-row>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      posts: [],
      comments: [],
      postId: null,
      page: 1,
      loading: false
    }
  },

  mounted () {
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll () {
      const marginTop = document.documentElement.scrollTop
      const innerHeight = window.innerHeight

      if (Math.ceil(marginTop + innerHeight) >= document.documentElement.offsetHeight) {
        this.loading = true
        this.$axios.get(`posts?page=${this.page}`)
          .then((response) => {
            response.data.data.forEach((post) => {
              this.posts.push(post)
            })

            if (response.data.meta.pagination.pages > this.page) {
              this.page++
            }
          }).finally(() => {
            this.loading = false
          })
      }
    },

    getComments (postId) {
      if (this.postId !== postId) {
        this.$axios.get(`comments?post_id=${postId}`)
          .then((response) => {
            this.comments = response.data.data
          }).finally(() => {
            this.postId = postId
          })
      } else {
        this.postId = null
        this.comments = []
      }
    },

    goToUser (userId) {
      this.$router.push(`/user/${userId}`)
    }
  }
}
</script>
