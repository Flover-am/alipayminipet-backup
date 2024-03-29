Page({
  data: {
    userId: 0,
    petId: 0,
    recordsItem: 0,
    recordItem:0,
    history:[
      {
        time:"",
        value:""
      }
    ],
    unit:"",
    petName:"",
    key:"",
    vary:[]
  },
  caculateVary(){
    var self = this;
    if(this.data.history && this.data.history.length >0){
      var vary = this.data.history.map((value,index,array)=>{
        if(index===array.length-1){
          return 0;
        }else{
          return value.value - array[index + 1].value;
        }
      });
      self.setData({
        vary:vary
      })
    }
    self.setData({
      vary:self.data.vary.map((value)=>{
        var sign = (value >0)? "↑":"↓";
        var num = Math.abs(value);
        if(value === 0){
          return "==0";
        }
        return sign+String(num);
      })
    });
  },
  async onLoad() {
    const eventChannel = this.getOpenerEventChannel();

    var self = this;

    eventChannel.on('PageMain_Data',data => {
      data = data.data;
      self.setData({
        userId:data.userId,
        petId:data.petId,
        recordsItem:data.cardId,
        recordItem:data.itemId
      });
    });
    console.log(self.data);
    var context = await my.getCloudContext();
    my.showLoading({ 
      content: '加载中...',
    }); 
    context.callFunction({
      name: 'getHistoryFace',
      data:{
        userId: self.data.userId,
        petId: self.data.petId,
        recordItem: self.data.recordItem,
        recordsItem:self.data.recordsItem
      },
      success:function(res){
        self.setData({
          history:res.result.history.map((value)=>{
            return {
              time:self.formatDateTime(value.time),
              value:value.value
            };
          }),
          unit:"",
          petName:res.result.petName,
          key:res.result.key
        });
        self.caculateVary();
      }
    });
    my.hideLoading();

  },
  formatDateTime(dateTimeStr) {
    if(typeof dateTimeStr === 'string'){
      
      const dateTimeParts = dateTimeStr.split('/');
      
      if (dateTimeParts.length !== 5) {
        return null; // 如果输入的时间字符串格式不正确，返回 null
      }
    
      const year = dateTimeParts[0];
      const month = dateTimeParts[1];
      const day = dateTimeParts[2];
      const hour = dateTimeParts[3];
      const minute = dateTimeParts[4];
    
      const date = new Date(year, month - 1, day, hour, minute); // 使用 Date 对象创建日期时间
    
      const yearStr = date.getFullYear();
      const monthStr = date.getMonth() + 1;
      const dayStr = date.getDate();
      const hourStr = date.getHours();
      const minuteStr = date.getMinutes();
    
      // 拼接输出的日期时间字符串
      return `${yearStr}年${monthStr}月${dayStr}日 ${hourStr}:${minute}`;
      
  }
    return "11";
  }
});
