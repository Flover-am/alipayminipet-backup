Page({
  data: {
    petsData: [],
    userId: 0
  },
  async onLoad() {
    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'getPets',
      success:function(res) {
        my.hideLoading();
        self.setData({
          petsData: res.result.data
        })
      }
    })
  },

  onPullDownRefresh() {

  }
});
