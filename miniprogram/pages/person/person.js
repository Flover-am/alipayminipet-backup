const URL = 'https://demo.antcloud-miniprogram.com';
//需要部署后端并将URL改为后端地址
Page({
  data: {
    nickname: '账户名', //用户昵称
    avatar: '', //用户头像
    isLogin: false, //是否登录
    isAvatar: false, //是否获取头像
    isAvatarLoading: false, //获取头像loading
    isLoginLoading: false ,//

    userGender:"Male",
    year: 10,
    location:"位置",
    todoNum: 0,
    petNum: 0,
    postNum: 0,
  },
  /**
   *  调用OPENAPI
   *
   */
  async onOpenAPIHandler() {
    this.setData({
      isLoginLoading: true
    });
    if (!this.data.isLogin) {
      try {
        const user = await this.getLoginUserHandler();
        this.setData({
          nickname: user.nickName,
          avatar: user.avatar,
          isLogin: true,
          isLoginLoading: false
        });
      } catch (error) {
        console.error(error);
        this.toast(error.message);
        this.setData({
          nickname: '账户名',
          avatar: '',
          isLogin: false,
          isLoginLoading: false
        });
      }
    } else {
      this.setData({
        nickname: '账户名',
        avatar: '',
        isLogin: false,
        isLoginLoading: false,
        isAvatar: false
      });
    }
  },
  getLoginUserHandler() {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.getAuthCode('auth_user');
        const user = await this.getLoginUserInfo(auth.authCode);
        resolve(user);
      } catch (error) {
        console.log('error', error);
        reject(error);
      }
    });
  },
  getLoginUserInfo(authCode) {
    return new Promise((resolve, reject) => {
      my.httpRequest({
        url: `${URL}/alipay/userinfo/alipayUserInfo`,
        data: {
          authCode: authCode
        },
        success: (res) => {
          if (!res.data.success) {
            reject({
              message: '登录失败',
              res
            });
          }
          resolve(res.data);
        },
        fail: (err) => {
          reject({
            message: '用户登录失败',
            err
          });
        }
      });
    });
  },
  getAvatarHandler() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getAuthCode('auth_user');
        const user = await this.getAuthUserInfo();
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },

  getAuthCode(scope) {
    return new Promise((resolve, reject) => {
      my.getAuthCode({
        scopes: scope,
        success: (auth) => {
          resolve(auth);
        },
        fail: (error) => {
          reject({
            message: '用户取消授权',
            error
          });
        }
      });
    });
  },
  getAuthUserInfo() {
    return new Promise((resolve, reject) => {
      my.getAuthUserInfo({
        success: (user) => {
          resolve(user);
        },
        fail: (error) => {
          reject({
            message: '获取用户头像失败',
            error
          });
        }
      });
    });
  },
  toast(message) {
    my.showToast({
      content: message,
      duration: 3000
    });
  },
  onLoad() {
    this.onOpenAPIHandler();
  },
});
