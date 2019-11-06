<template>
  <div>
    <v-layout align-center justify-center column>
      <h2 class="title">Repository</h2>
      <section v-if="pinRepo.error">
        <p>読み込み中にエラーが発生しました。</p>
      </section>

      <section v-else>
        <section v-if="pinRepo.loading">
          <v-progress-circular :size="50" color="primary" indeterminate />
        </section>

        <section v-else>
          <v-flex row class="justify-center">
            <div v-for="card in pinRepo.axiosResponse.data" v-bind:key="card">
              <v-card width="300" class="ma-2 pa-6" elevation="6" v-bind:href="'https://github.com/' + card.owner + '/' + card.repo">
                <v-card-title v-text="card.repo" />
                <v-card-text v-text="card.description || 'No description.'" />
              </v-card>
            </div>
          </v-flex>
        </section>
      </section>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios, { AxiosResponse } from 'axios'

interface PinnedRepositoryResponse {
  description: string
  forks: number
  language: string
  owner: string
  repo: string
  stars: string
}

interface PinnedRepository {
  error: boolean
  loading: boolean
  axiosResponse: AxiosResponse<PinnedRepositoryResponse> | null
}

@Component
export default class Profile extends Vue {
  private pinRepo: PinnedRepository = {
    error: false,
    loading: true,
    axiosResponse: null
  }

  mounted () {
    axios
      .get('https://gh-pinned-repos.now.sh/?username=InkoHX')
      .then((response: AxiosResponse<PinnedRepositoryResponse>) => (this.pinRepo.axiosResponse = response))
      .catch((error) => {
        console.error(error)
        this.pinRepo.error = true
      })
      .finally(() => (this.pinRepo.loading = false))
  }
}
</script>

<style lang="scss">
.card-text {
  white-space: pre-wrap;
}

h2 {
  padding-bottom: 10px;
}
</style>
