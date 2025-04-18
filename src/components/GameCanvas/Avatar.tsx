import { useGLTF } from '@react-three/drei'

export function Avatar(props: any) {
  const { nodes } = useGLTF('/taskagotchi/Avatar.glb')
  
  return (
    <group {...props} name={"Avatar"} dispose={null}>
      <group position={[-0.198, 2.892, 0.826]} rotation={[0, 0, Math.PI]}>
        <primitive object={nodes.Spine} />
      </group>
    </group>
  );
}

useGLTF.preload('/taskagotchi/Capsule.glb')