App({
  async onLaunch(options) {
    my.getCloudContext = async function(){
      if(my.fncontext){
        return my.fncontext;
      }else{
        const context = await my.cloud.createCloudContext({
          env: 'env-00jx4sgexxnr'  // 实际开发需要更换为bigpet的env
       });
       await context.init();
       my.fncontext = context;
      }
      return my.fncontext;
    }
  },
})
