import {useState} from "react";
import axios from "axios";

const UseHttp = (applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const sendRequest = async (requestConfig) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios({
                method: requestConfig.method,
                url: requestConfig.url
            })


            const data = await response.data;
            requestConfig.cleanData(data)
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };
    return {
        isLoading,
        error,
        sendRequest,
    }
};

export default UseHttp;