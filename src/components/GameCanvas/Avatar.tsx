import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'  

export function Avatar(props: any) {
  const { nodes, materials } = useGLTF('/Capsule.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={(nodes.Mball001 as THREE.Mesh).geometry}
        material={(nodes.Mball001 as THREE.Mesh).material}
      />
    </group>
  );
}

useGLTF.preload('/Capsule.glb')