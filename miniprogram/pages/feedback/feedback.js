// JavaScript
Page({
  data: {
    showModal: false,
    feedbackContent: ''
  },


  handleInput: function (event) {
    this.setData({
      feedbackContent: event.detail.value
    });
  },

  submitFeedback: function () {
    if (!this.data.feedbackContent) {
      my.showToast({
        content: "请输入反馈信息！！！",
        duration: 3000
      });
      return; // 如果输入为空，不执行后续逻辑
    }

    // 提交反馈逻辑
    // 假设反馈提交成功后显示提示弹窗
    this.setData({
      showModal: true
    });
  },

  closeModal: function () {
    this.setData({
      showModal: false
    });
  }
});