import Vue from 'vue'

export const state = () => ({
  posts: [],
  user: {},
  isMoreCommentsExist: true,
  loading: true
})

export const getters = {
  posts (state) {
    return state.posts
  },

  user (state) {
    return state.user
  },

  loading (state) {
    return state.loading
  },

  isMoreCommentsExist (state) {
    return state.isMoreCommentsExist
  }
}

export const mutations = {
  setPosts (state, { page, infiniteLoadState, posts }) {
    if (page === 1) {
      state.posts = posts
      return
    }

    /* ako ima postova spremi u state.posts */
    if (posts.length > 1) {
      posts.forEach(post => state.posts.push(post))
      if (infiniteLoadState) {
        infiniteLoadState.loaded()
      }
    } else {
      /* ako nema završi s infinite loading */
      infiniteLoadState.complete()
    }
  },

  setPostComments (state, { post, postIndex, comments, commentsPage }) {
    if (commentsPage === 1) {
      Vue.set(state.posts, (postIndex), { ...post, comments })
      return
    }

    comments.forEach((comment) => {
      state.posts[postIndex].comments.push(comment)
    })
  },

  emptyPostComments (state, postIndex) {
    Vue.set(state.posts[postIndex], 'comments', null)
  },

  setUser (state, payload) {
    state.user = payload
  },

  setIsMoreCommentsExist (state, payload) {
    state.isMoreCommentsExist = payload
  },

  setLoading (state, payload) {
    state.loading = payload
  }
}

export const actions = {
  async getPosts ({ commit }, payload) {
    const url = `posts?page=${payload.page}`

    await this.$axios.get(url)
      .then((response) => {
        if (response.status === 200) {
          const posts = response.data.data
          commit('setPosts', { ...payload, posts })
        }
      })
  },

  async getPostComments ({ commit }, payload) {
    const url = `comments?post_id=${payload.post.id}&page=${payload.commentsPage}`

    await this.$axios.get(url)
      .then((response) => {
        const comments = response.data.data
        const { total, page } = response.data.meta.pagination

        commit('setPostComments', { ...payload, comments })

        if (total === page) {
          commit('setIsMoreCommentsExist', false)
        }
      })
  },

  async getUser ({ commit }, payload) {
    const url = `users?id=${payload}`

    commit('setLoading', true)
    await this.$axios.get(url)
      .then((response) => {
        commit('setUser', response.data.data[0])
      }).finally(() => {
        commit('setLoading', false)
      })
  },

  emptyPostComments ({ commit }, payload) {
    commit('emptyPostComments', payload)
  }
}
