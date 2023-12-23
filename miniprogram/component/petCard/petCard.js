Component({
  mixins: [],
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {},
  data: {
    petsData: [{
      age: "4岁",
      birthday: "05月20日",
      gender: "公",
      name: "从众的阿西",
      weight: "12kg",
    },
    {
      age: "3岁",
      birthday: "06月24日",
      gender: "公",
      name: "小八",
      weight: "5kg",
    },
    {
      age: "2岁",
      birthday: "05月22日",
      gender: "公",
      name: "来福",
      weight: "2kg",
    }],
    indicatorDots: false,
    autoplay: false,
    vertical: false,
    interval: 1000,
    circular: false,
    duration: 1500,
  },
  onLoad() {
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots,
    });
  },
  changeVertical() {
    this.setData({
      vertical: !this.data.vertical,
    });
  },
  changeCircular(e) {
    this.setData({
      circular: !this.data.circular,
    });
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay,
    });
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value,
    });
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value,
    });
  }
});
