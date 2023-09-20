import {useRef, useState} from "react";
import styles from './MealItemForm.module.css'
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef()
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(enteredAmountNumber)
    }
    return <form className={styles.form} action="" onSubmit={submitHandler}>
        <Input ref={amountInputRef} input={{

            type: "number",
            id: "amount_" + props.id,
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }} label={"Amount"}/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5) </p>}
    </form>
};

export default MealItemForm;