import { useState, useEffect } from "react";
import axios from "axios";

export default function useProducts (setLoading1) {
    const [products, setProducts] = useState([])
    const [services, setServices] = useState([])
    const [parts, setParts] = useState([])


    const fetchDataAndMap = async (url, unit) => {
        const response = await axios.get(url);
        // const propertySrp = unit + '_srp'
        return response.data.map(item => ({ 
             ...item, unit //, srp: item[propertySrp]
        }));

        // commented code is for possible merging implementations where products, services and parts are all in one table
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetchDataAndMap('http://localhost:4000/api/getProducts/', 'product');
                const servicesResponse = await fetchDataAndMap('http://localhost:4000/api/getServices/', 'service');
                const partsResponse = await fetchDataAndMap('http://localhost:4000/api/getParts/', 'parts');

                setProducts(productsResponse)
                setServices(servicesResponse)
                setParts(partsResponse)

                setLoading1(false)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        console.log('Product FETCH: ', products)
    }, [products])
    useEffect(() => {
        console.log('Services FETCH: ', services)
    }, [services])
    useEffect(() => {
        console.log('Parts FETCH: ', parts)
    }, [parts])

    return { products, services, parts }
}