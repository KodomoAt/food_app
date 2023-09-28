import styles from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import useHttp from "../../store/use-http";
import {Loader} from "../UI/Loader";


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    const {isLoading, error, sendRequest} = useHttp()
    const requestConfig = {
        method: "GET",
        url: "https://react-http-7ab0c-default-rtdb.europe-west1.firebasedatabase.app/meals.jso",
        cleanData : useCallback((data) => {
            const loadMeals = [];
            for (const key in data){
                loadMeals.push(
                    {
                        id:data[key].id,
                        name: data[key].name,
                        price: data[key].price,
                        description: data[key].description
                    }
                )
            }
            setMeals(loadMeals);
        })
    }
    useEffect(() => {
        sendRequest(requestConfig);
    }, []);

    const mealsList = meals.map(meal => <MealItem key={meal.id}
                                                        name={meal.name}
                                                        description={meal.description}
                                                        price={meal.price}
                                                        id={meal.id}/>)
    return <section className={styles.meals}>
        <Card>
            {isLoading ? <Loader/> : <ul>
                {mealsList}
            </ul>}
            {error && <p>There is a server error.</p>}


        </Card>
    </section>
};

export default AvailableMeals;