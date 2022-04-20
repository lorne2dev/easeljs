import points from "./data.js";

const drawLine = (stage, start, end) => {
    const line = new createjs.Shape();
    line.graphics
        .clear()
        .setStrokeStyle(1)
        .beginStroke("#ff0000")
        .moveTo(start.x, start.y)
        .lineTo(end.x, end.y)
        .endStroke();
    stage.addChild(line);
};

const drawHightlightCircle = (shape) => {
    shape.graphics
        .clear()
        .setStrokeStyle(2)
        .beginStroke("#00ffff")
        .beginFill("#000")
        .drawCircle(0, 0, 10)
        .endFill();
};

const drawNormalCircle = (shape) => {
    shape.graphics
        .clear()
        .setStrokeStyle(1)
        .beginStroke("#0000ff")
        .beginFill("rgba(128,128,128,0.5)")
        .drawCircle(0, 0, 10)
        .endFill();
};

const drawPoint = (stage, point) => {
    const s = new createjs.Shape();

    s.on("mouseover", (e) => {
        e.target.cursor = "pointer";
        drawHightlightCircle(e.target);
        stage.update();
    });

    s.on("mouseout", (e) => {
        drawNormalCircle(e.target);
        stage.update();
    });

    s.on("click", (e) => {
        stage.removeChild(e.target);
        stage.update();
    });

    drawNormalCircle(s);
    s.x = point.x;
    s.y = point.y;

    stage.addChild(s);
};

const initialiseCanvas = () => {
    const canvas = document.getElementById("canvas");
    const stage = new createjs.Stage(canvas);
    stage.enableMouseOver(100);

    points.forEach((point) => {
        drawPoint(stage, point);
    });

    // connect the points
    for (let i = 0; i < points.length - 1; i++) {
        drawLine(stage, points[i], points[i + 1]);
    }

    stage.update();
};

window.onload = () => {
    initialiseCanvas();
};
