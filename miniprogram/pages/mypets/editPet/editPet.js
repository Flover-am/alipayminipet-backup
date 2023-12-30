

Page({
  data: {
    userid:'',
    petName: '',
    petBreed: '',
    petGender: '',
    petWeight: '',
    petBirthdate: '',
    petArrivalDate: '',
  },
  bindNameInput(e) {
    this.setData({
      petName: e.detail.value
    });
  },
  
  bindBreedInput(e) {
    this.setData({
      petBreed: e.detail.value
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
  
  bindArrivalDateInput(e) {
    this.setData({
      petArrivalDate: e.detail.value
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
            "age":self.data.petBreed,
            "gender":self.data.petGender,
            "weight":self.data.petWeight,
            "birthday":self.data.petBirthdate,
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


  }
})