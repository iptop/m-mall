const App = getApp()
import md5 from '../../../assets/md5'
Page({
    data: {
        order: {
            item: {},
        },
    },
    onLoad(option) {
        this.order = App.HttpResource('/order/:id', {id: '@id'})
        this.setData({
            id: option.id
        })
    },
    onShow() {
        this.getOrderDetail(this.data.id)



    },
    primary(event){
      var order_id = this.data.id

      App.HttpService.postUnifiedorder({ id: order_id })
        .then(data=>{
          var order = data.data.data

          console.log(order)

          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            'package': order['package'] ,
            signType: 'MD5',
            paySign: order.paySign,
            'success': function (res) { 
              wx.redirectTo({
                url: '/pages/order/list/index'
              })
            },
            'fail': function (res) {
              
             },
            'complete': function (res) {
              
             }
          })

        })

    },
    getOrderDetail(id) {
        // App.HttpService.getOrderDetail(id)
        this.order.getAsync({id: id})
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                this.setData({
                    'order.item': data.data
                })
            }
        })
    },
})