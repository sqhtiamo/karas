import mx from './matrix';

const H = 4 * (Math.sqrt(2) - 1) / 3;

// 向量积
function vectorProduct(x1, y1, x2, y2) {
  return x1 * y2 - x2 * y1;
}

function pointInPolygon(x, y, vertexes) {
  // 先取最大最小值得一个外围矩形，在外边可快速判断false
  let [xmax, ymax] = vertexes[0];
  let [xmin, ymin] = vertexes[0];
  let len = vertexes.length;
  for(let i = 1; i < len; i++) {
    let [x, y] = vertexes[i];
    xmax = Math.max(xmax, x);
    ymax = Math.max(ymax, y);
    xmin = Math.min(xmin, x);
    ymin = Math.min(ymin, y);
  }
  if(x < xmin || y < ymin || x > xmax || y > ymax) {
    return false;
  }
  // 所有向量积均为非负数说明在多边形内或边上
  for(let i = 0, len = vertexes.length; i < len; i++) {
    let [x1, y1] = vertexes[i];
    let [x2, y2] = vertexes[(i + 1) % len];
    if(vectorProduct(x2 - x1, y2 - y1, x - x1, y - y1) < 0) {
      return false;
    }
  }
  return true;
}

/**
 * 余弦定理3边长求夹角
 * @param a
 * @param b
 * @param c
 */
function angleBySide(a, b, c) {
  let theta = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c);
  return Math.acos(theta);
}

/**
 * 两点距离
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
function pointsDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * 三角形内心
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param x3
 * @param y3
 */
function triangleIncentre(x1, y1, x2, y2, x3, y3) {
  let a = pointsDistance(x2, y2, x3, y3);
  let b = pointsDistance(x1, y1, x3, y3);
  let c = pointsDistance(x1, y1, x2, y2);
  return [
    (a * x1 + b * x2 + c * x3) / (a + b + c),
    (a * y1 + b * y2 + c * y3) / (a + b + c),
  ];
}

/**
 * 椭圆圆心和长短轴生成4个端点和控制点
 */
function ellipsePoints(x, y, a, b = a) {
  let ox = a * H;
  let oy = b === a ? ox : b * H;
  return [
    [x - a, y],
    [x - a, y - oy, x - ox, y - b, x, y - b],
    [x + ox, y - b, x + a, y - oy, x + a, y],
    [x + a, y + oy, x + ox, y + b, x, y + b],
    [x - ox, y + b, x - a, y + oy, x - a, y]
  ];
}

/**
 * 获取2个矩形重叠区域，如不重叠返回null
 * @param a
 * @param b
 */
function getRectsIntersection(a, b) {
  if(!isRectsOverlap(a, b)) {
    return null;
  }
  let [ax1, ay1, ax4, ay4] = a;
  let [bx1, by1, bx4, by4] = b;
  return [
    Math.max(ax1, bx1),
    Math.max(ay1, by1),
    Math.min(ax4, bx4),
    Math.min(ay4, by4),
  ];
}

/**
 * 2个矩形是否重叠
 * @param a
 * @param b
 */
function isRectsOverlap(a, b) {
  let [ax1, ay1, ax4, ay4] = a;
  let [bx1, by1, bx4, by4] = b;
  if(ax1 >= bx4 || ay1 >= by4 || bx1 >= ax4 || by1 >= ay4) {
    return false;
  }
  return true;
}
/**
 * 2个矩形是否包含，a包含b
 * @param a
 * @param b
 */
function isRectsInside(a, b) {
  let [ax1, ay1, ax4, ay4] = a;
  let [bx1, by1, bx4, by4] = b;
  if(ax1 <= bx1 && ay1 <= by1 && ax4 >= bx4 && ay4 >= by4) {
    return true;
  }
  return false;
}

function calCoordsInNode(px, py, node) {
  let { matrix = [1, 0, 0, 1, 0, 0], computedStyle = {} } = node;
  let { width, height, transformOrigin: [ox, oy] = [width * 0.5, height * 0.5] } = computedStyle;
  [px, py] = mx.calPoint([px * width - ox, py * height - oy], matrix);
  return [px + ox, py + oy];
}

