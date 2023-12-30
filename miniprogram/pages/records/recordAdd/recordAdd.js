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

  submit(){
    var self = this
    let tmp = self.data.recordTime.split(/-| |\:/)
    let time = tmp.join("/")
    // TODO：使用云函数上传
    // 可以用的数据：petId，userid，time（格式化后的记录时间），recordType1（大类别），recordType2（小类别），recordDes（描述）
    /* 
        petId: self.petId (来源于record页面的selectedPetId)
        userid: self.userid (来源于record页面获取到的userid)
        time: time  (格式：xxxx/xx/xx/xx/xx)
        recordType1: self.recordType1 (number类型)
        recordType2: self.recordType2 (number类型)
        recordDes: self.recordDes 
    */
  },

  labelFormat(value, options) {
    return options.map(option => option['label']).join(' ')
  }

});
