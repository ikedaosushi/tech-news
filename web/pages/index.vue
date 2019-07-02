<template>
  <v-layout column justify-center align-center >
    <v-card width=800 class="my-2" v-for="(news, idx) in newses" :key="idx">
    <v-card-title>
      <a :href="news.url" target="_blank"><h3> {{ news.title }} </h3></a>
      <div class="my-2">
        <span> {{ news.desc }} </span>
      </div>
    </v-card-title>
    </v-card>
  </v-layout>
</template>

<script>
const api = "https://api.github.com/repos/ikedaosushi/tech-news/issues"
import _ from 'lodash'

const decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  let element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();

export default {
  components: { },
  data() {
    return {
      newses: []
    }
  },
  async created() {
    const resp = await this.$axios.get(api)
    this.newses = resp.data
    this.newses.forEach(news => {
      let bodies = decodeEntities(news.body).split("\n") // 3つに分かれる
      if (news.title === bodies[0].replace(/[、【】]/gi, "")) { // 1つ目の要素が同じ場合がある
        bodies.shift()
      }
      const url = bodies.pop()
      news.url = url
      news.desc = bodies.join("\r\r").replace("　", "").replace(" ", "").replace("　", "")
    })
  },
  methods: {
  }
}
</script>
