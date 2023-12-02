Page({
  data: {
    list: [],
    num: 0,
    unfinished: 0,
    finished: 0,
    folded: false,
    inEdit: false
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
    if (this.data.inEdit) {
      my.showToast({
        content: '请先完成编辑！',
        type: 'none',
        duration: 1000
      })
      return
    }
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
    if (this.data.inEdit) {
      my.showToast({
        content: '请先完成编辑！',
        type: 'none',
        duration: 1000
      })
      return
    }
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
    if (this.data.inEdit) {
      return
    }
    let index = e.target.dataset.index
    let newList = this.data.list
    newList[index].inEdit = true
    this.setData({
      list: newList,
      inEdit: true
    })
  },

  editTodo(e){
    let index = e.target.dataset.index
    let newList = this.data.list
    let defaltText = newList[index].todo
    my.prompt({
      title: '修改代办事项',
      message: '请修改代办事项：',
      align: 'left',
      inputValue: defaltText,
      success: result => {
        if (result.ok) {
          newList[index].todo = result.inputValue
          this.setData({
            list: newList
          })
        }
      }
    })
  },

  editTime(e){
    let index = e.target.dataset.index
    let newList = this.data.list
    let defaltTime = newList[index].time
    my.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: defaltTime,
      success: result => {
        newList[index].time = result.date
        this.setData({
          list: newList
        })
      }
    })
  },

  editPet(){

  },

  delete(e){
    my.confirm({
      content: '确认要删除吗？',
      confirmButtonText: '删除',
      confirmColor: '#B22222',
      success: result => {
        if (result.confirm) {
          let index = e.target.dataset.index
          let newList = this.data.list
          newList.splice(index, 1)
          this.setData({
            list: newList,
            inEdit: false
          })
          this.update()
        }
      }
    })
  },

  finishEdit(e){
    let index = e.target.dataset.index
    let newList = this.data.list
    newList[index].inEdit = false
    this.setData({
      list: newList,
      inEdit: false
    })
  },

  cancleEdit(){
    let newList = this.data.list
    for (let index = 0; index < newList.length; index++) {
      newList[index].inEdit = false
    }
    this.setData({
      list: newList,
      inEdit: false
    })
  }
});
