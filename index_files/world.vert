// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms
uniform mat3 _normalMatrix; uniform mat4 _viewMatrix; uniform float _time;
// attributes

// varys
varying vec3 nodeVary0; varying vec3 nodeVary1; varying vec2 nodeVary2; varying vec3 nodeVary3;
// vars
vec3 nodeVar0; vec4 nodeVar1; vec4 nodeVar2; vec3 nodeVar3; vec3 nodeVar4; float nodeVar5; float nodeVar6; float nodeVar7; float nodeVar8; float nodeVar9; float nodeVar10; float nodeVar11; float nodeVar12; float nodeVar13; float nodeVar14; float nodeVar15; float nodeVar16; float nodeVar17; float nodeVar18; float nodeVar19; float nodeVar20; float nodeVar21; vec3 nodeVar22;
// codes

// variables
// </node_builder>







#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
nodeVary1 = normal;
	nodeVar0 = ( _normalMatrix * nodeVary1 );
	nodeVar1 = ( vec4( nodeVar0, 0.0 ) );
	nodeVar2 = ( nodeVar1 * _viewMatrix );
	nodeVar3 = normalize( nodeVar2.xyz );
	nodeVar4 = nodeVar3;
	nodeVary0 = nodeVar4;
	nodeVary2 = uv;
	nodeVary3 = position;



	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
nodeVar5 = ( position.y * 61.61 );
	nodeVar6 = ( _time * 1.0 );
	nodeVar7 = nodeVar6;
	nodeVar8 = ( nodeVar7 * 67.76 );
	nodeVar9 = ( nodeVar5 + nodeVar8 );
	nodeVar10 = sin( nodeVar9 );
	nodeVar11 = ( 0.005 * 0.24 );
	nodeVar12 = fract( nodeVar7 );
	nodeVar13 = ( nodeVar7 - nodeVar12 );
	nodeVar14 = (mix(0.0, 1.0, fract(sin(dot(vec2( nodeVar13 ), vec2(12.9898, 78.233)))*43758.5453)));

	nodeVar15 = ( nodeVar7 * nodeVar14 );
	nodeVar16 = sin( nodeVar15 );
	nodeVar17 = abs( nodeVar16 );
	nodeVar18 = (pow(nodeVar17,1000.0));
	nodeVar19 = ( nodeVar18 * 0.01 );
	nodeVar20 = ( nodeVar11 + nodeVar19 );
	nodeVar21 = ( nodeVar10 * nodeVar20 );
	nodeVar22 = ( vec3( nodeVar21 ) * vec3( 1, 0, 0 ) );

	transformed = position + nodeVar22;

	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}


