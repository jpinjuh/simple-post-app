import Vue from 'vue'

export const state = () => ({
  posts: []
})

export const getters = {
  getPosts (state) {
    return state.posts
  }
}

export const mutations = {
  setPosts (state, { posts, infiniteLoadState }) {
    if (posts.length > 1) {
      posts.forEach(post => state.posts.push(post))
      if (infiniteLoadState) {
        infiniteLoadState.loaded()
      }
    } else {
      infiniteLoadState.complete()
    }
  },

  setPostComments (state, { post, comments }) {
    const postIndex = post.id - 1

    if (post.comments) {
      Vue.set(state.posts[postIndex], 'comments', null)
    } else {
      Vue.set(state.posts, (postIndex), { ...post, comments })
    }
  }
}

export const actions = {
  async getPosts ({ commit }, { page, infiniteLoadState }) {
    await this.$axios.get(`posts?page=${page}`)
      .then((response) => {
        if (response.status === 200) {
          const posts = response.data.data
          commit('setPosts', { posts, infiniteLoadState })
        }
      })
  },

  async getPostComments ({ commit }, post) {
    await this.$axios.get(`comments?post_id=${post.id}`)
      .then((response) => {
        const comments = response.data.data
        commit('setPostComments', { post, comments })
      })
  }
}
