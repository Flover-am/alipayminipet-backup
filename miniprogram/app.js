App({
  async onLaunch(options) {
    my.getCloudContext = async function(){
      if(my.fncontext){
        return my.fncontext;
      }else{
        const context = await my.cloud.createCloudContext({
          env: 'env-00jx4sgexwrb'
       });
       await context.init();
       my.fncontext = context;
      }
      return my.fncontext;
    }
  },
})