
import * as THREE from 'three'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

import { useThree } from '@react-three/fiber';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

import ItemManager from './ItemManager';
import AvatarManager from '../AvatarManager';

interface PreviewData {
  doDress: boolean;
  itemManager: ItemManager;
  avatarManager: AvatarManager;
  cloneManager: AvatarManager | null;
  setCloneManager: Dispatch<SetStateAction<AvatarManager | null>>;
}

const AV_SCALE = 0.1;
const AV_POS_X = 1.1;   // X offset from camera
const AV_POS_Y = -0.3;  // Y offset from camera
const AV_POS_Z = -7;    // Z offset from camera

export default function InventoryPreview(input: PreviewData) {

  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera)
  const [isRendered, setIsRendered] = useState(false);
  var isLoaded = useRef(false);

  // it's way more obtuse trying to do this through fiber, so I'm just using basic Three.js
  function startDresUp() {
    // Prevent re-drawing everything when state changes
    if (isRendered == false) {
      // Need to clone the model, rather than creating a new one, because the animation 
      // skeleton is shared for all instances for some reason
      const av = scene.getObjectByName("Avatar");

      const av_c = SkeletonUtils.clone(av as THREE.Group);
      av_c.name = "AvatarDressUp";

      // Load an instance of the avatar manager for the clone
      // we avoid storing it in state until the end, becuase there's no guarantee that
      // the state will be set before the rest of the code runs
      const cm = new AvatarManager(av_c as THREE.Group, input.itemManager)

      // Make the clone smaller to avoid clipping the blur filter plane
      av_c.scale.set(AV_SCALE, AV_SCALE, AV_SCALE);

      // Offset clone's position so it's well-framed for dressing up
      // create a vector to hold the clone's distance from the camera
      let avPos = new THREE.Vector3(AV_POS_X, AV_POS_Y, AV_POS_Z);

      // convert the local displacement to the world reference frame
      camera.localToWorld(avPos);

      // apply the resulting vector to the model
      av_c.position.x = avPos.x;
      av_c.position.y = avPos.y;
      av_c.position.z = avPos.z;

      // Match the clone's rotation to the camera's rotation
      let camQuat = new THREE.Quaternion();
      camera.getWorldQuaternion(camQuat);
      av_c.applyQuaternion(camQuat);

      // set the initial clothing color from the original's data  
      // TODO: get this from input data  
      cm.setShirt(input.avatarManager.getShirt());
      cm.setShoes(input.avatarManager.getShoes());
      cm.setPants(input.avatarManager.getPants());

      // set the manager after we're done to avoid dealing with asynchronous state updates
      input.setCloneManager(cm);

      // then tweak the rotation for a better view of the model
      // because these are roations about the local axis, the order matters!
      av_c.rotateZ(THREE.MathUtils.degToRad(-30));
      av_c.rotateY(THREE.MathUtils.degToRad(-30));

      // Add the clone to the scene
      scene.add(av_c);

      // Add two lights to shine on the model so we can actually see it well
      const dressLight1 = new THREE.SpotLight(0xffffff)
      dressLight1.name = "DressLight1";

      dressLight1.castShadow = false;
      dressLight1.angle = 1;
      dressLight1.distance = 30;
      dressLight1.intensity = 1;
      dressLight1.decay = 0;

      // Set the light's offset relative to the camera/clone
      let lightPos1 = new THREE.Vector3(10, -5, 5);
      camera.localToWorld(lightPos1);

      dressLight1.position.x = lightPos1.x;
      dressLight1.position.y = lightPos1.y;
      dressLight1.position.z = lightPos1.z;

      // tell the light to point at the clone
      dressLight1.target = av_c;
      scene.add(dressLight1);

      // Light #2
      const dressLight2 = new THREE.SpotLight(0xffffff)
      dressLight2.name = "DressLight2";

      dressLight2.castShadow = false;
      dressLight2.angle = 1;
      dressLight2.distance = 30;
      dressLight2.intensity = 0.2;
      dressLight2.decay = 0;

      let lightPos2 = new THREE.Vector3(-10, 5, 5);
      camera.localToWorld(lightPos2);

      dressLight2.position.x = lightPos2.x;
      dressLight2.position.y = lightPos2.y;
      dressLight2.position.z = lightPos2.z;

      dressLight1.target = av_c;
      scene.add(dressLight2);

      setIsRendered(true);
    }
  }

  // Removes the model and lights when inventory closes
  function cleanUp() {
    const av_c = scene.getObjectByName("AvatarDressUp");
    const dressLight1 = scene.getObjectByName("DressLight1");
    const dressLight2 = scene.getObjectByName("DressLight2");

    if (av_c) {
      scene.remove(av_c);
    }

    if (dressLight1) {
      scene.remove(dressLight1);
    }

    if (dressLight2) {
      scene.remove(dressLight2);
    }

    setIsRendered(false);

    // Should we clear the cloneManager state??
    input.setCloneManager(null);
    isLoaded.current = false;
  }

  function drawPreview() {
    if (isRendered == false && input.doDress == true) {
      startDresUp();
    } else if (isRendered == true && input.doDress == false) {
      cleanUp();
    }
  }

  // TODO: make blur filter load first
  return (
    <>
      {drawPreview()}
    </>
  )
}