Page({
  data: {
    petName: '',
    petBreed: '',
    petGender: '',
    petWeight: '',
    petBirthdate: '',
    petArrivalDate: '',
    userId: '',
    petsData: {},
    newUser: {

    }
  },
  
  bindNameInput(e) {
    console.log(e);
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
  async submit() {

    var context = await my.getCloudContext();
    context.callFunction({
      name: 'getOpenId',
      success: (res) => {
        this.setData({
          userId: res.result.OPENID
        });
      },
    });


    this.setData({
      petsData: {
        name: this.data.petName,
        gender: this.data.petGender
      }
    })
    context.callFunction({
      name: 'checkUserPetExistOrNot',
      data: {
        userId: this.data.userId
      },
      success: (res)=> {
        console.log(res.result);
        this.setData({
          newUser: res.result
        })
      }
    });

    if (this.data.newUser != []){
      var _id = this.data.newUser[0]._id;
    }
      
    context.callFunction({
      name: 'addPets',
      data: {
        _id: _id,
        userId: this.data.userId,
        petsData: this.data.petsData
      },
      success: (res) =>{
        console.log('成功');
      }
    })

  }

});