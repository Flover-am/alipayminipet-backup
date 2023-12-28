Page({
 data: {
    openid: '0036yRkxnEL9IO7emgpU8Alqas9FERtNMUHCCZ6aVUSPCg5',
    array: [{username:"江南",message:"你好~",avatar:"https://s2.loli.net/2023/12/26/Md9x2ynOKb4UYTh.png",data:"1天前"}],
  }
  ,
  async onLoad() {
    try {
      const context = await my.getCloudContext();
      await this.getOpenId(context);
      await this.getMessages(context);
    } catch (error) {
      console.error(error);
    }
  },
  
  async getOpenId(context) {
    return new Promise((resolve, reject) => {
      context.callFunction({
        name: 'getOpenId',
        data: {},
        success: (res) => {
          console.log(res);
          console.log('获取成功1');
          this.setData({
            openid: res.result.OPENID
          });
          resolve();
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  },
  
  async getMessages(context) {
    return new Promise((resolve, reject) => {
      context.callFunction({
        name: 'getMessages',
        data: {
          openid: this.data.openid
        },
        success: (res) => {
          console.log(res);
          console.log('获取成功2');
          this.setData({
            array: res.result
          });
          resolve();
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
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

