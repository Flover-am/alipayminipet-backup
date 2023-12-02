Page({
  data: {
    passage: [],
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    var self = this;
    eventChannel.on('PageMain_Data',data => {
      console.log(data);
      self.setData({
        passage: data
      })
    })

  }
});
