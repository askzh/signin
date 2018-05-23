var mtds = {
  toast (text) {
    // console.log('toast')

    let toast = document.createElement('div')
    toast.setAttribute('style', 'position: fixed; top: 0; left: 0; right:0; bottom:0;')

    let t = document.createElement('p')
    t.setAttribute('style', 'width: 150px; height: auto; border-radius: 5px; background: rgba(255,255,255,0.9); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 10px; text-align: center; color: black;')

    let tt = document.createTextNode(text)

    t.appendChild(tt)
    toast.appendChild(t)
    document.body.appendChild(toast)

    setTimeout(function () {
      document.body.removeChild(toast)
    }, 800)
  },
  loadingInsert (loadingSrc) {
    console.log('loadinginsert')
    let loading = document.createElement('div')
    loading.setAttribute('style', 'position: fixed; z-index: 9999; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,.5); margin: 0; padding: 0;}')

    let loadingBox = document.createElement('div')
    loadingBox.setAttribute('style', 'position: absolute; width: 32px; height: 32px; top: calc(50% - 16px); left: calc(50% - 16px);')

    let loadingImg = document.createElement('img')
    loadingImg.setAttribute('style', 'width: 100%; height: 100%;')
    loadingImg.src = loadingSrc

    loadingBox.appendChild(loadingImg)
    loading.appendChild(loadingBox)
    document.body.appendChild(loading)

    return loading
  },
  loadingRemove (loadingDom) {
    // console.log('loadingRemove')
    document.body.removeChild(loadingDom)
  },
  verify (type, arg) {
    console.log()
    if (type === 'tel') {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(arg)
    }
  },
  isWeixinBrowser () {
    var agent = navigator.userAgent.toLowerCase()
    console.log(agent)
    if (agent.match(/MicroMessenger/i) === null) {
      return false
    } else if (agent.match(/MicroMessenger/i)[0] === 'micromessenger') {
      return true
    } else {
      throw new Error('未识别的浏览器')
    }
  }
}

export default mtds
