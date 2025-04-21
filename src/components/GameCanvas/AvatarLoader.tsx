import * as THREE from 'three'
import { useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import AvatarManager from './AvatarManager';
import ItemManager from './Inventory/ItemManager';
import { Dispatch, SetStateAction, useEffect, useRef} from 'react';

interface avLoad {
  itemManager: ItemManager;
  setAvatarManager: Dispatch<SetStateAction<AvatarManager | null>>;
}

// This needs to be a component because we need to access the scene state, which only
// works with components contained within the canvas
export default function AvatarLoader(input: avLoad) {
  const scene = useThree((state) => state.scene);
  const AV_POS = [0.0, 0.02, 0];  // Avatar position
  const AV_ROT = [-20, -90, 0];    // Avatar rotation (degrees)
  const AV_SCALE = 0.2;           // Avatar scale 

  const avLoaded = useRef(false);
  const avLoading = useRef(false);
  var av: THREE.Group;
  var avManager: AvatarManager;

  // Load the model once when this component is csalled 
  useEffect(() => {
    async function loadAvatar() {
      if (avLoaded.current == false && avLoading.current == false) {
        avLoading.current = true; // set this first to prevent re-runs

        const loader = new GLTFLoader()
        const gltf = await loader.loadAsync('Avatar.glb');
        av = gltf.scene;
        av.name = 'Avatar';

        av.position.x = AV_POS[0];
        av.position.y = AV_POS[1];
        av.position.z = AV_POS[2];

        av.rotation.x = THREE.MathUtils.degToRad(AV_ROT[0]);
        av.rotation.y = THREE.MathUtils.degToRad(AV_ROT[1]);
        av.rotation.z = THREE.MathUtils.degToRad(AV_ROT[2]);

        av.scale.set(AV_SCALE, AV_SCALE, AV_SCALE);

        scene.add(av);

        // Once the avatar model is loaded, we can call the manager function and pass the avatar manager back 
        avManager = new AvatarManager(av as THREE.Group, input.itemManager);
        avManager.setShirt(1);
        avManager.setShoes(7);
        avManager.setPants(13);
        input.setAvatarManager(avManager);

        avLoaded.current = true;
      }
    }
    loadAvatar();
  }, [])

  return (
    <>
    </>
  )
}
