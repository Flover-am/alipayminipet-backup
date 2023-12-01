Page({
  data: {
    list: [],
    num: 0,
    unfinished: 0,
    finished: 0,
    folded: false
  },
  
  onLoad() {
    this.update()
    this.cancleEdit()
  },

  onShow(){
    this.update()
    this.cancleEdit()
  },

  update(){
    let n1 = 0
    let n2 = 0
    for (let index = 0; index < this.data.list.length; index++) {
      if (this.data.list[index].isDone) {
        n2++
      }
      else {
        n1++
      }
    }
    this.setData({
      num: this.data.list.length,
      unfinished: n1,
      finished: n2
    })
  },

  addItem(){
    var item = {
      isDone: false,
      time: null,
      todo: 'TODO',
      pet: null,
      inEdit: false
    };

    my.prompt({
      title: '新代办事项',
      message: '请输入代办事项：',
      align: 'left',
      success: result => {
        if (result.ok) { // 点击“确定”
          if (result.inputValue != '') { // 输入不为空
            my.datePicker({
              format: 'yyyy-MM-dd HH:mm',
              success: (res) => {
                let newList = this.data.list
                item.time = res.date
                item.todo = result.inputValue;
                newList.push(item)
                this.setData({
                  list: newList,
                  num: newList.length
                })
                this.update()
                my.showToast({
                  content: '添加成功',
                  type: 'success',
                  duration: 1000
                })
              }
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

  finish(e){
    let index = e.target.dataset.index
    let newList = this.data.list
    newList[index].isDone = true
    this.setData({
      list: newList
    })
    this.update()
    my.showToast({
      content: '已完成',
      type: 'success',
      duration: 1000
    })
  },

  shiftFold(){
    let shift = this.data.folded
    this.setData({
      folded: !shift
    })
  },

  edit(e){
    let index = e.target.dataset.index
    let newList = this.data.list
    newList[index].inEdit = true
    this.setData({
      list: newList
    })
  },

  editTodo(){
  },

  editPet(){

  },

  editTime(){

  },

  cancleEdit(){
    let newList = this.data.list
    for (let index = 0; index < newList.length; index++) {
      newList[index].inEdit = false
    }
    this.setData({
      list: newList
    })
  }
});
