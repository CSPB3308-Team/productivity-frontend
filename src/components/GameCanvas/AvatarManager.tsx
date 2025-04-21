import * as THREE from 'three';
import ItemManager from './Inventory/ItemManager';

export default class AvatarManager {
  boneArmL: THREE.Bone;
  boneArmR: THREE.Bone;
  boneLegL: THREE.Bone;
  boneLegR: THREE.Bone;
  boneTorso: THREE.Bone;
  boneHead: THREE.Bone;

  meshArmL: THREE.Mesh;
  meshArmR: THREE.Mesh;
  meshLegL: THREE.Mesh;
  meshLegR: THREE.Mesh;
  meshTorso: THREE.Mesh;
  meshNeck: THREE.Mesh;
  meshHead: THREE.Mesh;

  itemManager: ItemManager;

  meshShirtTorso: THREE.Mesh | null;
  meshShirtArmL: THREE.Mesh | null;
  meshShirtArmR: THREE.Mesh | null;
  shirtOn: boolean;

  meshShoesL: THREE.Mesh | null;
  meshShoesR: THREE.Mesh | null;

  skinMat: THREE.MeshPhongMaterial;
  shirtMat: THREE.MeshPhongMaterial;
  shoesMat: THREE.MeshPhongMaterial;
  pantsMat: THREE.MeshPhongMaterial;

  shirtID: number;
  pantsID: number;
  shoesID: number;

  constructor(avatar: THREE.Group, iMan: ItemManager) {
    this.boneArmL = avatar.getObjectByName("ArmL") as THREE.Bone;
    this.boneArmR = avatar.getObjectByName("ArmR") as THREE.Bone;
    this.boneLegL = avatar.getObjectByName("LegL") as THREE.Bone;
    this.boneLegR = avatar.getObjectByName("LegR") as THREE.Bone;
    this.boneTorso = avatar.getObjectByName("Spine") as THREE.Bone;
    this.boneHead = avatar.getObjectByName("Head") as THREE.Bone;

    // get and store all the avatar's important meshes
    this.meshArmL = avatar.getObjectByName("AvatarArmL") as THREE.Mesh;
    this.meshArmR = avatar.getObjectByName("AvatarArmR") as THREE.Mesh;
    this.meshLegL = avatar.getObjectByName("AvatarLegL") as THREE.Mesh;
    this.meshLegR = avatar.getObjectByName("AvatarLegR") as THREE.Mesh;
    this.meshTorso = avatar.getObjectByName("AvatarBody") as THREE.Mesh;
    this.meshNeck = avatar.getObjectByName("AvatarNeck") as THREE.Mesh;
    this.meshHead = avatar.getObjectByName("AvatarHead") as THREE.Mesh;

    this.itemManager = iMan;

    this.meshShirtTorso = null;
    this.meshShirtArmL = null;
    this.meshShirtArmR = null;
    this.shirtOn = false;

    this.meshShoesL = null;
    this.meshShoesR = null;

    this.skinMat = new THREE.MeshPhongMaterial();
    this.shirtMat = new THREE.MeshPhongMaterial();
    this.shoesMat = new THREE.MeshPhongMaterial();
    this.pantsMat = new THREE.MeshPhongMaterial();

    // default item IDs
    this.shirtID = 1;
    this.shoesID = 7;
    this.pantsID = 13;

    this.loadShirt();
    this.loadShoes();
  }

  private loadShirt() {
    // load the shirt model
    let shirt = this.itemManager.getShirtModel();

    // find the meshes and store them with this manager
    this.meshShirtArmL = shirt.getObjectByName("ShirtArmL") as THREE.Mesh;
    this.meshShirtArmR = shirt.getObjectByName("ShirtArmR") as THREE.Mesh;
    this.meshShirtTorso = shirt.getObjectByName("ShirtBody") as THREE.Mesh;

    // parent the meshes to their respective bones
    this.boneArmL.add(this.meshShirtArmL);
    this.boneArmR.add(this.meshShirtArmR);
    this.boneTorso.add(this.meshShirtTorso);

    this.meshShirtArmL.visible = false;
    this.meshShirtArmR.visible = false;
    this.meshShirtTorso.visible = false;
  }

