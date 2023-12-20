Component({
  mixins: [],
  data: {},
  props: {
    cardId: 0,
    topRecord: {
      item1:{
        name:"name1",
        value:"20斤"
      },
      item2:{
        name:"name1",
        value:"20斤"
      },
      item3:{
        name:"name1",
        value:"20斤"
      },
      item4:{
        name:"name1",
        value:"20斤"
      },
      item5:{
        name:"name1",
        value:"20斤"
      },
      item6:{
        name:"name1",
        value:"20斤"
      },
    },
    title:"TITLE"
  },
  didMount() {
    this.$page.cardNow = this;  
    console.log(this.props.cardId+"-1");
  },
  didUpdate() {
    console.log(this.props.cardId+"-2");
  },
  didUnmount() {
    console.log(this.props.cardId+"-3");

  },
  methods: {
   
  },
});
