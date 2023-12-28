Component({
  mixins: [],
  data: {
    passageid: '',
    userid:'',
    message:'你好',
    username:'用户名',
    type:'message',
    date:'11-22',
  },
  
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    
  },
  onInit() {
    
  },
  onTapLook(){
    my.navigateTo({
      url: "/pages/passageDetails/passageDetails",
      success: function(res) {
        res.eventChannel.emit('PageMain_Data',{
          data: detail
        }),
        console.log(res);
      }
    })
  }
});
