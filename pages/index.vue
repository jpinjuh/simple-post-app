<template>
  <v-row justify="center" align="center">
    <div>
      <v-container style="margin-bottom: 100px">
        <v-row v-for="post in posts" :key="post.id" justify="center">
          <v-col cols="12" sm="8">
            <v-card>
              <v-card-title style="word-break: initial;">
                <div class="d-flex align-center">
                  <v-btn
                    icon
                    class="mr-4"
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
              <v-card-text>
                {{ post.body }}
              </v-card-text>

              <v-card-actions>
                <span style="cursor: pointer;" class="font-weight-medium">Komentari</span>
              </v-card-actions>

              <v-container>
                <v-row>
                  <v-col>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon size="32">mdi-account-circle</v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Josip Pinjuh</v-list-item-title>
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sit ipsam excepturi libero exercitationem atque expedita pariatur, culpa sed consequatur.</div>
                      </v-list-item-content>
                    </v-list-item>
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
            indeterminate
          ></v-progress-circular>
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
    }
  }
}
</script>
