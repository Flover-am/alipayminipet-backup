Page({
 data: {
    openid: '0036yRkxnEL9IO7emgpU8Alqas9FERtNMUHCCZ6aVUSPCg5',
    array: [],
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
  async onTapLook(event){
    const context = await my.getCloudContext();
    const item = event.currentTarget.dataset.item;
    let details = null;
    context.callFunction({
      name: 'getDetailsByPassageId',
      data: {},
      success: (res) => {
        console.log(res);
        console.log('获取details成功');
        details = res.result;
        console.log(details)

        my.navigateTo({
          url: "/pages/passageDetails/passageDetails",
          success: function(res) {
            res.eventChannel.emit('PageMain_Data',{
              data: details
            }),
            console.log(res);
          }
        })
        resolve();
      },
      fail: (error) => {
        reject(error);
      }
    });
  }
});

