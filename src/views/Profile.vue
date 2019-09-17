<template>
  <div>
    <v-layout align-center justify-center column>
      <h2 class="title">プロフィール</h2>
      <br />
      <v-flex row class="justify-center">
        <v-card width="300" v-for="card in cards" v-bind:key="card" class="ma-2 pa-6">
          <v-card-title v-text="card.title" />
          <v-card-text class="card-text" v-text="card.text" />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Profile extends Vue {
  public readonly cards = [
    {
      title: 'ゲーム',
      text: [
        '・Minecraft',
        '・Euro Truck Simulator 2',
        '・Cities: Skyline',
        '　などなど'
      ].join('\n')
    },
    {
      title: 'テレビ',
      text: 'アニメはよく見る。他にニュースとか映画見るとき以外は基本テレビは見ない。'
    },
    {
      title: '活動場所',
      text: '主にDiscordで活動してます。Twitterもちまちま、他にもQiita, GitHubなど'
    }
  ];
}
</script>

<style lang="scss">
.card-text {
  white-space: pre-wrap;
}
</style>
