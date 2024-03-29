

Page({
  data: {
    userid:'',
    petName: '',
    petAge: '',
    petGender: '请选择性别',
    petWeight: '',
    petBirthdate: '请选择日期',
    petArrivalDate: '请选择日期',
    filePaths: [],
    imageUrls: [],
    deleteUrls: [],
    genderList: ['公','母']
  },
  bindNameInput(e) {
    this.setData({
      petName: e.detail.value
    });
  },
  onLoad() {

  },
  datePicker1() {
    var self = this
    console.log("选择时间");
    my.datePicker({
      format: 'yyyy-MM-dd',
      startDate: '2000-1-1',
      success: (res) => {
        // my.alert({
        //   content: '您选择的日期为: ' + res.date
        // });
        self.setData({
          petBirthdate: res.date
        })
      },
    });
  },
  datePicker2() {
    var self = this
    console.log("选择时间");
    my.datePicker({
      format: 'yyyy-MM-dd',
      startDate: '2000-1-1',
      success: (res) => {
        // my.alert({
        //   content: '您选择的日期为: ' + res.date
        // });
        self.setData({
          petArrivalDate: res.date
        })
      },
    });
  },
  bindAgeInput(e) {
    this.setData({
      petAge: e.detail.value
    });
  },
  
  bindGenderInput(e) {
    this.setData({
      petGender: e.detail.value
    });
  },
  
  bindWeightInput(e) {
    this.setData({
      petWeight: e.detail.value
    });
  },
  
  bindBirthdateInput(e) {
    this.setData({
      petBirthdate: e.detail.value
    });
  },
  
  async getOpenId(context) {
    return new Promise((resolve, reject) => {
      context.callFunction({
        name: 'getOpenId',
        data: {},
        success: (res) => {
          this.setData({
            userid: res.result.OPENID
          });
          resolve();
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  },
  async addPet(){
    var self = this;
    var context;

    console.log(this.data.petName);
    if (self.data.petName == '') {
      my.alert({title:"宠物姓名不能为空"});
      return;
    }
    if (this.data.petAge == '') {
      my.alert({title:"宠物年龄不能为空"});
      return;
    }
    try {
      context = await my.getCloudContext();
      await this.getOpenId(context);
    } catch (error) {
      console.error(error);
      return;
    };
    console.log(self.data);
    context.callFunction({
      name: 'addPets',
      data: {
        petData:{
            "name":self.data.petName,
            "age":self.data.petAge,
            "gender":self.data.petGender,
            "weight":self.data.petWeight,
            "birthday":self.data.petBirthdate,
            "arrivalDate": self.data.petArrivalDate,
            "petAvatar": self.data.imageUrls[0].link
        },

        //假数据测试
        // petData:{
        //     "name":"小白",
        //     "age":"3岁",
        //     "gender":"公",
        //     "weight":"15kg",
        //     "birthday":"05月26日",
        // }
      },
      success: (res) => {
        console.log(res);
        console.log('成功发布');
        //返回上一页面
        my.navigateBack();
      }
    })
  },
  async onUploadImage(file) {
    var self = this;
    console.log('upload file: ', file);

    return new Promise((resolve, reject) => {
      // 添加文件路径
      console.log('file path: ', file.path);
      self.data.filePaths.push(file.path);
      console.log(self.data.filePaths)

      // 上传图片至图床
      my.uploadFile({
        url: 'https://sm.ms/api/v2/upload', // 开发者服务器地址，此 url 仅为示例
        name: 'smfile',
        filePath: file.path,
        header: {Authorization: "388atCE4xsvuzZHCV1MeyHXZkAY70axz"},
        formData: { extra: '其他信息' },
        success: res => {
          my.alert({ title: '上传成功' });
          console.log(res);
          var resJson = JSON.parse(res.data);
          console.log(resJson);
          if (resJson.success){
            // 添加图片URL和删除URL
            self.data.imageUrls.push({link: resJson.data.url});
            self.data.deleteUrls.push({link: resJson.data.hash});
            resolve(resJson.data.url)
          } else {
            // 这里是在干什么？
            // 每张图片只能上传 一次，如果重复上传会上传失败返回图片url
            self.data.imageUrls.push({link: resJson.images});
            resolve(resJson.images)
          }
        },
        fail: err => {
          console.log(err)
          reject();
        },
      });
    });
  },  
  handleOk(value, column) {
    console.log('value', value, 'column', column);
    this.setData({
      petGender: value
    });
    
  },
})