<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
    <!-- <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback"> -->
      <swiper-slide>
        <div class="slide">
          <img src="../assets/0.png">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide">
          <img src="../assets/1.png">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide">
          <img src="../assets/2.png">
        </div>
      </swiper-slide>
    </swiper>

    <div class="swiper-pagination"></div>

    <div class="next" @click="next">下一步</div>
    <div class="tip">请左右滑动选择胸卡背景</div>

  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import {swiper, swiperSlide} from 'vue-awesome-swiper'

var current

export default {
  data () {
    return {
      swiperOption: {
        direction: 'horizontal',
        initialSlide: 1,
        width: 248,
        centeredSlides: true,
        spaceBetween: 20,
        // loop: true,
        slidesOffsetBefore: document.body.clientWidth / 2 - 114,
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'bullet',
          bulletActiveClass: 'bullet-active'
        },
        on: {
          init: function () {
            let l = this.slides.length
            for (let i = 0; i < l; i++) {
              this.slides[i].style.transition = 'all 500ms'
            }
          },
          slideChangeTransitionEnd: function () {
            // console.log(this.activeIndex)
            // console.log(this.slides[1])
            // console.log(current)
            current = this.activeIndex

            let l = this.slides.length
            for (let i = 0; i < l; i++) {
              if (i === this.activeIndex) {
                this.slides[i].style.transform = 'scale(1)'
              } else {
                this.slides[i].style.transform = 'scale(0.8)'
              }
            }
          }
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      // console.log(vm.$store.state)
      if (vm.$store.state.name === undefined) {
        vm.$router.replace('/')
      }
    })
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    portrait () {
      return this.$store.state.portrait
    },
    name () {
      return this.$store.state.name
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    // this.swiper.slideTo(1, 1000, false)
    if (document.documentElement.clientHeight < 550) {
      document.getElementsByClassName('wrapper')[0].style.bottom = '-150px'
    } else if (document.documentElement.clientHeight < 600) {
      document.getElementsByClassName('wrapper')[0].style.bottom = '-110px'
    } else if (document.documentElement.clientHeight < 650) {
      document.getElementsByClassName('wrapper')[0].style.bottom = '-60px'
    }
  },
  methods: {
    next () {
      this.$store.commit('setTpl', current)

      // console.log(current)
      this.$router.push('/preview')
    }
  }
}

</script>

<style scoped>
ul,li{
  margin: 0;
  padding: 0;
  list-style: none;
}
.wrapper{
    background: url("../assets/tpl-bg.png") top left/cover;
    margin: 0;
    padding: 80px 0 0 0;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
}
img{
  display: block;
  width: 100%;
  height: 100%;
}
.swiper-pagination{
  width: 100%;
  text-align: center;
  margin-top: 26px;
}
.next{
  width: 248px;
  height: 41px;
  background-color: white;
  margin: 60px auto auto auto;
  text-align: center;
  line-height: 41px;
  color: black;

  /* Rectangle Copy 3: */
  background: #FFFFFF;
  border-radius: 4px;
  /* 下一步: */
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #4A4A4A;
  text-align: center;
}

.tip{
  text-align: center;
  line-height: 70px;
  color: rgba(0, 0, 0, 0.7);
}

</style>
