Page({
  data: {
    petName: '',
    petBreed: '',
    petGender: '',
    petWeight: '',
    petBirthdate: '',
    petArrivalDate: ''
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
  async submit() {
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'getOpenId'
    })
  }

});