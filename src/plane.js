var mycanvas = document.querySelector("canvas");
var ctx = mycanvas.getContext("2d");

function Imgmove() {
    this.ctx = ctx;

    // 路径
    this.src = "plane.png";

    // 画布的宽度
    this.canvasWidth = this.ctx.canvas.width;
    // 画布的高度
    this.canvasHeight = this.ctx.canvas.height;

    // 行走步长
    this.step = 12;

    // 行走方向
    this.direction = 0;

    // 调用初始化方法
    this.init();
};

// 初始化方法
Imgmove.prototype.init = function () {
    var self = this;

    // 1. 加载图片
    this.loadImage(function (image) {
        // 图片的宽度
        self.imgWidth = image.width;

        // 图片的高度
        self.imgHeight = image.height;

        // 计算出每个小图的尺寸
        self.imgMoveWidth = self.imgWidth / 3;
        self.imgMoveHeight = self.imgHeight / 4;

        // 图片在画布中间
        self.x0 = self.canvasWidth / 2 - self.imgMoveWidth / 2;
        self.y0 = self.canvasHeight / 2 - self.imgMoveHeight / 2;

        // 2.默认图片绘制在中间
        self.ctx.drawImage(image, 0, 0, self.imgMoveWidth, self.imgMoveHeight, self.x0, self.y0, self
            .imgMoveWidth, self.imgMoveHeight);

        // 3.通过方向键控制直升机
        self.index = 0;
        document.onkeydown = function (e) {
            if (e.keyCode == 40) {
                // 上
                self.index++;
                self.direction = 0;
                self.y0 += self.step;
                self.drawImage(image);
            } else if (e.keyCode == 37) {
                // 左
                self.index++;
                self.direction = 1;
                self.x0 -= self.step;
                self.drawImage(image);
            } else if (e.keyCode == 39) {
                // 右
                self.index++;
                self.direction = 2;
                self.x0 += self.step;
                self.drawImage(image);
            } else if (e.keyCode == 38) {
                // 下
                self.index++;
                self.direction = 3;
                self.drawImage(image);
                self.y0 -= self.step;
            }
        };
    });
};

// 加载图片
Imgmove.prototype.loadImage = function (returnOnload) {
    var image = new Image();
    image.onload = function () {
        returnOnload && returnOnload(image);
    };
    image.src = this.src;
}

// 绘制图片
Imgmove.prototype.drawImage = function (image) {
    // 清除画布，防止鬼畜
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    if (this.index > 2) {
        this.index = 0;
    }

    this.ctx.drawImage(
        image,
        this.index * this.imgMoveWidth, this.direction * this.imgMoveHeight,
        this.imgMoveWidth, this.imgMoveHeight,
        this.x0, this.y0,
        this.imgMoveWidth, this.imgMoveHeight
    );
};
new Imgmove();