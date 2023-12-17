Page({
  data: {
    userId: 0,
    petId: 0,
    recordsItem: 0,
    recordItem:0,
    history:[{},{}],
    unit:"kg",
    petName:"",
    key:"体温",
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
  },
  async onLoad() {
    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'getHistoryFace',
      data:{
        userId: self.data.userId,
        petId: self.data.petId,
        recordItem: self.data.recordItem,
        recordsItem:self.data.recordsItem
      },
      success:function(res){
        console.log(res);
        self.setData({
          history:res.result.history,
          unit:res.result.unit,
          petName:res.result.petName,
          key:res.result.key
        });
        self.caculateVary();

      }
    
      

    })
  },
  
});
