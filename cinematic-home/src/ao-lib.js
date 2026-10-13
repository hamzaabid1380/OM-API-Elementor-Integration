import {
	Color, WebGLRenderTarget, LinearFilter, NearestFilter, HalfFloatType, RGBAFormat, DepthTexture,
	UnsignedInt248Type, UnsignedIntType, DepthStencilFormat, DepthFormat, Matrix4, DataTexture,
	ShaderMaterial, NoColorSpace, RepeatWrapping, Vector2, REVISION, RedFormat, FloatType, GLSL3,
	Vector3, Sphere, BufferAttribute, BufferGeometry, Float32BufferAttribute, OrthographicCamera, Mesh,
} from 'three';
import { Pass } from 'postprocessing';

/**
 * The parts of three.js and postprocessing that the contact-shadow add-on
 * (wulf-film-ao.js, built from ao.js) borrows from the main film script, so
 * it does not carry a second copy of them. Keep in step with the imports of
 * n8ao's dist/N8AO.js and three's examples/jsm/postprocessing/Pass.js.
 */
export const AO_LIB = {
	THREE: {
		Color, WebGLRenderTarget, LinearFilter, NearestFilter, HalfFloatType, RGBAFormat, DepthTexture,
		UnsignedInt248Type, UnsignedIntType, DepthStencilFormat, DepthFormat, Matrix4, DataTexture,
		ShaderMaterial, NoColorSpace, RepeatWrapping, Vector2, REVISION, RedFormat, FloatType, GLSL3,
		Vector3, Sphere, BufferAttribute, BufferGeometry, Float32BufferAttribute, OrthographicCamera, Mesh,
	},
	PP: { Pass },
};
