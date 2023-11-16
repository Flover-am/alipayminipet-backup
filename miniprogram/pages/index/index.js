Page({
  data:{
    data:null,
    item:{

    },
    topBar:['交流分享','领养送养  ','护理技巧  ','新手教学'],
    msg:'1',
    normalData:[]
  },
  async onLoad(){
    var self = this;
    var context = await my.getCloudContext();
    my.showLoading({
      content: '加载中...',
      delay: '100',
    });
    context.callFunction({
      name:'recommend',
      success:function(res) {
        my.hideLoading();
        console.log(res.result);
        
        self.setData({
          normalData:res
        })
        console.log(res);
        self.setData({
          item:{}
        })
      }
    })
  },
  async change(e) {
    var id=e.currentTarget.dataset.id + 1;
    this.setData({msg:id})
    // console.log(e);
    console.log(id);
  }

})