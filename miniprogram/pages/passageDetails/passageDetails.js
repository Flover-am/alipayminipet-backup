Page({
  data: {
    passage: [],
    autoplay: true,
    vertical: false,
    interval: 1000,
    circular: false,
    duration: 1500
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
