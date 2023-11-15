App({
  globalData:{
    userid:'',
    username:'',
  },
  
  getUserInfo(){
    var that = this
    return new Promise((resovle,reject)=>{
      if(this.userInfo) resovle(this.userInfo);
      
      //调用用户授权 api 获取用户信息
      my.getAuthCode({
        scopes: 'auth_user', 
        success:(res) =>{
           if (res.authCode) {    
             my.httpRequest({
               url: that.globalData.apiurl + '/api/AliPay/GetUserInfo',
               method: 'GET',
               data: {
                  auth_code: res.authCode
               },
               dataType: 'json',
               success: function(res) {
                  that.globalData.studentid = res.data.data.student_id;
                  that.globalData.username = res.data.data.user_name;
                  //获取用户信息,照片、昵称
                  my.getAuthUserInfo({
                    scopes: ['auth_user'],
                    success: (res) => {
                      that.userInfo = res;
                      resovle(that.userInfo);
                   },
                   fail:() =>{
                      reject({});
                   }
                  });
                  console.log('返回UserDetail', res.data.data);         
               },
               fail: function(res) {
                  my.alert({content: 'fail'});
               },
               complete: function(res) {
                  my.hideLoading();
               }
            });
          }
        },
        fail:() =>{
          reject({});
        }
      });
    });
  },

  async onLaunch(options) {
    my.getCloudContext = async function(){
      if(my.fncontext){
        return my.fncontext;
      }else{
        const context = await my.cloud.createCloudContext({
          env: 'env-00jx4sgexwrb'  // 实际开发需要更换为bigpet的env
       });
       await context.init();
       my.fncontext = context;
      }
      return my.fncontext;
    }
  },
})
