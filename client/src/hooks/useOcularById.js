import { useState, useEffect } from "react";
import axios from "axios";

const useOcularById = (id) => {
    const [record, setRecord] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getOcular/${id}`)
                setRecord(response.data[0])
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        console.log('id', id)
        fetchData()
    }, [id])
    useEffect(() => {
        console.log(record)
    },[record])


    return { record, setRecord }
}

export default useOcularById