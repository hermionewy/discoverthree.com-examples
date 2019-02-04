function setupControls( meshes, app ) {

  const orbitControls = app.controls;
  initOverlay( orbitControls );

  const highlightMaterial = new THREE.MeshStandardMaterial( {

    color: 0xcc0000,
    transparent: true,
    opacity: 0.5,

  } );

  // remember to convert the color to linear so that it looks correct
  // by the time it ends up on our screens!
  highlightMaterial.color.convertSRGBToLinear();

  const dragControls = new THREE.DragControls( meshes, app.camera, app.container );

  this.enabled = true;

  const setMoving = ( selectedMesh ) => {

    selectedMesh.material = highlightMaterial;

    meshes.forEach( ( mesh ) => {

      mesh.userData.animate = false;

    } );

    dragControls.enabled = true;
    orbitControls.enabled = false;

  };

  dragControls.addEventListener( 'hoveron', ( e ) => {

    setMoving( e.object );

  } );

  const reset = () => {

    meshes.forEach( ( mesh ) => {

      mesh.userData.animate = true;

      mesh.material = mesh.userData.material;

    } );

    dragControls.enabled = false;
    orbitControls.enabled = true;

  };

  dragControls.addEventListener( 'hoveroff', () => {

    setTimeout( reset(), 500 );

  } );


  dragControls.addEventListener( 'dragstart', ( e ) => {

    console.log( 'Started moving object' );

  } );

  dragControls.addEventListener( 'dragend', ( e ) => {

    console.log( 'Finished moving object' );

  } );

  dragControls.addEventListener( 'drag', ( e ) => {

    // fires continuously while moving object

  } );

}

function initOverlay( controls ) {

  controls.enabled = false;

  const overlay = document.querySelector( '#overlay' );

  overlay.addEventListener( 'click', () => {

    overlay.style.display = 'none';
    controls.enabled = true;

  } );

}