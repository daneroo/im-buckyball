# im-buckyball

Describe geometry, and eventually produce an agular directive containing d3.js code to produce a trucated icosahedron, a.k.a buckyball, soccer ball

## TODO
* encapsulate `pre-calculate`
* simplify executable (buckyball.js)
* convert to gist, and post to mbostock's http://bl.ocks.org/
* Make an angular directive `ng-buckyball`. Review [this youtube talk on Angular with D3 ](http://www.youtube.com/watch?v=aqHBLS_6gF8).

## Geometry
* Icosahedron - truncated icosahedron
* `projection = d3.geo.azimuthal().mode("orthographic")`
* Spherical clipping: `path(circle.clip(d));`

## Precalculate 
* figuring out `pentify`

## Changes
Trying to evolve `icosahedron-3055104.html` turned out to be a dend end.

Started from `icosahedron-arcs-3061181.html` to get the sperical projection and clipping, and re-did the geometry from scratch, math was tested in `precaclulate.js`

## References

* [Wikipedia Trucated Icosahedron](http://en.wikipedia.org/wiki/Truncated_icosahedron)
* [D3 icosahedron](http://bl.ocks.org/mbostock/3055104)
* [D3 icosahedron great arcs](http://bl.ocks.org/mbostock/3061181)
* [D3 icosahedron (hidden face elim?)](http://bl.ocks.org/mbostock/7782500)
* [WebGL icosahedron + subdiv](http://oos.moxiecode.com/js_webgl/icosahedron/index.html)
* [WebGL truncated icosahedron](http://www.ibiblio.org/e-notes/webgl/polyhedra/tr_icosahedron.html)
* [CSS3 Dodecahedron](http://themaninblue.com/experiment/dodecahedron/)
* [bucky ball intro article](http://www.goldennumber.net/bucky-balls/)