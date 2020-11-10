<template>
  <v-app dark>
    <v-main>
      <v-app-bar
        color="primary"
        class="elevation-0"
      >
        <v-container>
          <v-row>
            <v-col>
              <nuxt-link to="/">
                <h3
                  class="white--text"
                >
                  PostApp
                </h3>
              </nuxt-link>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {},

  data () {
    return {}
  }
}
</script>
