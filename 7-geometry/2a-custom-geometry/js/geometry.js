function createGeometry() {

  const geometry = new THREE.Geometry();

  geometry.vertices.push(
    new THREE.Vector3( -1, 1, 0 ), // vertex 0
    new THREE.Vector3( -1, -1, 0 ), // vertex 1
    new THREE.Vector3( 1, -1, 0 ), // vertex 2
  );

  // create a face made up of 3 vertices. Faces are always triangles
  // The face references the vertices by their position in
  // the geometry.vertices array
  geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

  // vertices can be in more than one face
  // uncomment this line to add a second face in the same
  // position as the first, but facing the opposite direction
  // geometry.faces.push( new THREE.Face3( 2, 1, 0 ) );

  // the face's normal is initialzed as (0, 0, 0)
  // either set it manually, or use this function to calculate
  // smooth normals automatically
  geometry.computeFaceNormals();

  // we can also compute one normal per vertex instead of per face
  // this is the style used by BufferGeometry, so if you need
  // maximum control over the conversion you can calculate these first
  geometry.computeVertexNormals();

  console.log( 'Here\'s the geometry you just created: ', geometry );

  const bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );

  console.log( '... and here\'s what it looks like after being converted to a BufferGeometry: ', bufferGeometry );

  // never use a Geometry directly, always convert it to a BufferGeometry first
  return bufferGeometry;

}
