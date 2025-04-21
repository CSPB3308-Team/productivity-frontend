import { useContext, useEffect, useState } from 'react'
import styles from '../GameCanvas.module.css';
import CurrencyIcon from './CurrencyIcon';
import { AuthUserData, ItemAddPost, ItemUserData, SignupResponse } from '../../../types';
import { BalanceContext } from '../../../pages/TaskPage/TaskPage';
import AvatarManager from '../AvatarManager';
import useGetRequest from '../../../hooks/useGetRequest';
import usePostPutPatchDelete from '../../../hooks/usePostPutPatchDelete';
import AuthService from '../../../utils/Auth';

interface ItemInputs {
  user: AuthUserData;
  avatarManager: AvatarManager;
  cloneManager: AvatarManager;
}

export default function InventoryMenu(input: ItemInputs) {

  const { userBalance, setUserBalance } = useContext(BalanceContext);

  // GET Request: item data from database
  const { data, error, loading, sendRequest } = useGetRequest<ItemUserData[]>('items');
  const post = usePostPutPatchDelete<ItemAddPost, SignupResponse>(
    'items',
    'POST', 
    { Authorization: `Bearer ${AuthService.getToken()}` }
  );

  const [itemData, setItemData] = useState<ItemUserData[] | null>(null);  // stores item manifest
  const [invTab, setInvTab] = useState(0);                                // handle switching inventory tabs
  const [tabColor, setTabColor] = useState([true, false, false]);         // manage styles to change color on selection
  const [selectedItem, setSelectedItem] = useState<ItemUserData | null>(null);
  const [showPurchase, setShowPurchase] = useState<boolean>(false);

  // gets user data from Context
  const user = input.user;

  // get initial item table
  useEffect(() => {
    if (user) sendRequest({ user_id: String(user.id) });
  }, [sendRequest]);

  // Add the items to local state
  useEffect(() => {
    if (data) {
      setItemData(data)

      // inititialize with first item selected
      let temp = data.find((item) => item.id == 1);
      if (temp) {
        setSelectedItem(temp);

        // if the user doesn't own the item yet, be sure to show the Purchase button
        if (!temp.owned) {
          setShowPurchase(true);
        }
      }
    };
  }, [data, setItemData]);


  const handlePurchase = async () => {
    // Send purchase request
    if (user) {
      if (selectedItem) {
        await post.sendRequest({ user_id: String(user.id), item_id: String(selectedItem.id) });
      }
    }
  };

  // Switch the active tab for filtering and styling
  function updateInvTab(invType: number) {
    let tabTemp = tabColor;
    tabTemp[invTab] = false;
    tabTemp[invType] = true;

    setTabColor(tabTemp);
    setInvTab(invType);
  }

  // disables purchase button if user lacks sufficient funds
  function checkBalance(): boolean {
    if (userBalance && selectedItem) {
      if (userBalance < selectedItem.item_cost) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // Displayes the Purchase button and selected item's price
  function purchaseBox() {
    return (
      <>
        <button className={styles.inventoryPurchaseButton} onClick={() => purchaseSelectedItem()}
          disabled={checkBalance()}>
          Purchase
        </button>
        <p className={styles.inventoryCostText}>{selectedItem?.item_cost}</p>
      </>
    )
  }

  // Buys an item when user clicks the Purchase button
  function purchaseSelectedItem() {
    if (itemData && selectedItem) {

      handlePurchase()

      // TODO: post request to actually buy the thing
      setUserBalance((userBalance as number) - (selectedItem as ItemUserData).item_cost);
      setShowPurchase(false);

      let tempItems = itemData;
      let selection = tempItems.find((item) => item.id == selectedItem.id);

      Object.assign(selection as ItemUserData, { ...selectedItem, owned: true })

      setItemData(tempItems);
    }
  }

  // Displayes the Wear button if user already owns the selected item
  function equipBox() {
    return (
      <>
        <button className={styles.inventoryPurchaseButton} onClick={() => equipSelectedItem()}>
          Wear
        </button>
      </>
    )
  }

  // Equips an item on the user's avatar when they click the Wear button
  function equipSelectedItem() {
    if (itemData && selectedItem) {

      // TODO: post request to set avatar data to be this item
      if (selectedItem.item_type === "shirt") {
        input.avatarManager.setShirt(selectedItem.id);
      } else if (selectedItem.item_type === "shoes") {
        input.avatarManager.setShoes(selectedItem.id);
      } else if (selectedItem.item_type === "skin") {
        input.avatarManager.setPants(selectedItem.id);
      }
    }
  }

  // Handles switching between item selections 
  function updateSelection(itemOwned: boolean, item: ItemUserData) {
    if (itemData) {
      setSelectedItem(item);
      // determine if we should show the Purchase button, or the Wear button
      if (itemOwned == true) {
        setShowPurchase(false);
      } else {
        setShowPurchase(true);
      }

      // update avatar preview to show the selected item
      if (item.item_type === "shirt") {
        input.cloneManager.setShirt(item.id);
      } else if (item.item_type === "shoes") {
        input.cloneManager.setShoes(item.id);
      } else if (item.item_type === "skin") {
        input.cloneManager.setPants(item.id);
      }
    }
  }

  // Generate the item inventory based on the currently selected tab
  function buildItemGrid() {
    if (itemData) {
      // get items that match the current inventory tab
      let i_type = '';
      switch (invTab) {
        case 0:
          i_type = 'shirt';
          break;

        case 1:
          i_type = 'shoes';
          break;

        case 2:
          i_type = 'skin'
          break;

        default:
          // probably should make this something else later
          i_type = 'error'
      }

      // make a new array with just those items
      let tab_items = itemData.filter((item) => item.item_type === i_type);

      // map those items into some html
      const item_grid = tab_items.map((item, idx) =>
        <div className={styles.inventoryGridItem} key={'GI_' + idx}>
          <div className={styles.inventoryItemBox} key={idx}
            style={{ backgroundColor: item.owned ? "white" : "grey" }}
            onClick={() => updateSelection(item.owned, item)} />
          <p className={styles.inventoryGridItemText} key={'Text_' + idx}>
            {item.name}
          </p>
        </div>
      );

      return item_grid;
    }
  }

  return (
    <>
      <div className={styles.inventoryDiv}>
        <div className={styles.inventoryTabDiv}>

          <div className={styles.inventroyTab} onClick={() => updateInvTab(0)} style={{ backgroundColor: tabColor[0] ? "grey" : "white" }}>
            <p className={styles.inventoryTabText}>Shirts</p>
          </div>
          <div className={styles.inventroyTab} onClick={() => updateInvTab(1)} style={{ backgroundColor: tabColor[1] ? "grey" : "white" }}>
            <p className={styles.inventoryTabText}>Shoes</p>
          </div>
          <div className={styles.inventroyTab} onClick={() => updateInvTab(2)} style={{ backgroundColor: tabColor[2] ? "grey" : "white" }}>
            <p className={styles.inventoryTabText}>Pants</p>
          </div>

          <div className={styles.inventoryCurrencyDiv}>
            <div className={styles.inventoryCurrencyIconDiv}>
              <CurrencyIcon />
            </div>
            <p className={styles.inventoryCurrencyCount}>
              {userBalance}
            </p>
          </div>
        </div>

        <div className={styles.inventoryGrid}>
          {buildItemGrid()}
        </div>

        <div className={styles.inventoryPurchaseDiv}>
          {showPurchase ? purchaseBox() : equipBox()}
        </div>
      </div >
    </>
  )
}