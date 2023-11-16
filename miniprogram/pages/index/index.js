Page({
  data:{
    item:{

    },
    topBar:['交流分享','领养送养  ','护理技巧  ','新手教学'],
    msg:'1',
    normalData:[],
    passageNum: null
  },
  onLoad(){
    this.getTitle();
    console.log(this.normalData);
  },
  async change(e) {
    var id=e.currentTarget.dataset.id + 1;
    this.setData({msg:id})
    // console.log(e);
    console.log(id);
  },
  async getTitle() {
    var self = this;
    var context = await my.getCloudContext();
    my.showLoading({
      content: '加载中...',
      delay: '100',
    });
    var temp = 0;
    context.callFunction({
      name:'recommend',
      
      success:function(res) {
        my.hideLoading();
        console.log(res);
        console.log(res.result);
        
        self.setData({
          normalData:res.result,
          // normalData:res.result,
          passageNum:res.result.length
        })
        console.log(res.result.length);
        // console.log(res.result[0]);
        self.setData({
          item:{}
        })
      }
    })

    // console.log(normalData.tuijian);
  }

})