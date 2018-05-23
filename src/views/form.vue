<template>
  <div class="wrapper">
      <div class="portrait-wrapper">
        <img :src="camera">
        <input class="portrait" id="portrait" type="file" accept="image/*" @change="tirggerFile($event)">
      </div>
      <input class="name" type="text" placeholder="姓名" v-model="name">
      <input class="phone" type="number" placeholder="手机" v-model="phone">
      <div class="next" @click="next">下一步</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      camera: require('../assets/camera.png'),
      portrait: undefined,
      name: undefined,
      phone: undefined
    }
  },
  mounted () {
    if (document.documentElement.clientHeight < 550) {
      document.getElementsByClassName('wrapper')[0].style.bottom = '-80px'
    } else if (document.documentElement.clientHeight < 600) {
      document.getElementsByClassName('wrapper')[0].style.bottom = '-40px'
    }
  },
  methods: {
    tirggerFile (e) {
      // console.log(e)

      let vm = this

      let file = this.portrait = e.target.files[0]

      console.log(!/image\/*/.test(file.type))

      if (!/image\/*/.test(file.type)) {
        this.$$toast('请上传图片')
        return
      } else {
        this.portrait = true
      }

      let reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onloadend = function () {
        vm.camera = this.result
        vm.$store.commit('setPortrait', this.result)
      }
    },
    next () {
      if (this.$store.state.portrait === undefined) {
        this.$$toast('请上传头像')
        return
      }

      if (this.name === undefined) {
        this.$$toast('请输入姓名')
        return
      }

      if (!this.$$verify('tel', this.phone)) {
        this.$$toast('请输入正确的手机号码')
        return
      }

      // this.$store.commit('setPortrait', this.camera)
      this.$store.commit('setName', this.name)
      this.$store.commit('setPhone', this.phone)

      console.log(this.$store.state)
      this.$router.push('/template')
    }
  }
}

</script>

<style scoped>

input{
  display: block;
}

.wrapper{
    background: url("../assets/bg-red.png") center center/cover;
    margin: 0;
    padding: 0;
    position: fixed;
    top:0;
    right:0;
    left:0;
    height:792px;
}

.portrait-wrapper{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: relative;
  margin: 60px auto 30px auto;
}

.portrait-wrapper img{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
}

.portrait {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  opacity: 0;
  background-color: red;
  z-index: 9;
  position: relative;

}

.name,.phone{
  width: 236px;
  height: 33px;
  display: block;
  margin: 20px auto;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #979797;
  box-sizing: border-box;

  /* 姓名: */
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #000000;

  appearance:none;
  outline:0;
}

.next{
  width: 192px;
  height: 41px;
  background-color: white;
  /*margin: 233px auto auto auto;*/
  position:absolute;
  top:440px;
  left:calc(50% - 96px);
  text-align: center;
  line-height: 41px;

  /* Rectangle Copy 3: */
  background: #FFFFFF;
  border-radius: 4px;

  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #4A4A4A;
  text-align: center;
}

</style>
