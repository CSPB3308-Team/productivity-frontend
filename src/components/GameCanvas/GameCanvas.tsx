import * as THREE from 'three'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import styles from './GameCanvas.module.css';
import { Avatar } from './Avatar';
import { RoomFloor } from './RoomFloor';
import { CanvasCamera } from './CanvasCamera';
import { RoomWall } from './RoomWall';

export default function GameCanvas(){

  var devMode = true; 

  const CAM_FOV = 25;   // Camera field of view angle (degrees
  const CAM_POS_Y = 35; // Camera Y position
  const CAM_POS_Z = 3;  // Camera Z position
  const AV_ROT = 30;    // Avatar rotation (degrees) 

  const [camFov, setCamFov] = useState(CAM_FOV);
  const [camY, setCamY] = useState(CAM_POS_Y);
  const [camZ, setCamZ] = useState(CAM_POS_Z);
  const [tempZ, setTempZ] = useState(CAM_POS_Z);

  // Testing changing the color / opacity of an object
  const colorChange = (event: any) => {
    var new_mat = event.object.material.clone();
    new_mat.color.setHex(0xA3C197);
    new_mat.transparent=true; // transparent must be "true" for opacity to do anything
    new_mat.opacity=Number(!event.object.material.opacity); // switches opacity between 0 and 1
    event.object.material = new_mat;
    event.object.needs_update = true;
  }

  // Camera: field of view input box
  function fovBox() {
    return (
      <label>
        FOV: <input id="fovCam" name="myInput" defaultValue={camFov} 
          onKeyDown={event => {
            if (event.key === 'Enter') {
              setCamFov(Number((event.target as HTMLInputElement).value));
            }}}
        />
      </label>
    )
  }

  function ySlide() {
    return(
      <label>
        Y POS: <input type="range" min="0" max="80" id="yCamS" name="slideY" value={camY}
          onChange={(event) => {
            setCamY(Number(event.target.value))}}
          />
      </label>
    );
  }

  // Camera: Y position input box
  function yBox() {
    return (
      <input id="yCamB" name="boxY" value ={camY} 
          onKeyDown={event => {
            if (event.key === 'Enter') {
              setCamY(Number((event.target as HTMLInputElement).value));
            }}}
        />
    )
  }

  // Camera: Z position slider
  // if we want the box to update when the slider is changed, we need to use a temp 
  // variable for the "value" property
  function zSlide() {
    return(
      <label>
        Z POS: <input type="range" min="0" max="50"id="zCam" name="myInputZ" value={tempZ}
          onChange={(event) => {
            setCamZ(Number(event.target.value));
            setTempZ(Number(event.target.value));
            }
          }/>
      </label>
    );
  }

  // Camera: Z position input box
  function zBox() {
    return (      
      <input id="zCam" name="myInputZ" value={tempZ}
        onChange={(event) => {setTempZ(Number(event.target.value));}}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            setCamZ(Number((event.target as HTMLInputElement).value));
          }
        }}/>
    )
  }

  return (
    <div className={styles.gameCanvas}>
      {devMode ? fovBox() : null}
      {devMode ? ySlide() : null}{devMode ? yBox() : null}
      {devMode ? zSlide() : null}{devMode ? zBox() : null}
      {/* {comp()} */}
      <Canvas camera={{position: [0, camY, camZ]}}>
        <ambientLight intensity={Math.PI/1.5} />
        <spotLight position={[0, 10, 0]} angle={0.75} penumbra={1} decay={0} intensity={Math.PI} />
        <spotLight position={[0, 20, 10]} angle={0.5} penumbra={1} decay={0} intensity={Math.PI/2} />
        {/* <pointLight position={[-10, -10, -10]} decay={10} intensity={Math.PI} /> */}

        <CanvasCamera camFov={camFov} camY={camY} camZ={camZ}/>

        <RoomFloor />
        <RoomWall onClick={(e: any) => colorChange(e)} position={[0, 0, -5]} material={new THREE.MeshBasicMaterial({})} />
        <RoomWall onClick={(e: any) => colorChange(e)} position={[-5, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} />
        <RoomWall onClick={(e: any) => colorChange(e)} position={[5, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(-90), 0]} />
        <RoomWall onClick={(e: any) => colorChange(e)} position={[0, 0, 5]} />
        <Avatar position={[0, 0.6, 0]} rotation={[THREE.MathUtils.degToRad(-AV_ROT), 0, 0]} scale={[0.33, 0.33, 0.33]}/>
      </Canvas>
    </div>
  )
}
