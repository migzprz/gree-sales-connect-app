import { useState, useEffect } from "react";
import axios from "axios";

export default function useProducts () {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getProducts/')
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        console.log('Product FETCH: ', products)
    }, [products])

    return { products }
}