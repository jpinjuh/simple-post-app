<template>
  <v-container style="margin-bottom: 100px">
    <v-row v-for="post in posts" :key="post.id" justify="center">
      <v-col cols="12" sm="8">
        <v-card outlined>
          <v-card-title style="word-break: initial;">
            <div class="d-flex">
              <div class="mr-3">
                <v-icon color="info" size="48">
                  mdi-account-circle
                </v-icon>
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
              @click="getComments(post.id)"
            >
              Komentari
            </div>
          </v-card-actions>

          <v-container
            v-if="postId === post.id"
            class="pt-0"
          >
            <v-row>
              <v-col>
                <div>
                  <v-list-item
                    v-for="comment in post.comments"
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
                      <div class="text-subtitle-1">
                        {{ comment.body }}
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <div
                  class="px-0 px-sm-3 font-weight-medium"
                  style="cursor: pointer"
                  @click="getComments(post.id)"
                >
                  More comments...
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <infinite-loading v-if="posts.length" spinner="spiral" @infinite="getDataOnScroll"></infinite-loading>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      page: 1,
      postId: null
    }
  },

  created () {
    this.$store.dispatch('getPosts', { page: this.page, infiniteState: null })
  },

  computed: {
    ...mapGetters({ posts: 'getPosts' })
  },

  methods: {
    getDataOnScroll ($state) {
      setTimeout(() => {
        this.page++
        this.$store.dispatch('getPosts', { page: this.page, infiniteLoadState: $state })
      }, 500)
    },

    getComments (postId) {
      if (postId) {
        this.$axios.get(`comments?post_id=${postId}`)
          .then((response) => {
            this.posts[postId].comments = response.data.data
          }).finally(() => {
            this.postId = postId
          })
      } else {
        // this.postId = null
      }
    }
  }
}
</script>
