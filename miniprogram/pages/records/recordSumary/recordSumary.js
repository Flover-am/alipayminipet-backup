Page({
  data: {

  },
  onLoad() {},
  onCanvasReady() {
    my.createSelectorQuery().select('#line_pic').node().exec((res) => {
        const canvas = res[0].node
        const height_canvas = canvas.height;
        const width_canvas = canvas.width;

        const ctx = canvas.getContext('2d')

        ctx.moveTo(width_canvas/2,50);
        ctx.lineTo(width_canvas/2,height_canvas-50);
        ctx.stroke();
    })

},
});
