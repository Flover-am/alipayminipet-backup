Component({
  mixins: [],
  data: {},
  props: {
    itemId: 0,
    name: "t2",
    value: "t2",
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onToSummary(e){
      // console.log("\nthis.$page.data.userId:"+this.$page.data.userId);
      // console.log("\nthis.$page.data.petId:"+this.$page.data.selectedPetId);
      // console.log("\ncardId:"+this.$page.data.current);
      // console.log(this.props);
      var self = this;
      var detail ={
        userId:self.$page.data.userId,
        petId:self.$page.data.selectedPetId,
        cardId:self.$page.data.current,
        itemId: self.props.itemId,
      };
      console.log(detail);
      my.navigateTo({
        url: "/pages/records/recordSumary/recordSumary",
        success: function(res) {
          res.eventChannel.emit('PageMain_Data',{
            data: detail
          }),
          console.log(res);
        }
      })
    }
  },
});
