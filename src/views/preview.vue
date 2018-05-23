<template>
  <div class="wrapper">
    <div class="content">
      <img :src="portrait" />
      <h1 class="nametext">姓名：{{name}}</h1>
    </div>

    <div class="next" @click="next">确认提交</div>

    <div class="success">
      <h1>
        您的胸卡图片已提交成功，请耐心等待打印！
      </h1>
      <div class="btn" @click="confirm">关闭</div>
    </div>

    <!--<canvas id="prew" style="position: relative; index=10;"></canvas>-->

    <!-- <img :src="tmpsrc" class="tmpsrc"> -->

  </div>
</template>

<script>
import axios from 'axios'
import * as signalr from '../assets/signalr'

export default {
  data () {
    return {
      // bg: require('../assets/' + this.$store.state.tpl + '.png'),
      bg: '',
      loadImgSrc: require('../assets/loading.gif')
      // tmpsrc: ''
    }
  },
  mounted () {
    if (this.$store.state.tpl !== undefined) {
      this.bg = require('../assets/' + this.$store.state.tpl + '.png')
    }
    document.getElementsByClassName('wrapper')[0].style.background = 'url(' + this.bg + ') center center/cover'

    if (this.$store.state.tpl === 0) {
      document.getElementsByClassName('content')[0].style.bottom = '97px'
      document.getElementsByClassName('nametext')[0].style.color = '#FFFFFF'
      document.getElementsByClassName('next')[0].style.color = '#CC141E'
    } else if (this.$store.state.tpl === 1) {
      document.getElementsByClassName('content')[0].style.bottom = '97px'
      document.getElementsByClassName('nametext')[0].style.color = '#0C458D'
      document.getElementsByClassName('next')[0].style.color = '#0C458D'
    } else {
      document.getElementsByClassName('nametext')[0].style.color = '#CC141E'
      document.getElementsByClassName('next')[0].style.color = '#CC141E'
      if (document.documentElement.clientHeight < 600) {
        document.getElementsByClassName('content')[0].style.top = '200px'
      } else {
        document.getElementsByClassName('content')[0].style.top = '240px'
      }
    }
  },
  computed: {
    portrait () {
      return this.$store.state.portrait
    },
    name () {
      return this.$store.state.name
    },
    phone () {
      return this.$store.state.phone
    },
    tpl () {
      return this.$store.state.tpl
    },
    style () {
      return {
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
  methods: {
    next () {
      // 配置signalr
      // startConnection()

      // alert('next')

      var _this = this
      var host = 'http://wowa1802.dwechat.com'

      var loading = _this.$$loadingInsert(_this.loadImgSrc)

      console.log(document.getElementsByClassName('wrapper')[0])
      console.log(this.$store.state)

      var prew = document.createElement('canvas')
      prew.width = 375 * 2
      prew.height = 603 * 2
      var ctx = prew.getContext('2d')
      ctx.font = '52px PingFangSC-Regular'
      // ctx.fillStyle = 'black'
      if (_this.$store.state.tpl === 0) {
        ctx.fillStyle = '#FFFFFF'
      } else if (_this.$store.state.tpl === 1) {
        ctx.fillStyle = '#0C458D'
      } else {
        ctx.fillStyle = '#CC141E'
      }

      var bgImg = new Image()
      bgImg.src = this.bg
      bgImg.onerror = function () {
        console.log('imgage error!')
        // alert('imgage error!')
      }
      var hdImg = new Image()
      hdImg.src = this.portrait
      hdImg.onerror = function () {
        // alert('image error!')
      }

      bgImg.onload = function () {
        hdImg.onload = function () {
          console.log(bgImg)
          ctx.drawImage(bgImg, 0, 0, 375 * 2, 603 * 2)

          // alert('imgonload')

          var tmpCanvas = document.createElement('canvas')
          tmpCanvas.width = 80 * 2
          tmpCanvas.height = 80 * 2
          var tmpCtx = tmpCanvas.getContext('2d')
          tmpCtx.arc(40 * 2, 40 * 2, 40 * 2, 0, 2 * Math.PI)
          tmpCtx.clip()
          tmpCtx.drawImage(hdImg, 0, 0, 80 * 2, 80 * 2)
          // alert('imgonload1')

          if (_this.$store.state.tpl === 0 || _this.$store.state.tpl === 1) {
            ctx.drawImage(tmpCanvas, 74 * 2, 426 * 2)
            ctx.fillText('姓名：' + _this.name, 169 * 2, 470 * 2)
          } else {
            ctx.drawImage(tmpCanvas, 46 * 2, 202 * 2)
            ctx.fillText('姓名：' + _this.name, 141 * 2, 250 * 2)
          }

          var baseData = prew.toDataURL('image/png', 1.0)
          // var data = baseData.substr(22)
          var postdata = new Array(baseData)
          // var file = _this.convertBase64UrlToBlob(baseData, 'jpg')
          // var formobj = document.createElement('form')
          // var formdata = new FormData(formobj)
          // formdata.set('file', file, 'card')
          // _this.tmpsrc = baseData
          // alert(data.length)
          axios({
            method: 'post',
            url: host + '/litedbapi/file/upload?collectionName=WOWA1803TEST',
            headers: {'content-Type': 'application/json'},
            data: JSON.stringify(postdata)
          }).then(function (res) {
            console.log(res)
            // alert('上传图片'+res)

            var postData = {
              'CollectionName': 'WOWA1803TESTList',
              'Json': {
                'name': _this.name,
                'phone': _this.phone,
                'image': res.data.Data[0]
              },
              'DataSecret': ''
            }

            axios({
              method: 'post',
              url: host + '/litedbapi/json/add',
              headers: {'content-Type': 'application/json'},
              data: JSON.stringify(postData)
            }).then(function (res) {
              console.log(res)
              // alert('存数据'+res)
              var opt = {
                name: res.data.Data.JsonObject.name,
                phone: res.data.Data.JsonObject.phone,
                src: res.data.Data.JsonObject.image
              }

              // 建立signalr连接
              var SignalrClientProxy = signalr.startConnection(opt, _this.$$loadingRemove, loading)
              // _this.$$loadingRemove(loading)
              // _this.$$toast('提交成功！')
              // 提交成功，请耐心等待打印
              // document.getElementsByClassName('success')[0].style.visibility = 'visible'
            }).catch(function (e) {
              console.log(e)
              // alert('存数据'+e)
            })
          }).catch(function (e) {
            console.log(e)
            // alert('上传图片'+e)
          })
        }
      }
    },
    convertBase64UrlToBlob (urlData, type) {
      var bytes = window.atob(urlData.split(',')[1])
      var ab = new ArrayBuffer(bytes.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], {type: 'image/' + type})
    },
    confirm () {
      if (this.$$isWeixinBrowser()){
        // alert('weixin navigator')
        WeixinJSBridge.call('closeWindow')
      } else {
        alert('不是微信浏览器，请手动关闭！')
        // window.close()
      }
    }
  }
}

</script>

<style scoped>
.wrapper{
    margin: 0;
    padding: 0 0 0 0;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
}
img {
  width:80px;
  height: 80px;
  border-radius: 40px;
  float: left;
}
.content{
  height: 80px;
  width: 100%;
  padding-left: 50px;
  box-sizing: border-box;
  position: absolute;
}
h1{
  line-height: 80px;
  text-align: left;
  margin: 0 0 0 90px;
  /* 姓名: */
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #000000;
}
@media(max-width: 350px){
  .content{
    height: 80px;
    width: 100%;
    padding-left: 30px;
    box-sizing: border-box;
    position: absolute;
  }
}
.next{
  width: 192px;
  height: 41px;
  background-color: white;
  // margin: 60px auto auto auto;
  text-align: center;
  line-height: 41px;

  /* Rectangle Copy 3: */
  background: #FFFFFF;
  border-radius: 4px;

  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #4A4A4A;
  text-align: center;

  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
}
.success{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  visibility: hidden;
  background-color: rgba(255, 255, 255, 0.8);
}
.success h1{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  margin: 0;
  width: 200px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.success .btn{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 40px;
  font-weight: 500;
  margin: 0;
  width: 150px;
  height: 40px;
  text-align: center;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
