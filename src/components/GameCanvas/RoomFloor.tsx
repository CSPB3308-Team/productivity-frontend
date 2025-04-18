import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'  

export function RoomFloor(props: any) {
  const { nodes, materials } = useGLTF('/taskagotchi/RoomFloor.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Plane as THREE.Mesh).geometry}
        material={materials.Material}
      />
    </group>
  )
}

useGLTF.preload('/taskagotchi/RoomFloor.glb')
