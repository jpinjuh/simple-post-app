<template>
  <v-container>
    <v-row
      v-if="loading"
      justify="center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-row>
    <v-row
      v-else
      justify="center"
      align="center"
    >
      <v-col cols="10" sm="6">
        <v-card outlined>
          <v-card-title class="d-flex flex-column">
            <v-icon size="72">
              mdi-account-circle
            </v-icon>
            <h3
              class="text-center"
              style="word-break: break-word;"
            >
              {{ user.name }}
            </h3>
          </v-card-title>

          <v-card-text>
            <v-row justify="center">
              <v-col cols="12">
                <v-list-item
                  v-for="(item, index) in userListData"
                  :key="index"
                  class="px-0"
                >
                  <v-list-item-avatar class="align-self-start">
                    <v-icon>
                      {{ item.icon }}
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <a
                        v-if="item.name === 'Email'"
                        :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${item.value}`"
                        class="text-decoration-none black--text"
                        target="_blank"
                        style="word-break: break-all;"
                      >
                        {{ item.value }}
                      </a>
                      <span v-else>
                        {{ item.value }}
                      </span>
                    </v-list-item-title>
                    <v-list-item-subtitle class="font-weight-light">
                      {{ item.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},

  data () {
    return {}
  },

  computed: {
    ...mapGetters([
      'user',
      'loading'
    ]),

    userListData () {
      const { email, gender, status } = this.user

      const userListData = [
        {
          name: 'Email',
          value: email,
          icon: 'mdi-email'
        },
        {
          name: 'Gender',
          value: gender,
          icon: 'mdi-account'
        },
        {
          name: 'Status',
          value: status,
          icon: 'mdi-account-check'
        }
      ]

      return userListData
    }
  }
}
</script>
