import classes from './Checkout.module.css'
import {useRef, useState} from "react";
import {useForm} from "react-hook-form";

const isEmpty = (value) => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5;
export const Checkout = (props) => {

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        reset,
        formState: {errors},
    } = useForm()

    const onSubmit = (data) => {
        console.log(getValues())
        props.onConfirm(getValues());
        reset();
    }
    // const [formInputValidity, setForInputValidity] = useState({
    //     name: true, street: true, city: true, postalCode: true
    // })
    // const nameInputRef = useRef();
    // const streetInputRef = useRef();
    // const postalCodeInputRef = useRef();
    // const cityInputRef = useRef();
    // const confirmHandler = (event) => {
    //     event.preventDefault();
    //
    //     const enteredName = nameInputRef.current.value
    //     const enteredStreet = streetInputRef.current.value
    //     const enteredPostalCode = postalCodeInputRef.current.value
    //     const enteredCity = cityInputRef.current.value
    //
    //     const enteredNameIsValid = !isEmpty(enteredName);
    //     const enteredCityIsValid = !isEmpty(enteredCity);
    //     const enteredStreetIsValid = !isEmpty(enteredStreet);
    //     const enteredPostalCodeIsValid = isNotFiveChars(enteredPostalCode);
    //
    //     setForInputValidity({
    //         name: enteredName,
    //         street: enteredStreet,
    //         city: enteredCity,
    //         postalCode: enteredPostalCodeIsValid
    //     });
    //
    //     const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalCodeIsValid
    //
    //     if (!formIsValid) {
    //         return;
    //     }

    // }
    return <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" {...register("name", {
                required: {
                    value: true,
                    message: 'Please enter a valid name'
                }
            })}/>
            <p>{errors.name?.message}</p>
        </div>
        <div className={classes.control}>
            <label htmlFor="street">Street</label>
            <input type="text" {...register("street", {
                required: {
                    value: true,
                    message: 'Please enter a valid street'
                }
            })}/>
            <p>{errors.street?.message}</p>
        </div>
        <div className={classes.control}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" {...register("postal", {
                required: {
                    value: true,
                    message: 'Please enter a valid postal code'
                },
                pattern:{
                    value:/^\d{5}$/,
                    message: "Enter a valid postal code like 75000"

                }
            })}/>
            <p>{errors.postal?.message}</p>
        </div>
        <div className={classes.control}>
            <label htmlFor="city">City</label>
            <input type="text" {...register("city", {
                required: {
                    value: true,
                    message: 'Please enter a valid city'
                },

            })}/>
            <p>{errors.city?.message}</p>
        </div>
        <button type={"button"} onClick={props.onCancel}>Cancel</button>
        <button type={"submit"}>Confirm</button>
    </form>
};