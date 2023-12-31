import typeList from './types';

Page({
  data: {
    typeList,
    userid: "",
    petId: 0,
    recordTime: "请选择时间",
    recordType1: "",
    recordType2: "",
    recordDes: "",
  },


  onLoad(query) {
    // console.log('add: ')
    // console.log(query)
    this.setData({
      petId: query.petId,
      userid: query.userid
    })
  },

  datePicker() {
    var self = this
    my.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: '2023-06-15 12:30',
      startDate: '2023-01-01 00:00',
      endDate: '2028-01-01 00:00',
      success: (res) => {
        // my.alert({
        //   content: '您选择的日期为: ' + res.date
        // });
        self.setData({
          recordTime: res.date
        })
      },
    });
  },


  handleCityOnOk(value, selectedOption, e) {
    console.log(selectedOption);
    var self = this
    self.setData({
      recordType1: selectedOption[0]['value'],
      recordType2: selectedOption[1]['value']
    })
  },

  onChange(value, e){
    this.setData({
      recordDes: value
    })
  },

  async submit(){
    var self = this
    let tmp = self.data.recordTime.split(/-| |\:/)
    let time = tmp.join("/")
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'addRecord',
      data:{
        userid: self.data.userid,
        petId: self.data.petId,
        recordType1: self.data.recordType1,
        recordType2: self.data.recordType2,
        time: time,
        recordDes: self.data.recordDes
      },
      success: function(res) {
        console.log(res);
        my.showToast({
          content: '发布成功',
          duration: 2000,
          success: () => {
            setTimeout(() => {
              my.navigateBack();
            }, 2000);
          }
        }); 
        my.navigateBack();
      }
    });


  },

  // labelFormat(value, options) {
  //   return options.map(option => option['label']).join(' ')
  // },
  
  async getOpenId(context) {
    return new Promise((resolve, reject) => {
      context.callFunction({
        name: 'getOpenId',
        data: {},
        success: (res) => {
          this.setData({
            userId: res.result.OPENID
          });
          resolve();
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  },

});
