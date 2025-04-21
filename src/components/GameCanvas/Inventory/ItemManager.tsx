import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const skinTones = [0xfba49d, 0xfbcd91]

// Class to hold and manage data for all the customization items
// implemented as a singleton to prevent javascript / React from trying to run
// it multiple times with each render
export default class ItemManager {

  colors: Map<number, number>;

  private static instance: ItemManager;
  shirtModel!: THREE.Group;
  shoesModel!: THREE.Group;

  private constructor() {
    this.loadShirt();
    this.loadShoes();

    // Create a map linking item IDs to their material colors
    this.colors = new Map();
    this.colors.set(1, 0xfafafa);   // white shirt
    this.colors.set(2, 0xeb4034);   // red shirt
    this.colors.set(3, 0x42a1f5);   // blue shirt
    this.colors.set(4, 0x6ebf4e);   // green shirt
    this.colors.set(5, 0x262626);   // black shirt
    this.colors.set(6, 0x262626);   // ??? shirt  
    this.colors.set(7, 0x1a1a1a);   // black shoes
    this.colors.set(8, 0x8a0000);   // red shoes
    this.colors.set(9, 0x033dfc);   // blue shoes
    this.colors.set(10, 0x006602);  // green shoes
    this.colors.set(11, 0xfafafa);  // white shoes 
    this.colors.set(12, 0xa88732);  // gold shoes 
    this.colors.set(13, 0x396596);  
    this.colors.set(14, 0xa88732);
    this.colors.set(15, 0x088000);
    this.colors.set(16, 0x006aff);
    this.colors.set(17, 0x262626);
  }

  // ensures we only have one instance of the item manager at a time
  static getInstance() {
    if (!ItemManager.instance) {
      ItemManager.instance = new ItemManager();
    } else {
      return ItemManager.instance;
    }
  }

  // Load the shirt and shoes models asynchronously so that we don't get a bunch of 'undefined' when
  // trying to change it later
  private async loadShirt() {
    const loader = new GLTFLoader()
    const gltf = await loader.loadAsync('Shirt.glb');
    this.shirtModel = gltf.scene;
    this.shirtModel.name = 'ShirtBase';
  }

  private async loadShoes() {
    const loader = new GLTFLoader()
    const gltf = await loader.loadAsync('Shoes.glb');
    this.shoesModel = gltf.scene;
    this.shoesModel.name = 'ShoesBase';
  }

  public getShirtModel() {
    // returns a clone so we can modify the mesh elsewhere without affecting this instance
    return SkeletonUtils.clone(this.shirtModel);
  }

  public getShoesModel() {
    // returns a clone so we can modify the mesh elsewhere without affecting this instance
    return SkeletonUtils.clone(this.shoesModel);
  }

  public getSkinColor(skinID: number) {
    return skinTones[skinID];
  }

  public getItemColor(ID: number) {
    return this.colors.get(ID);
  }
}