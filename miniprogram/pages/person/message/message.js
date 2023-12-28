Page({
 data: {
    openid: '0036yRkxnEL9IO7emgpU8Alqas9FERtNMUHCCZ6aVUSPCg5',
    array: [{username:"江南",message:"你好~",avatar:"https://s2.loli.net/2023/12/26/Md9x2ynOKb4UYTh.png",data:"1天前"}],
  },
  async onLoad() {
    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'getOpenId',
      data: {
      },
      success:function(res) {
        console.log(res);
        console.log('获取成功');
        self.setData({
        openid:res.result.OPENID
        });
        resolve("");
      }
    });
    console.log(this.data.openid)
    context.callFunction({
      name: 'getMessages',
      data: {
      },
      success:function(res) {
        console.log(res);
        console.log('获取成功');
        self.setData({
          array:res
        });
        resolve("");
      }
    })
  },
  onTapLook(){
    my.navigateTo({
      url: "/pages/passageDetails/passageDetails",
      success: function(res) {
        res.eventChannel.emit('PageMain_Data',{
          data: detail
        }),
        console.log(res);
      }
    })
  }
});

