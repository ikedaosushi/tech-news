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

export default {
  components: { },
  data() {
    return {
      newses: []
    }
  },
  async created() {
  },
  methods: {
  }
}
</script>
