
function init() {

  const app = new THREE_APP( '#container' );

  app.init();


  app.scene.background = new THREE.Color( 0x8FBCD4 );
  app.camera.position.set( 0, 1, 5 );

  setupRenderer( app.renderer );

  initMeshes( app.scene );
  loadModels( app.scene, app.loader );


  app.start();
}

init();