  public setShirt(ID: number) {
    this.shirtID = ID;
    let shirtColor = this.itemManager.getItemColor(ID);

    if (shirtColor) {
      // hide the normal torso, since we're using the shirt's mesh
      this.meshTorso.visible = false;

      this.shirtMat.color.setHex(shirtColor);

      // probably a better way to do this, but it makes TypeScript happy, so...
      if (this.meshShirtArmL) {
        this.meshShirtArmL.material = this.shirtMat;
        this.meshShirtArmL.visible = true;
      }
      if (this.meshShirtArmR) {
        this.meshShirtArmR.material = this.shirtMat;
        this.meshShirtArmR.visible = true;
      }
      if (this.meshShirtTorso) {
        this.meshShirtTorso.material = this.shirtMat;
        this.meshShirtTorso.visible = true;
      }

      this.shirtOn = true;
    } else {
      throw new Error("Could not find item ID: " + String(ID));
    }

  }

  public getShirt() {
    return this.shirtID;
  }

  private loadShoes() {
    // load the shoe models
    let shoes = this.itemManager.getShoesModel();

    // find the meshes and store them with this manager
    this.meshShoesL = shoes.getObjectByName("ShoeL") as THREE.Mesh;
    this.meshShoesR = shoes.getObjectByName("ShoeR") as THREE.Mesh;

    // parent the meshes to their respective bones
    this.boneLegL.add(this.meshShoesL);
    this.boneLegR.add(this.meshShoesR);

    this.meshShoesL.visible = false;
    this.meshShoesR.visible = false;
  }

  public setShoes(ID: number) {
    this.shoesID = ID;
    let shoesColor = this.itemManager.getItemColor(ID);

    if (shoesColor) {
      this.shoesMat.color.setHex(shoesColor);

      // probably a better way to do this, but it makes TypeScript happy, so...
      if (this.meshShoesL) {
        this.meshShoesL.material = this.shoesMat;
        this.meshShoesL.visible = true;
      }
      if (this.meshShoesR) {
        this.meshShoesR.material = this.shoesMat;
        this.meshShoesR.visible = true;
      }

    } else {
      throw new Error("Could not find item ID: " + String(ID));
    }
  }

  public getShoes() {
    return this.shoesID;
  }

  public setPants(ID: number) {
    this.pantsID = ID;
    let pantsColor = this.itemManager.getItemColor(ID);

    if (pantsColor) {
      this.pantsMat.color.setHex(pantsColor);

      if (this.meshLegL) {
        this.meshLegL.material = this.pantsMat;
      }
      if (this.meshLegR) {
        this.meshLegR.material = this.pantsMat;
      }
    } else {
      throw new Error("Could not find item ID: " + String(ID));
    }

  }

  public getPants() {
    return this.pantsID;
  }

  public hideShirt() {
    if (this.meshShirtTorso && this.shirtOn) {
      this.meshTorso.visible = true;
      this.meshShirtTorso.visible = false;
      this.shirtOn = false;
    }
  }

  public setSkin(skinMat: THREE.Material) {
    this.meshArmL.material = skinMat;
    this.meshArmR.material = skinMat;
    this.meshLegL.material = skinMat;
    this.meshLegR.material = skinMat;
    this.meshTorso.material = skinMat;
    this.meshNeck.material = skinMat;
    this.meshHead.material = skinMat;
  }

  // bone getters
  public getArmBoneL(): THREE.Bone {
    return this.boneArmL;
  }

  public getArmBoneR(): THREE.Bone {
    return this.boneArmR;
  }

  public getLegBoneL(): THREE.Bone {
    return this.boneLegL;
  }

  public getLegBoneR(): THREE.Bone {
    return this.boneLegR;
  }

  public getTorsoBone(): THREE.Bone {
    return this.boneTorso;
  }

  public getHeadBone(): THREE.Bone {
    return this.boneHead;
  }

  // mesh getters
  public getArmMeshL(): THREE.Mesh {
    return this.meshArmL;
  }

  public getArmMeshR(): THREE.Mesh {
    return this.meshArmR;
  }

  public getLegMeshL(): THREE.Mesh {
    return this.meshLegL;
  }

  public getLegMeshR(): THREE.Mesh {
    return this.meshLegR;
  }

  public getTorsoMesh(): THREE.Mesh {
    return this.meshTorso;
  }

  public getHeadMesh(): THREE.Mesh {
    return this.meshHead;
  }
}