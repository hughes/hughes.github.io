import{O as t,M as e,B as i,F as r,S as s,U as n,V as a,W as o,H as l,N as h,C as u,a as d,t as c,b as p,A as f,c as m,R as v,d as g,e as b,L as y,f as x,g as w,h as M,i as _,j as T,k as C,l as S,P as A,m as P,n as R,T as D,o as U,p as E,D as B,q as F,r as z,s as L,u as N}from"./three-oIhyaaCT.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const i of t)if("childList"===i.type)for(const t of i.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const O={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform float opacity;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\t\t\tgl_FragColor = opacity * texel;\n\n\n\t\t}"};class V{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const I=new t(-1,1,1,-1,0,1),k=new class extends i{constructor(){super(),this.setAttribute("position",new r([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new r([0,2,0,0,2,0],2))}};class W{constructor(t){this._mesh=new e(k,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,I)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class j extends V{constructor(t,e){super(),this.textureID=void 0!==e?e:"tDiffuse",t instanceof s?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=n.clone(t.uniforms),this.material=new s({name:void 0!==t.name?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new W(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Q extends V{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const r=t.getContext(),s=t.state;let n,a;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0),this.inverse?(n=0,a=1):(n=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,n,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class H extends V{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}var G="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function q(t){if(t.__esModule)return t;var e=t.default;if("function"==typeof e){var i=function t(){return this instanceof t?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};i.prototype=e.prototype}else i={};return Object.defineProperty(i,"__esModule",{value:!0}),Object.keys(t).forEach((function(e){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(i,e,r.get?r:{enumerable:!0,get:function(){return t[e]}})})),i}function K(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var X={exports:{}};const Y=q(c);var J,Z;J=X,Z=X.exports,function(){var t=void 0!==K,e=this.THREE||t&&Y;if(!e)throw new Error("MeshLine requires three.js");class i extends e.BufferGeometry{constructor(){super(),this.isMeshLine=!0,this.type="MeshLine",this.positions=[],this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[],this.counters=[],this._points=[],this._geom=null,this.widthCallback=null,this.matrixWorld=new e.Matrix4,Object.defineProperties(this,{geometry:{enumerable:!0,get:function(){return this}},geom:{enumerable:!0,get:function(){return this._geom},set:function(t){this.setGeometry(t,this.widthCallback)}},points:{enumerable:!0,get:function(){return this._points},set:function(t){this.setPoints(t,this.widthCallback)}}})}}function r(t,i){var r=new e.Matrix4,s=new e.Ray,n=new e.Sphere,a=new e.Vector3,o=this.geometry;if(o.boundingSphere||o.computeBoundingSphere(),n.copy(o.boundingSphere),n.applyMatrix4(this.matrixWorld),!1!==t.ray.intersectSphere(n,a)){r.copy(this.matrixWorld).invert(),s.copy(t.ray).applyMatrix4(r);var l=new e.Vector3,h=new e.Vector3,u=new e.Vector3,d=this instanceof e.LineSegments?2:1,c=o.index,p=o.attributes;if(null!==c)for(var f=c.array,m=p.position.array,v=p.width.array,g=0,b=f.length-1;g<b;g+=d){var y=f[g],x=f[g+1];l.fromArray(m,3*y),h.fromArray(m,3*x);var w=void 0!==v[Math.floor(g/3)]?v[Math.floor(g/3)]:1,M=t.params.Line.threshold+this.material.lineWidth*w/2,_=M*M;if(!(s.distanceSqToSegment(l,h,a,u)>_)){a.applyMatrix4(this.matrixWorld);var T=t.ray.origin.distanceTo(a);T<t.near||T>t.far||(i.push({distance:T,point:u.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this}),g=b)}}}}function s(t,e,i,r,s){var n;if(t=t.subarray||t.slice?t:t.buffer,i=i.subarray||i.slice?i:i.buffer,t=e?t.subarray?t.subarray(e,s&&e+s):t.slice(e,s&&e+s):t,i.set)i.set(t,r);else for(n=0;n<t.length;n++)i[n+r]=t[n];return i}i.prototype.setMatrixWorld=function(t){this.matrixWorld=t},i.prototype.setGeometry=function(t,e){this._geometry=t,this.setPoints(t.getAttribute("position").array,e)},i.prototype.setPoints=function(t,i){if(t instanceof Float32Array||t instanceof Array){if(this._points=t,this.widthCallback=i,this.positions=[],this.counters=[],t.length&&t[0]instanceof e.Vector3)for(var r=0;r<t.length;r++){var s=t[r],n=r/t.length;this.positions.push(s.x,s.y,s.z),this.positions.push(s.x,s.y,s.z),this.counters.push(n),this.counters.push(n)}else for(r=0;r<t.length;r+=3)n=r/t.length,this.positions.push(t[r],t[r+1],t[r+2]),this.positions.push(t[r],t[r+1],t[r+2]),this.counters.push(n),this.counters.push(n);this.process()}else console.error("ERROR: The BufferArray of points is not instancied correctly.")},i.prototype.raycast=r,i.prototype.compareV3=function(t,e){var i=6*t,r=6*e;return this.positions[i]===this.positions[r]&&this.positions[i+1]===this.positions[r+1]&&this.positions[i+2]===this.positions[r+2]},i.prototype.copyV3=function(t){var e=6*t;return[this.positions[e],this.positions[e+1],this.positions[e+2]]},i.prototype.process=function(){var t,i,r=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[],i=this.compareV3(0,r-1)?this.copyV3(r-2):this.copyV3(0),this.previous.push(i[0],i[1],i[2]),this.previous.push(i[0],i[1],i[2]);for(var s=0;s<r;s++){if(this.side.push(1),this.side.push(-1),t=this.widthCallback?this.widthCallback(s/(r-1)):1,this.width.push(t),this.width.push(t),this.uvs.push(s/(r-1),0),this.uvs.push(s/(r-1),1),s<r-1){i=this.copyV3(s),this.previous.push(i[0],i[1],i[2]),this.previous.push(i[0],i[1],i[2]);var n=2*s;this.indices_array.push(n,n+1,n+2),this.indices_array.push(n+2,n+1,n+3)}s>0&&(i=this.copyV3(s),this.next.push(i[0],i[1],i[2]),this.next.push(i[0],i[1],i[2]))}i=this.compareV3(r-1,0)?this.copyV3(1):this.copyV3(r-1),this.next.push(i[0],i[1],i[2]),this.next.push(i[0],i[1],i[2]),this._attributes&&this._attributes.position.count===this.positions.length?(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0):this._attributes={position:new e.BufferAttribute(new Float32Array(this.positions),3),previous:new e.BufferAttribute(new Float32Array(this.previous),3),next:new e.BufferAttribute(new Float32Array(this.next),3),side:new e.BufferAttribute(new Float32Array(this.side),1),width:new e.BufferAttribute(new Float32Array(this.width),1),uv:new e.BufferAttribute(new Float32Array(this.uvs),2),index:new e.BufferAttribute(new Uint16Array(this.indices_array),1),counters:new e.BufferAttribute(new Float32Array(this.counters),1)},this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()},i.prototype.advance=function(t){var e=this._attributes.position.array,i=this._attributes.previous.array,r=this._attributes.next.array,n=e.length;s(e,0,i,0,n),s(e,6,e,0,n-6),e[n-6]=t.x,e[n-5]=t.y,e[n-4]=t.z,e[n-3]=t.x,e[n-2]=t.y,e[n-1]=t.z,s(e,6,r,0,n-6),r[n-6]=t.x,r[n-5]=t.y,r[n-4]=t.z,r[n-3]=t.x,r[n-2]=t.y,r[n-1]=t.z,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0},e.ShaderChunk.meshline_vert=["",e.ShaderChunk.logdepthbuf_pars_vertex,e.ShaderChunk.fog_pars_vertex,"","attribute vec3 previous;","attribute vec3 next;","attribute float side;","attribute float width;","attribute float counters;","","uniform vec2 resolution;","uniform float lineWidth;","uniform vec3 color;","uniform float opacity;","uniform float sizeAttenuation;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","vec2 fix( vec4 i, float aspect ) {","","    vec2 res = i.xy / i.w;","    res.x *= aspect;","\t vCounters = counters;","    return res;","","}","","void main() {","","    float aspect = resolution.x / resolution.y;","","    vColor = vec4( color, opacity );","    vUV = uv;","","    mat4 m = projectionMatrix * modelViewMatrix;","    vec4 finalPosition = m * vec4( position, 1.0 );","    vec4 prevPos = m * vec4( previous, 1.0 );","    vec4 nextPos = m * vec4( next, 1.0 );","","    vec2 currentP = fix( finalPosition, aspect );","    vec2 prevP = fix( prevPos, aspect );","    vec2 nextP = fix( nextPos, aspect );","","    float w = lineWidth * width;","","    vec2 dir;","    if( nextP == currentP ) dir = normalize( currentP - prevP );","    else if( prevP == currentP ) dir = normalize( nextP - currentP );","    else {","        vec2 dir1 = normalize( currentP - prevP );","        vec2 dir2 = normalize( nextP - currentP );","        dir = normalize( dir1 + dir2 );","","        vec2 perp = vec2( -dir1.y, dir1.x );","        vec2 miter = vec2( -dir.y, dir.x );","        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );","","    }","","    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;","    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );","    normal.xy *= .5 * w;","    normal *= projectionMatrix;","    if( sizeAttenuation == 0. ) {","        normal.xy *= finalPosition.w;","        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;","    }","","    finalPosition.xy += normal.xy * side;","","    gl_Position = finalPosition;","",e.ShaderChunk.logdepthbuf_vertex,e.ShaderChunk.fog_vertex&&"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",e.ShaderChunk.fog_vertex,"}"].join("\n"),e.ShaderChunk.meshline_frag=["",e.ShaderChunk.fog_pars_fragment,e.ShaderChunk.logdepthbuf_pars_fragment,"","uniform sampler2D map;","uniform sampler2D alphaMap;","uniform float useMap;","uniform float useAlphaMap;","uniform float useDash;","uniform float dashArray;","uniform float dashOffset;","uniform float dashRatio;","uniform float visibility;","uniform float alphaTest;","uniform vec2 repeat;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","void main() {","",e.ShaderChunk.logdepthbuf_fragment,"","    vec4 c = vColor;","    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );","    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;","    if( c.a < alphaTest ) discard;","    if( useDash == 1. ){","        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));","    }","    gl_FragColor = c;","    gl_FragColor.a *= step(vCounters, visibility);","",e.ShaderChunk.fog_fragment,"}"].join("\n");class n extends e.ShaderMaterial{constructor(t){super({uniforms:Object.assign({},e.UniformsLib.fog,{lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new e.Color(16777215)},opacity:{value:1},resolution:{value:new e.Vector2(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new e.Vector2(1,1)}}),vertexShader:e.ShaderChunk.meshline_vert,fragmentShader:e.ShaderChunk.meshline_frag}),this.isMeshLineMaterial=!0,this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get:function(){return this.uniforms.lineWidth.value},set:function(t){this.uniforms.lineWidth.value=t}},map:{enumerable:!0,get:function(){return this.uniforms.map.value},set:function(t){this.uniforms.map.value=t}},useMap:{enumerable:!0,get:function(){return this.uniforms.useMap.value},set:function(t){this.uniforms.useMap.value=t}},alphaMap:{enumerable:!0,get:function(){return this.uniforms.alphaMap.value},set:function(t){this.uniforms.alphaMap.value=t}},useAlphaMap:{enumerable:!0,get:function(){return this.uniforms.useAlphaMap.value},set:function(t){this.uniforms.useAlphaMap.value=t}},color:{enumerable:!0,get:function(){return this.uniforms.color.value},set:function(t){this.uniforms.color.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},sizeAttenuation:{enumerable:!0,get:function(){return this.uniforms.sizeAttenuation.value},set:function(t){this.uniforms.sizeAttenuation.value=t}},dashArray:{enumerable:!0,get:function(){return this.uniforms.dashArray.value},set:function(t){this.uniforms.dashArray.value=t,this.useDash=0!==t?1:0}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},dashRatio:{enumerable:!0,get:function(){return this.uniforms.dashRatio.value},set:function(t){this.uniforms.dashRatio.value=t}},useDash:{enumerable:!0,get:function(){return this.uniforms.useDash.value},set:function(t){this.uniforms.useDash.value=t}},visibility:{enumerable:!0,get:function(){return this.uniforms.visibility.value},set:function(t){this.uniforms.visibility.value=t}},alphaTest:{enumerable:!0,get:function(){return this.uniforms.alphaTest.value},set:function(t){this.uniforms.alphaTest.value=t}},repeat:{enumerable:!0,get:function(){return this.uniforms.repeat.value},set:function(t){this.uniforms.repeat.value.copy(t)}}}),this.setValues(t)}}n.prototype.copy=function(t){return e.ShaderMaterial.prototype.copy.call(this,t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray.copy(t.dashArray),this.dashOffset.copy(t.dashOffset),this.dashRatio.copy(t.dashRatio),this.useDash=t.useDash,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this},J.exports&&(Z=J.exports={MeshLine:i,MeshLineMaterial:n,MeshLineRaycast:r}),Z.MeshLine=i,Z.MeshLineMaterial=n,Z.MeshLineRaycast=r}.call(G);var $=X.exports;const tt={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new d(0)},defaultOpacity:{value:0}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform vec3 defaultColor;\n\t\tuniform float defaultOpacity;\n\t\tuniform float luminosityThreshold;\n\t\tuniform float smoothWidth;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\n\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\n\n\t\t\tfloat v = dot( texel.xyz, luma );\n\n\t\t\tvec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n\t\t\tfloat alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n\t\t\tgl_FragColor = mix( outputColor, texel, alpha );\n\n\t\t}"};class et extends V{constructor(t,e,i,r){super(),this.strength=void 0!==e?e:1,this.radius=i,this.threshold=r,this.resolution=void 0!==t?new a(t.x,t.y):new a(256,256),this.clearColor=new d(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let h=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);this.renderTargetBright=new o(h,u,{type:l}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let s=0;s<this.nMips;s++){const t=new o(h,u,{type:l});t.texture.name="UnrealBloomPass.h"+s,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);const e=new o(h,u,{type:l});e.texture.name="UnrealBloomPass.v"+s,e.texture.generateMipmaps=!1,this.renderTargetsVertical.push(e),h=Math.round(h/2),u=Math.round(u/2)}const c=tt;this.highPassUniforms=n.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new s({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const v=[3,5,7,9,11];h=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);for(let s=0;s<this.nMips;s++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(v[s])),this.separableBlurMaterials[s].uniforms.invSize.value=new a(1/h,1/u),h=Math.round(h/2),u=Math.round(u/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.uniforms.bloomFactors.value=[1,.8,.6,.4,.2],this.bloomTintColors=[new p(1,1,1),new p(1,1,1),new p(1,1,1),new p(1,1,1),new p(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const g=O;this.copyUniforms=n.clone(g.uniforms),this.blendMaterial=new s({uniforms:this.copyUniforms,vertexShader:g.vertexShader,fragmentShader:g.fragmentShader,blending:f,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new d,this.oldClearAlpha=1,this.basic=new m,this.fsQuad=new W(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new a(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(t,e,i,r,s){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const n=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let o=0;o<this.nMips;o++)this.fsQuad.material=this.separableBlurMaterials[o],this.separableBlurMaterials[o].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[o].uniforms.direction.value=et.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[o]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[o].uniforms.colorTexture.value=this.renderTargetsHorizontal[o].texture,this.separableBlurMaterials[o].uniforms.direction.value=et.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[o]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[o];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=n}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new s({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new a(.5,.5)},direction:{value:new a(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:"varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",fragmentShader:"#include <common>\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 invSize;\n\t\t\t\tuniform vec2 direction;\n\t\t\t\tuniform float gaussianCoefficients[KERNEL_RADIUS];\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tfloat weightSum = gaussianCoefficients[0];\n\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;\n\t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {\n\t\t\t\t\t\tfloat x = float(i);\n\t\t\t\t\t\tfloat w = gaussianCoefficients[i];\n\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\n\t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;\n\t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;\n\t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;\n\t\t\t\t\t\tweightSum += 2.0 * w;\n\t\t\t\t\t}\n\t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\t\t\t\t}"})}getCompositeMaterial(t){return new s({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:"varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",fragmentShader:"varying vec2 vUv;\n\t\t\t\tuniform sampler2D blurTexture1;\n\t\t\t\tuniform sampler2D blurTexture2;\n\t\t\t\tuniform sampler2D blurTexture3;\n\t\t\t\tuniform sampler2D blurTexture4;\n\t\t\t\tuniform sampler2D blurTexture5;\n\t\t\t\tuniform float bloomStrength;\n\t\t\t\tuniform float bloomRadius;\n\t\t\t\tuniform float bloomFactors[NUM_MIPS];\n\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\n\n\t\t\t\tfloat lerpBloomFactor(const in float factor) {\n\t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\n\t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\n\t\t\t\t}"})}}et.BlurDirectionX=new a(1,0),et.BlurDirectionY=new a(0,1);const it={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:"\n\t\tprecision highp float;\n\n\t\tuniform mat4 modelViewMatrix;\n\t\tuniform mat4 projectionMatrix;\n\n\t\tattribute vec3 position;\n\t\tattribute vec2 uv;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\t\n\t\tprecision highp float;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\t#include <tonemapping_pars_fragment>\n\t\t#include <colorspace_pars_fragment>\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = texture2D( tDiffuse, vUv );\n\n\t\t\t// tone mapping\n\n\t\t\t#ifdef LINEAR_TONE_MAPPING\n\n\t\t\t\tgl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n\n\t\t\t#elif defined( REINHARD_TONE_MAPPING )\n\n\t\t\t\tgl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n\n\t\t\t#elif defined( CINEON_TONE_MAPPING )\n\n\t\t\t\tgl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );\n\n\t\t\t#elif defined( ACES_FILMIC_TONE_MAPPING )\n\n\t\t\t\tgl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n\n\t\t\t#elif defined( AGX_TONE_MAPPING )\n\n\t\t\t\tgl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n\n\t\t\t#elif defined( NEUTRAL_TONE_MAPPING )\n\n\t\t\t\tgl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n\n\t\t\t#endif\n\n\t\t\t// color space\n\n\t\t\t#ifdef SRGB_TRANSFER\n\n\t\t\t\tgl_FragColor = sRGBTransferOETF( gl_FragColor );\n\n\t\t\t#endif\n\n\t\t}"},rt=new C,st=window.innerWidth,nt=window.innerHeight,at=st/nt,ot=100,lt=new S({antialias:!0}),ht=new A(65,at,100,5e3),ut=new P;ut.add(ht),ht.position.z=400,lt.setClearColor(3368542,1),lt.setSize(st,nt),lt.outputColorSpace=R,lt.toneMapping=M,window.addEventListener("resize",(function(){ht.aspect=window.innerWidth/window.innerHeight,ht.updateProjectionMatrix(),lt.setSize(window.innerWidth,window.innerHeight),ct.width=window.innerWidth,ct.height=window.innerHeight}),!1),document.getElementById("container").appendChild(lt.domElement);const dt=new D,ct={time:{type:"f",value:0},texture1:{type:"t",value:dt.load("images/ocean_dist_resize.png")},noise:{type:"t",value:dt.load("images/Noise_003.jpg")},size:{type:"vec2",value:new a}};ct.texture1.value.wrapS=ct.texture1.value.wrapT=U,ct.noise.value.wrapS=ct.noise.value.wrapT=U,ct.noise.value.repeat.set(4,2);const pt=new et(new a(window.innerWidth,window.innerHeight),1.5,.4,.85);pt.threshold=.508,pt.strength=.861,pt.radius=.86,lt.toneMappingExposure=Math.pow(.9253,4);const ft=new class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),void 0===e){const i=t.getSize(new a);this._width=i.width,this._height=i.height,(e=new o(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:l})).texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new j(O),this.copyPass.material.blending=h,this.clock=new u}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);-1!==e&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){void 0===t&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const e=this.passes[r];if(!1!==e.enabled){if(e.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),e.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),e.needsSwap){if(i){const e=this.renderer.getContext(),i=this.renderer.state.buffers.stencil;i.setFunc(e.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),i.setFunc(e.EQUAL,1,4294967295)}this.swapBuffers()}void 0!==Q&&(e instanceof Q?i=!0:e instanceof H&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(void 0===t){const e=this.renderer.getSize(new a);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,(t=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}(lt),mt=new class extends V{constructor(t,e,i=null,r=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new d}render(t,e,i){const r=t.autoClear;let s,n;t.autoClear=!1,null!==this.overrideMaterial&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),null!==this.clearColor&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),null!==this.clearAlpha&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),1==this.clearDepth&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),!0===this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),null!==this.clearColor&&t.setClearColor(this._oldClearColor),null!==this.clearAlpha&&t.setClearAlpha(s),null!==this.overrideMaterial&&(this.scene.overrideMaterial=n),t.autoClear=r}}(ut,ht),vt=new class extends V{constructor(){super();const t=it;this.uniforms=n.clone(t.uniforms),this.material=new v({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new W(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,this._outputColorSpace===t.outputColorSpace&&this._toneMapping===t.toneMapping||(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},g.getTransfer(this._outputColorSpace)===b&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===y?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===x?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===w?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===M?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===_?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===T&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),!0===this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};function gt(t,e=0){const i=[];for(let r=0;r<=257;r++){const s=r/256*Math.PI*2;i.push(Math.sin(s)*t,Math.cos(s)*t,e)}return i}var bt,yt,xt;ft.addPass(mt),ft.addPass(pt),ft.addPass(vt),bt=function(t,i){const r=new E(ot,256,128),n=new s({uniforms:ct,vertexShader:t,fragmentShader:i,transparent:!0,side:B}),a=new e(r,n);ut.add(a);const o=gt(120),l=new $.MeshLine;l.setPoints(o);const h=new $.MeshLineMaterial({color:12764337,dashArray:.025,dashRatio:.5,transparent:!0,lineWidth:1.5}),u=new e(l,h);ut.add(u);const d=gt(1.035*ot),c=new $.MeshLine;c.setPoints(d);const p=new $.MeshLineMaterial({color:7455415,lineWidth:2.5}),f=new e(c,p);f.position.z+=.1,ut.add(f);const v=new $.MeshLineMaterial({color:696195,lineWidth:5});ut.add(new e(c,v));const g=new E(ot/15,64,32),b=new m({color:16755327,transparent:!0,opacity:.25});b.blending=F,b.blendEquation=z,b.blendSrc=L,b.blendDst=N;const y=new e(g,b),x=34*Math.PI/180,w=-118.4*Math.PI/180;y.position.x=Math.sin(w+Math.PI/2)*ot*Math.cos(x),y.position.z=Math.cos(w+Math.PI/2)*ot*Math.cos(x),y.position.y=ot*Math.sin(x),a.add(y);const M=new Date;requestAnimationFrame((function t(){!function(){const t=(new Date-M)/1e3;ct.time.value=t,lt.getSize(ct.size.value),a.rotation.y=-.3*t,a.rotation.x=.2,u.rotation.z=.03*t}(),ft.render(),requestAnimationFrame(t)}))},rt.load("shaders/world.vert",(function(t){rt.load("shaders/world.frag",(function(e){bt(t,e)}),yt,xt)}),yt,xt);