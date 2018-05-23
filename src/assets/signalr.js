const HUBNAME = 'SignalrClient'

// const serverReceiveMessage = {
//   name: 'serverReceiveMessage',
//   method: function (data) {
//     console.log(data)
//   }
// }

const clientRecieveMessage = {
  name: 'clientRecieveMessage',
  method: function (userName, userPhone, message, createtime) {
    console.log(userName, userPhone, message, createtime)
  }
}

const get = {
  name: 'Get',
  method: function () {
    console.log('data')
  }
}

// 服务器端的方法
// const serverMethodSets = [serverReceiveMessage]
// 客户端的方法
const clientMethodSets = [clientRecieveMessage, get]

// 建立连接
export function startConnection (opt, callback, arg) {
  // let hub = $.hubConnection(process.env.HUB_API)
  // console.log(process.env.HUB_API)
  let {name, phone, src} = opt
  let hub = $.hubConnection('http://wowa1802.dwechat.com')
  let proxy = createHubProxy(hub) // 需要先注册方法再连接
  hub.start().done((connection) => {
    console.log('Now connected, connection ID=' + connection.id)
    proxy.invoke('register', phone, 'client').done(function (e) {
      console.log(JSON.stringify(e))
    })
    proxy.invoke('serverReceiveMessage', name, phone, src, 'client', 'collectionName').done(function (e) {
      console.log(JSON.stringify(e))
      callback(arg)

      document.getElementsByClassName('success')[0].style.visibility = 'visible'
    })
  }).fail(() => {
    console.log('Could not connect')
  })
  hub.error(function (error) {
    console.log('SignalR error: ' + error)
  })
  hub.connectionSlow(function () {
    console.log('We are currently experiencing difficulties with the connection.')
  })
  hub.disconnected(function () {
    console.log('disconnected')
  })
  return proxy
}
// 手动创建proxy
export function createHubProxy (hub) {
  let proxy = hub.createHubProxy(HUBNAME)
  // 注册客户端方法
  clientMethodSets.map((item) => {
    proxy.on(item.name, item.method)
  })
  return proxy
}
