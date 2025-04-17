import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Avatar(props: any) {
  const { nodes, materials } = useGLTF('/Avatar.glb')
  
  return (
    <group {...props} name={"Avatar"} dispose={null}>
      <group position={[-0.198, 2.892, 0.826]} rotation={[0, 0, Math.PI]}>
        <primitive object={nodes.Spine} />
      </group>
    </group>
  );
}

useGLTF.preload('/Capsule.glb')