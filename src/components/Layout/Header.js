import React from "react";
import mealImg from '../../assets/meals.png'
import styles from './Header.module.css'
import HeaderCardButton from "./HeaderCardButton";

const Header = () => {
    return <>
        <header className={styles.header}>
            <h1>ReactMeals</h1>
            <HeaderCardButton/>
        </header>
        <div className={styles['main-image']}>
            <img src={mealImg} alt="A table full of delicious food!"/>
        </div>
    </>

};

export default Header;