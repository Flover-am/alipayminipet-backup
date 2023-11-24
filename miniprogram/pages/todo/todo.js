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
            let newList = this.data.list
            item.todo = result.inputValue;
            newList.push(item)
            this.setData({
              list: newList,
              num: newList.length
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
    this.setData
  },

  finish(e){
    let index = e.target.dataset.index
    let newList = this.data.list
    newList[index].isDone = true
    this.setData({
      list: newList
    })
    console.log(index)
    console.log(this.data.list[index])
    my.showToast({
      content: '已完成',
      type: 'success',
      duration: 1000
    })
  }
});
