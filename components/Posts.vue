<template>
  <v-container style="margin-bottom: 100px">
    <v-row v-for="(post, index) in posts" :key="index" justify="center">
      <v-col cols="12" sm="8">
        <v-card outlined>
          <v-card-title style="word-break: initial;">
            <div class="d-flex">
              <div class="mr-3">
                <v-btn
                  icon
                  class="pt-3"
                  @click="goToUserProfile(post.user_id)"
                >
                  <v-icon
                    color="info"
                    size="48"
                  >
                    mdi-account-circle
                  </v-icon>
                </v-btn>
              </div>
              <span>
                {{ post.title }}
              </span>
            </div>
          </v-card-title>
          <v-card-text class="pb-0">
            {{ post.body }}
          </v-card-text>
          <v-card-actions class="px-3">
            <div
              style="cursor: pointer;"
              class="font-weight-medium"
              @click="getComments(post)"
            >
              Komentari
            </div>
          </v-card-actions>

          <v-container
            class="pt-0"
          >
            <v-row v-if="post.comments">
              <v-col v-if="post.comments.length > 0">
                <div>
                  <v-list-item
                    v-for="comment in post.comments"
                    :key="comment.id"
                    class="px-0 px-sm-3"
                  >
                    <v-list-item-avatar class="d-flex align-self-start">
                      <v-icon size="32">
                        mdi-account-circle
                      </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">
                        {{ comment.name }}
                      </v-list-item-title>
                      <div
                        class="text-subtitle-1"
                        style="line-height: 1.25rem"
                      >
                        {{ comment.body }}
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <div
                  v-if="post.comments.length >= 20 && isMoreCommentsExist"
                  class="px-0 px-sm-3 font-weight-medium"
                  style="cursor: pointer"
                  @click="moreComments(post)"
                >
                  More comments...
                </div>
              </v-col>
              <v-col v-else>
                <div class="d-flex justify-center text--disabled">
                  No comments for this post.
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <infinite-loading v-if="posts.length" spinner="spiral" @infinite="getDataOnScroll" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      page: 1,
      postId: null,
      commentsPage: 1
    }
  },

  computed: {
    ...mapGetters([
      'posts',
      'isMoreCommentsExist'
    ])
  },

  created () {
    this.$store.dispatch('getPosts', { page: this.page, infiniteState: null })
  },

  methods: {
    getDataOnScroll ($state) {
      setTimeout(() => {
        this.page++
        this.$store.dispatch('getPosts', { page: this.page, infiniteLoadState: $state })
      }, 500)
    },

    getComments (post) {
      const postIndex = this.posts.indexOf(post)
      this.commentsPage = 1

      if (post.comments) {
        this.$store.dispatch('emptyPostComments', postIndex)
      } else {
        this.$store.dispatch('getPostComments', {
          post,
          postIndex,
          commentsPage: this.commentsPage
        })
      }
    },

    moreComments (post) {
      const postIndex = this.posts.indexOf(post)
      this.commentsPage++

      this.$store.dispatch('getPostComments', {
        post,
        postIndex,
        commentsPage: this.commentsPage
      })
    },

    goToUserProfile (userId) {
      this.$store.dispatch('getUser', userId)
      this.$router.push(`/user/${userId}`)
    }
  }
}
</script>
