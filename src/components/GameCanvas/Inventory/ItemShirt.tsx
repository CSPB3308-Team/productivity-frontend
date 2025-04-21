import { useGLTF } from '@react-three/drei'

export function Avatar(props: any) {
  const { nodes } = useGLTF('/shirt.glb')
  
  return (
    <group {...props} name={"Shirt"} dispose={null}>
      <group rotation={[0, 0, Math.PI]}>
        <primitive object={nodes.Spine} />
      </group>
    </group>
  );
}

useGLTF.preload('/Capsule.glb')