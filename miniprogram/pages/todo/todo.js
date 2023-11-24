Page({
  data: {
    list: [],
    isDone: false,
    time: null,
    todo: 'TODO',
    pet: null,
    num: 0
  },
  
  onLoad() {
    this.setData({
      num: this.data.list.length
    })
  },

  onShow(){
    this.setData({
      num: this.data.list.length
    })
  },

  addItem() {
    var item = {
      isDone: false,
      time: null,
      todo: 'TODO',
      pet: null
    };

    my.prompt({
      title: '新代办事项',
      message: '请输入代办事项：',
      align: 'left',
      success: result => {
        if (result.ok) {
          if (result.inputValue != '') {
            item.todo = result.inputValue;
            this.data.list.push(item),
            this.setData({
              num: this.data.list.length
            })
            my.showToast({
              content: '添加成功',
              type: 'success',
              duration: 1000
            })
          }
          else {
            my.showToast({
              content: '请输入代办事项！',
              type: 'none',
              duration: 1000
            })
          }
        }
      }
    });
  },

  finish(index){
    this.data.list[index].isDone = true
    my.showToast({
      content: '已完成',
      type: 'success',
      duration: 1000
    })
  }
});
