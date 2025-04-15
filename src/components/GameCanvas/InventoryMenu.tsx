import { useEffect, useState } from 'react'
import styles from './GameCanvas.module.css';

export default function InventoryMenu() {

  interface Item {
    id: number,
    item_type: string,
    name: string,
    item_cost: number
  }

  const [invTab, setInvTab] = useState(0);          // handle switching inventory tabs

  // TODO: initialize this with the item data from the database
  const itemManifest: Item[] = buildItemManifest();

  useEffect(() => {
    // TODO: get item data from the database
  }, [])

  // build an approximation of the database items
  function buildItemManifest(): Item[] {
    let items = [];
    let itemNames = getItemNames();
    let itemCost = getItemCost();

    for (let i = 0; i < 16; i++) {
      let i_id = i + 1;
      let i_item_type = '';
      let i_name = itemNames[i];
      let i_item_cost = itemCost[i];

      // get item type
      if (i < 6) {
        i_item_type = 'shirt';
      } else if (i < 12) {
        i_item_type = 'shoes';
      } else {
        i_item_type = 'skin';
      }

      // build item object
      let item = {
        id: i_id,
        item_type: i_item_type,
        name: i_name,
        item_cost: i_item_cost
      }

      items.push(item)
    }

    return items;
  }

  // get item name array
  function getItemNames() {
    let iNames = [
      'White Shirt', 'Red Shirt', 'Blue Shirt', 'Green Shirt', 'Black Shirt', 'Rainbow Shirt',
      'Black Shoes', 'Red Shoes', 'Blue Shoes', 'Green Shoes', 'White Shoes', 'Gold Shoes',
      'Default Skin', 'Yellow Skin', 'Green Skin', 'Blue Skin', 'Rainbow Skin'
    ];

    return iNames;
  }

  // get item cost array
  function getItemCost() {
    let iCost = [
      0, 100, 100, 100, 100, 200,
      0, 50, 50, 50, 50, 100, 1000,
      0, 200, 200, 200, 500
    ];

    return iCost;
  }

  function buildItemGrid() {
    const item_grid = itemManifest.map((item, idx) =>

      <div className={styles.inventoryGridItem}>
        <div className={styles.inventoryItemBox}/>
        <span className={styles.inventoryGridItemName} key={idx}>
          {item.name}
        </span>
      </div>


    );

    return item_grid;
  }

  return (
    <>
      <div className={styles.inventoryDiv}>
        <div className={styles.inventoryGrid}>
          {buildItemGrid()}
        </div>
      </div>
    </>
  )
}