Page({
  data:{
    data:null
  },
  async onLoad(){
    var self = this;
    var context = await my.getCloudContext();
    my.showLoading({
      content: '加载中...',
      delay: '100',
    }); 
    context.callFunction({
      name:'helloworld',
      success:function(res){
         my.hideLoading();
         console.log(res);
         self.setData({
           data:res.result.message
         });
      },
      fail:function(erro){
        my.hideLoading();
        console.log(erro);
        self.setData({
          data:null
        });
      }
    });
  },
})