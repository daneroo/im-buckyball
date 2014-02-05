"use strict"

var φ = 1.618033988749895,
    ρ = 180 / Math.PI;

var vertices = [
  [1,φ,0], [-1,φ,0], [1,-φ,0], [-1,-φ,0],
  [0,1,φ], [0,-1,φ], [0,1,-φ], [0,-1,-φ],
  [φ,0,1], [-φ,0,1], [φ,0,-1], [-φ,0,-1]
];
var facesIdx = [
  [0,1,4],  [1,9,4],  [4,9,5],  [5,9,3],  [2,3,7],
  [3,2,5],  [7,10,2], [0,8,10], [0,4,8],  [8,2,10],
  [8,4,5],  [8,5,2],  [1,0,6],  [11,1,6], [3,9,11],
  [6,10,7], [3,11,7], [11,6,7], [6,0,10], [9,1,11]
];
var faces=facesIdx.map(function(face) {
  return face.map(function(i) {
    return vertices[i];
  });
});

function hexify(face,idx){
  // transform face (triangle) into hexagon
  // console.log(face.length,idx);
  var ff=[]
  // faces[idx] 0-1
  ff.push(interpolate(face[0],face[1])(1/3));
  ff.push(interpolate(face[0],face[1])(2/3));

  // faces[idx] 1-2
  ff.push(interpolate(face[1],face[2])(1/3));
  ff.push(interpolate(face[1],face[2])(2/3));

  // faces[idx] 2-0
  ff.push(interpolate(face[2],face[0])(1/3));
  ff.push(interpolate(face[2],face[0])(2/3));
  return ff;
}

var hexagons = faces.map(hexify);
console.log('#hexagons',hexagons.length)

// order them
// [ [ 1, 6 ], [ 3, 9 ], [ 3, 7 ], [ 6, 7 ], [ 9, 1 ] ]
// --> [ [ 1, 6 ], [ 6, 7 ], [ 7, 3 ], [ 3, 9 ], [ 9, 1 ] ]
function ordered(neighbors){
  neighbors=neighbors.slice();
  var ord=[neighbors.shift()];
  while (neighbors.length){
    var lookingFor=ord[ord.length-1][1];
    // console.log('lookin',lookingFor,neighbors)
    neighbors = neighbors.filter(function(n){
      if (n[0]===lookingFor) {
        ord.push([n[0],n[1]]);
        return false;
      } else if (n[1]===lookingFor){
        ord.push([n[1],n[0]]);
        return false;
      }
      return true;
    });
  }
  return ord;
}

// for each of the vertices, find an ordered list of its 5 neighbors
function pentify(){
  var faces=[];
  var pentIdx=[];
  var i;
  for (var i=0;i<vertices.length;i++){
    // console.log('--vertex',i)
    var neighbors=[];
    facesIdx.forEach(function(faceIdx){
      var idx=faceIdx.indexOf(i)
      if (idx>=0){
        // console.log('face',faceIdx,'contains vertex',i);
        var nn = faceIdx.filter(function(n){return n!==i});
        // console.log('nn',nn);
        neighbors.push(nn)
      }      
    });
    // console.log('neighbors of',i,':',neighbors);
    // now we have 5 neighbors, they form a cycle of length 5
    // order them
    // [ [ 1, 6 ], [ 3, 9 ], [ 3, 7 ], [ 6, 7 ], [ 9, 1 ] ]
    // --> [ [ 1, 6 ], [ 6, 7 ], [ 7, 3 ], [ 3, 9 ], [ 9, 1 ] ]
    var ord = ordered(neighbors);
    pentIdx.push(ord);
    // console.log('vertex',i,'ordered neighbors',ord);
    var face = ord.map(function(edgeIdx){
      return interpolate(vertices[i],vertices[edgeIdx[0]])(1/3)
    });
    faces.push(face);
  }
  // console.log('faces',faces);
  console.log('pentIdx',pentIdx);

}
pentify();

function dist(a,b){
  var d = [a[0]-b[0],a[1]-b[1],a[2]-b[2]];
  return Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
}

// find edges with length 2
function findEdges(vertices) {
  var edges=[];
  vertices.forEach(function(v1, i1) {
    vertices.forEach(function(v2, i2) {
      var ε = 0.01;
      var d = dist(v1, v2);
      if (d > 0 && d < (2 + ε)) {
        edges.push([v1,v2])
        // console.log(i1, i2, d);
      }
    });
  });
  return edges;
}

 function interpolate(p0, p1) {
  var x0 = p0[0],
      y0 = p0[1],
      z0 = p0[2],
      x1 = p1[0] - x0,
      y1 = p1[1] - y0,
      z1 = p1[2] - z0;
  return function(t) {
    return [
      x0 + t * x1,
      y0 + t * y1,
      z0 + t * z1
    ];
  };
}

function project(p) {
  var x = p[0],
    y = p[1],
    z = p[2];
  return [
    Math.atan2(y, x) * ρ,
    Math.acos(z / Math.sqrt(x * x + y * y + z * z)) * ρ-90
  ];
}

var edges = findEdges(vertices).map(function (e){
  return e.map(project);
});
console.log('#edges',edges.length);
