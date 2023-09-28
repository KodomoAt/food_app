import {useContext, useState} from "react";
import styles from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import {Checkout} from "./Checkout";
import axios from "axios";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext);
    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}€`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
      cartCtx.addItem({...item, amount: 1})
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }
    const submitOrderHandler = async (userData) => {
        const response = await axios.post('https://react-http-7ab0c-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            {user: userData, order:cartCtx.items})
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }
    const cartItems = (<ul>{cartCtx.items.map(item => <CartItem key={item.id}
                                                                name={item.name}
                                                                amount={item.amount}
                                                                price={item.price}
                                                                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                                                onAdd={cartItemAddHandler.bind(null, item)}/>)}</ul>
    )

    const cartModalContent =<>{cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCartHandler}/>}
        {!isCheckout && <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onHideCartHandler}>Close</button>
            {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>}</>
    const isSubmittingModalContent = <p>Sending order data ... </p>

    const didSubmitContent = <p>Successfully sent the order !</p>
    return <Modal onClick={props.onHideCartHandler}>

        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
};
export default Cart;