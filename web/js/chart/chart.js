/**
 * Created by user on 2015/4/23.
 */
if (typeof CanvasRenderingContext2D !== typeof undefined && CanvasRenderingContext2D !== false) {
    var fillTextFunction = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function (text, x, y) {
        var chromeFontScale = CanvasRenderingContext2D.prototype.chromeFontScale;
        if (chromeFontScale != 0) {
            x = x * chromeFontScale;
            y = y * chromeFontScale;
        }
        fillTextFunction.apply(this, [text, x, y]);
    };

    var restoreFunction = CanvasRenderingContext2D.prototype.restore;
    CanvasRenderingContext2D.prototype.restore = function () {
        CanvasRenderingContext2D.prototype.chromeFontScale = 0;
        restoreFunction.apply(this,[]);
    };

    CanvasRenderingContext2D.prototype.chromeFontScale = 0;
    CanvasRenderingContext2D.prototype.fonts = function (font) {
        if ($.browser.chrome) {
            var pxIndex = font.indexOf("px");
            if (pxIndex != -1) {
                var px = parseInt(font.substring(0, pxIndex));
                if (px < 12) {
                    this.scale(px / 12, px / 12);
                    CanvasRenderingContext2D.prototype.chromeFontScale = 12 / px;
                }
            }
        }
        this.font = font;
    };

    CanvasRenderingContext2D.prototype.drawHorizontalLine = function (x, y, right) {
        this.beginPath();
        this.moveTo(x, y);
        this.lineTo(right, y);
        this.stroke();
    };

    CanvasRenderingContext2D.prototype.drawVerticalLine = function (x, y, top) {
        this.beginPath();
        this.moveTo(x, y);
        this.lineTo(x, top);
        this.stroke();
    };

    CanvasRenderingContext2D.prototype.drawDashLine = function (x1, y1, x2, y2, dashLength) {
        var deltaX = x2 - x1;
        var deltaY = y2 - y1;
        var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));//2點之間的距離
        var numDash = Math.floor(distance / dashLength);//虛線和空白的數量
        var x;
        var y;
        this.beginPath();
        for (var i = 0; i < numDash; i++) {
            x = x1 + deltaX / numDash * i;
            y = y1 + deltaY / numDash * i;
            if (i % 2 == 0) {
                this.moveTo(x, y);
            } else {
                this.lineTo(x, y);
            }
        }
        if (numDash % 2 != 0) {//
            this.lineTo(x2, y2);
        }
        this.stroke();
    };
}