import {
  Color,
} from './vendor/three/three.module.js';

import App from './vendor/App.module.js';

import createLights from './lights.js';
import createMeshes from './meshes.js';

import setupPostProcessing from './postProcessing.js';

function initScene() {

  const app = new App( '#scene-container' );

  // this should be fault for post processing
  // app.gammaOutput = false;

  app.init();

  app.renderer.toneMappingExposure = 1;
  app.scene.background = new Color( 0x8FBCD4 );
  app.camera.position.set( 3, 5, 6 );

  app.start();

  const composer = setupPostProcessing( app.renderer, app.scene, app.camera );

  // We'll need to add an onResize function.
  // The app will take of updating the renderer's size and pizel ratio for us,
  // so we just to take these and calculate the new size for the composer
  app.onResize = () => {

    const pixelRatio = app.renderer.getPixelRatio();
    const size = app.renderer.getSize();

    const newWidth = Math.floor( size.width * pixelRatio ) || 1;
    const newHeight = Math.floor( size.height * pixelRatio ) || 1;
    composer.setSize( newWidth, newHeight );

  };

  const lights = createLights();
  app.scene.add( lights.ambient, lights.main );

  const meshes = createMeshes();
  app.scene.add( meshes.box );

  // overwrite the app's default render function to use the
  // EffectComposer instead
  app.render = () => {

    // render using the composer instead of the app.renderer
    composer.render();

  };

}

initScene();
