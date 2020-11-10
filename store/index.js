export const state = () => ({
  posts: [],
  comments: []
})

export const getters = {
  getPosts (state) {
    return state.posts
  }
}

export const mutations = {
  setPosts (state, { posts, infiniteLoadState }) {
    if (posts.length > 1) {
      posts.forEach(item => state.posts.push(item))
      if (infiniteLoadState) {
        infiniteLoadState.loaded()
      }
    } else {
      infiniteLoadState.complete()
    }
  }
}

export const actions = {
  async getPosts ({ commit }, { page, infiniteLoadState }) {
    await this.$axios.get(`posts?page=${page}`)
      .then((res) => {
        if (res.status === 200) {
          const posts = res.data.data
          commit('setPosts', { posts, infiniteLoadState })
        }
      })
  }
}
