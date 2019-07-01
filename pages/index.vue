<template>
  <div id="home">
    <section>
      <v-parallax src="images/home/background.png" height="700">
        <v-layout
          justify-center
          align-center
          column
        >
          <v-avatar size="256px">
            <img src="images/icon.png">
          </v-avatar>
          <br>
          <vue-typer
            class="display-1 text-xs-center mb-2"
            :text="texts"
          />
        </v-layout>
      </v-parallax>
    </section>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h1 class="display-2">
            Hello! My name is InkoHX
          </h1><br>
          <p>Inko はインコと言います。HX はただカッコいいという単純な理由で付けられました。</p><br>
          <h2 class="display-1">
            自己紹介
          </h2><br>
          <p class="subheading">
            私は日本の学生デベロッパーです！ <a href="https://server.mcbe.jp" target="_blank">server.mcbe.jp</a>のスタッフメンバーであり、<a href="https://discord.gg/4tpD3TY" target="_blank">Discord.js Japan User Group</a>の管理者です。<br>
            <a href="https://github.com/pmmp/PocketMine-MP" target="_blank">PocketMine-MP</a>というソフトウェアに出会ったのがきっかけでプログラミングの学習を始めました。<br>
            初めて触れた言語はphp（今はほとんど忘れてるかも）<br>
            現在は TypeScript, JavaScript, Vue を中心に学んでいます。<br><br>
            開発以外にゲームも結構やります。（ETS2、Minecraft、Cities: Skylines、Hacknet）
          </p><br>
          <h2 class="display-1">
            どんなことしてるの？
          </h2><br>
          <p class="subheading">
            2018年あたりまでPocketMine-MPのプラグイン開発をしていました。今はもうしていませんが、VectorNetworkProjectというサーバープロジェクトを立てて活動してました。<br>
            現在はDiscordボットの<a href="https://yuigahama.js.org" target="_blank">Yuigahama</a>というボットを開発しています。<br>
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  texts: Array<string> = ['InkoHX is Developer.']

  cards: Array<Object> = [
    {
      img: 'images/language/javascript.jpg',
      title: 'JavaScript',
      text: 'aaa',
      link: ''
    }
  ]
}
</script>

<style>
.vue-typer .custom.char {
  color: #fff;
}

.vue-typer .custom.char.selected {
  background-color: #264F78;
}

.vue-typer .custom.caret {
  width: 3px;
  background-color: #3F51B5;
}

a {
  text-decoration: none;
}
</style>
