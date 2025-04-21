import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Blur(props: any) {
  const { nodes } = useGLTF('/productivity-frontend/RoomFloor.glb')

  // create a material texture that emulates a blur effect
  function blurMat() {
    var new_mat = new THREE.MeshPhysicalMaterial( {
      color: 0x8cd3ff,
      transmission: 0.2,
      reflectivity: 1,
      metalness: 0.6,
      roughness: 1,
      thickness: 10,
      transparent: true
    } );
    return new_mat;
  }

  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes.Plane as THREE.Mesh).geometry}
        material={blurMat()}
        scale={5}>
      </mesh>
    </group>
  )
}

useGLTF.preload('/productivity-frontend/RoomFloor.glb')
