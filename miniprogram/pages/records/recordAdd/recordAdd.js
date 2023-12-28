import typeList from './types';

Page({
  data: {
    typeList,
    userid: "",
    petName: "",
    recordTime: "请选择时间",
    recordType1: "",
    recordType2: "",
    recordDes: "",
  },


  onLoad(query) {
    console.log('add: ')
    console.log(query)
    this.setData({
      petName: query.petName,
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
      recordType1: selectedOption[0]['label'],
      recordType2: selectedOption[1]['label']
    })
  },

  onChange(value, e){
    this.setData({
      recordDes: value
    })
  },

  submit(){
    let tmp = this.data.recordTime.split(/-| |\:/)
    let time = tmp.join("/")
    // TODO：使用云函数上传
    // 可以用的数据：petName，userid，time（格式化后的记录时间），recordType1（大类别），recordType2（小类别），recordDes（描述）
    
  },

  labelFormat(value, options) {
    return options.map(option => option['label']).join(' ')
  }

});