function calPercentInNode(x, y, node) {
  let { computedStyle: { width, height, transformOrigin: [ox, oy] } } = node;
  // 先求无旋转时右下角相对于原点的角度ds
  let ds = Math.atan((height - oy) / (width - ox));
  let [x1, y1] = calCoordsInNode(1, 1, node);
  let d1;
  let deg;
  // 根据旋转后的坐标，分4个象限，求旋转后的右下角相对于原点的角度d1，得出偏移角度deg，分顺逆时针[-180, 180]
  if(x1 >= ox && y1 >= oy) {
    if(ox === x1) {
      d1 = -Math.atan(Infinity);
    }
    else {
      d1 = Math.atan((y1 - oy) / (x1 - ox));
    }
    deg = d1 - ds;
  }
  else if(x1 >= ox && y1 < oy) {
    if(ox === x1) {
      d1 = -Math.atan(Infinity);
    }
    else {
      d1 = Math.atan((oy - y1) / (x1 - ox));
    }
    deg = d1 + ds;
  }
  else if(x1 < ox && y1 >= oy) {
    d1 = Math.atan((y1 - oy) / (ox - x1));
    deg = d1 - ds;
  }
  else if(x1 < ox && y1 < oy) {
    d1 = Math.atan((y1 - oy) / (x1 - ox));
    if(ds >= d1) {
      deg = d1 + Math.PI - ds;
    }
    else {
      deg = Math.PI - d1 + ds;
      deg = -deg;
    }
  }
  else {
    deg = 0;
  }
  // 目标点到原点的边长不会变
  let dt = Math.sqrt(Math.pow(x - ox, 2) + Math.pow(y - oy, 2));
  // 分4个象限，先求目标点到原点的角度d2，再偏移deg后求得原始坐标
  let d2;
  if(x >= ox && y >= oy) {
    if(ox === x) {
      d2 = -Math.atan(Infinity);
    }
    else {
      d2 = Math.atan((y - oy) / (x - ox));
    }
  }
  else if(x >= ox && y < oy) {
    if(ox === x) {
      d2 = -Math.atan(Infinity);
    }
    else {
      d2 = -Math.atan((y - oy) / (ox - x));
    }
  }
  else if(x < ox && y >= oy) {
    d2 = Math.PI - Math.atan((y - oy) / (ox - x));
  }
  else {
    d2 = Math.atan((y - oy) / (x - ox)) - Math.PI;
  }
  d2 -= deg;
  if(d2 > Math.PI) {
    d2 -= Math.PI;
    return [
      (ox - dt * Math.cos(d2)) / width,
      (oy - dt * Math.sin(d2)) / height,
    ];
  }
  if(d2 > Math.PI * 0.5) {
    d2 = Math.PI  - d2;
    return [
      (ox - dt * Math.cos(d2)) / width,
      (oy + dt * Math.sin(d2)) / height,
    ];
  }
  if(d2 >= 0) {
    return [
      (ox + dt * Math.cos(d2)) / width,
      (oy + dt * Math.sin(d2)) / height,
    ];
  }
  if(d2 >= -Math.PI * 0.5) {
    d2 = -d2;
    return [
      (ox + dt * Math.cos(d2)) / width,
      (oy - dt * Math.sin(d2)) / height,
    ];
  }
  if(d2 >= -Math.PI) {
    d2 = Math.PI + d2;
    return [
      (ox - dt * Math.cos(d2)) / width,
      (oy - dt * Math.sin(d2)) / height,
    ];
  }
  d2 = -Math.PI - d2;
  return [
    (ox - dt * Math.cos(d2)) / width,
    (oy + dt * Math.sin(d2)) / height,
  ];
}

function d2r(n) {
  return n * Math.PI / 180;
}

function r2d(n) {
  return n * 180 / Math.PI;
}

export default {
  vectorProduct,
  pointInPolygon,
  d2r,
  r2d,
  // 贝塞尔曲线模拟1/4圆弧比例
  H,
  // <90任意角度贝塞尔曲线拟合圆弧的比例公式
  h(deg) {
    deg *= 0.5;
    return 4 * ((1 - Math.cos(deg)) / Math.sin(deg)) / 3;
  },
  angleBySide,
  pointsDistance,
  triangleIncentre,
  ellipsePoints,
  getRectsIntersection,
  isRectsOverlap,
  isRectsInside,
  calCoordsInNode,
  calPercentInNode,
};
