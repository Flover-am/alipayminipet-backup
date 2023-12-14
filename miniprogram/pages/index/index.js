Page({
  data:{
    item:{

    },
    // 现话题列表（暂定）
    topics: [
      { title: '交流分享' },
      { title: '领养送养' },
      { title: '护理技巧' },
      { title: '新手教学' },
    ],
    // 原话题列表（拟弃用）
    topBar:['交流分享','领养送养','护理技巧','新手教学'],
    msg:'1',
    normalData:[],
    passageNum: null,
    reachBottom: false,
    currentPage: 1,
    currentMaxPage: 1,
    pageSize: 8,
    pageHeight: 0,
    firstData: [],
    position: null,
    currentTopic: "交流分享"
  },
  onLoad(){
    this.getTitle();
    console.log(this.normalData);
  },

  // 原切换标签回调（拟弃用）
  async change(e) {
    console.log(e);
    var id=e.currentTarget.dataset.id + 1;
    this.setData({
      msg:id,
      currentTopic: this.data.topBar[id-1]
    });
    // console.log(e);
    console.log(id);
  },

  // 现切换标签回调
  async onChange(index, e) {
    console.log(this.data.topics[index].title);
    this.setData({
      msg: index + 1,
      currentTopic: this.data.topBar[index]
    });
  },

  async getTitle() {
    var self = this;
    var context = await my.getCloudContext();
    my.showLoading({
      content: '加载中...',
      delay: '100',
    });
    var temp = 0;
    context.callFunction({
      name:'recommend',
      
      success:function(res) {
        my.hideLoading();
        console.log(res);
        console.log(res.result);
        
        self.setData({
          normalData:res.result,
          // normalData:res.result,
          passageNum:res.result.length,
          firstData: res.result.slice(0, self.data.pageSize)
        })
        console.log(res.result.length);
        // console.log(res.result[0]);
        self.setData({
          item:{}
        })
      }
    })

    // console.log(normalData.tuijian);
  },
  async onPullDownRefresh(){
    console.log("进入刷新");
    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name:'recommend',
      
      success:function(res) {
        my.hideLoading();
        console.log(res);
        console.log(res.result);
        
        self.setData({
          normalData:res.result,
          // normalData:res.result,
          passageNum:res.result.length,
          firstData: res.result.slice(0, self.data.pageSize)
        })
        console.log(res.result.length);
        // console.log(res.result[0]);
        self.setData({
          item:{}
        })
      }
    })
    setTimeout(() => {
      let newDta = this.data.normalData;
      this.setData({
        normalData:newDta
      });
      my.stopPullDownRefresh();
    }, 1000);
  },


  onPageScroll(e) {
    var self = this;
    my.createSelectorQuery().selectViewport().scrollOffset(function (res) {
      let totalPageNum = Math.ceil(self.data.passageNum / self.data.pageSize);
      console.log(e);
      let windowHeight = my.getSystemInfoSync().windowHeight;
      let distanceToBottom = res.scrollHeight - (res.scrollTop + my.getSystemInfoSync().windowHeight);
      console.log(distanceToBottom);
      console.log(totalPageNum);
      var pageIndex = Math.ceil(res.scrollTop/ windowHeight);
      // console.log("scrollHeight: ", res.scrollHeight);
      console.log("scrollTop / windowHeight = ", res.scrollTop/windowHeight);
      console.log(pageIndex);
      self.setData({
        currentPage: pageIndex
      })
      if (distanceToBottom < 2 && !self.data.reachBottom && self.data.currentMaxPage < totalPageNum) {
        console.log("加载新数据");
        self.setData({
          reachBottom: true,
          currentMaxPage: self.data.currentMaxPage + 1,
          currentPage: self.data.currentPage + 1
        });
        self.loadMoreData();
      }

      if ( distanceToBottom > 1 && distanceToBottom < windowHeight) {
        self.setData({
          reachBottom: false       
        });
      } else if (distanceToBottom < 1 && self.data.currentMaxPage == totalPageNum) {
        self.setData({
          reachBottom: true
        })
      }
    }).exec();
  },
  async loadMoreData() {

    // 模拟异步加载更多数据
    my.showNavigationBarLoading();
    console.log("加载数据");
    setTimeout(() => {
      my.hideLoading();
      let startIndex = (this.data.currentPage - 1) * this.data.pageSize;
      console.log("startIndex: ",startIndex);
      
      
      let endIndex = (startIndex + this.data.pageSize) > this.data.passageNum? this.data.passageNum: startIndex + this.data.pageSize;
      
      console.log("endIndex: ", endIndex);
      let newData = this.data.normalData.slice(startIndex, endIndex);

      // 将新数据追加到已有数据中
      let currentData = this.data.firstData;
      currentData = currentData.concat(newData);
      my.showNavigationBarLoading(this.setData({
        firstData: currentData,
        reachBottom: false
      }))
      my.hideNavigationBarLoading();

    }, 1000);
  },
  async passageDetails(e) {
    console.log(e);
    var postId = e.currentTarget.dataset.id;
    var detail = null;
    for (var i = 0; i < this.data.firstData.length; i++) {
      if (this.data.firstData[i].tuijian.Id == postId) {
        detail = this.data.firstData[i];
        break;
      }
    }
    
    var talkList = [];

   
    console.log(talkList);
    my.navigateTo({
      url: "/pages/passageDetails/passageDetails",
      success: function(res) {
        res.eventChannel.emit('PageMain_Data',{
          data: detail
        }),
        console.log(res);
      }
    })
  },
  async releasePassage(e) {
    console.log(e);
    var self = this;
    my.navigateTo({
      url: "/pages/release/release",
      success:function(res) {
        res.eventChannel.emit('PageMain_DataA', {
          data: self.data.normalData
        })
        console.log(res);
      }
    })
  }
})