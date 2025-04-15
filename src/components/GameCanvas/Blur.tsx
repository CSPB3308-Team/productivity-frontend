import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Blur(props: any) {
  const { nodes } = useGLTF('/RoomFloor.glb')

  // create a material texture that emulates a blur effect
  function blurMat() {
    var new_mat = new THREE.MeshPhysicalMaterial( {
      color: 0xffffff,
      transmission: 1,
      opacity: 1,
      roughness: 0.5,
      // thickness: 0.1,
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

useGLTF.preload('/RoomWall.glb')
