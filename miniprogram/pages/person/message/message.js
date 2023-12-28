Page({
 data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar',
    }],
  },
  onLoad() {
    context.callFunction({
      name: 'getTalks',
      data: {
        _openid:_openid
      },
      success:function(res) {
        console.log(res);
        console.log('获取成功');
        self.setData({
         passageid:'',
         userid:'',
         message:'',
         username:'',
         date:''
        });
        resolve("");
      }
    })
  },
});

