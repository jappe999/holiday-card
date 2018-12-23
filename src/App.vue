<template>
  <div class="h-full relative flex flex-col text-white font-sans">
    <canvas ref="snow" class="h-full w-full absolute"></canvas>
    <div class="h-full relative p-6">
      <div class="w-full flex justify-end items-center cursor-pointer" @click="toggleSong" title="Pauzeer muziek">
        <span class="text-grey text-sm no-underline mr-4">
          George Michael - Last Christmas
        </span>
        <i :class="`fas fa-fw fa-volume-${this.isPlaying ? 'up' : 'off'}`" />
      </div>

      <div class="h-full w-full flex flex-col justify-center items-center text-center">
        <img src="./assets/logo.svg" alt="" class="w-48">
        <h1 class="font-charm pb-6">
          <span class="text-5xl">W</span>ebdrawings wenst je fijne feestdagen!
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import SC from 'soundcloud'
import Snow from './plugins/Snow'

export default {
  data: () => ({
    snow: null,
    player: null,
    trackId: '178907847',
    isPlaying: true,
  }),

  async mounted () {
    if (process.env.NODE_ENV === 'production') {
      window.addEventListener('load', async () => {
        await SC.initialize({
          client_id: process.env.SC_CLIENT_ID
        })
  
        this.playSong()
      })
    }

    this.letItSnow()
  },

  methods: {
    letItSnow () {
      const canvas = this.$refs.snow
      this.snow = new Snow(canvas, 100)
    },

    async playSong () {
      this.player = await SC.stream(`tracks/${this.trackId}`)
      this.player.setVolume(.5)
      this.player.play()
    },

    toggleSong () {
      this.isPlaying = !this.isPlaying

      if (process.env.NODE_ENV === 'production') {
        if (this.player.isPlaying()) {
          this.player.pause()
        } else {
          this.player.play()
        }
      }
    }
  }
}
</script>