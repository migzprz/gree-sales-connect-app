import axios from "axios";
import { useEffect, useState } from "react";

const useAvailableTechnicians = (datetime, editDateTime) => {
    const [allTechnicians, setAllTechnicians] = useState([])
    const [availTechnicians, setAvailTechnicians] = useState([])
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getTechnicians/')
                setAllTechnicians(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (datetime !== null && allTechnicians.length > 0) {
            console.log(datetime, editDateTime)
            const fetchAvailability = async () => {
                try {
                    const promises = allTechnicians.map(async (technician) => {
                        const valid = await axios.get(`http://localhost:4000/api/getTechnicianAvailability/${technician.technician_id}`,
                            { params: {datetime: datetime, editDateTime: editDateTime} });
                        return valid.data;
                    });
    
                    const results = await Promise.all(promises);
                    const availTechniciansData = allTechnicians.filter((technician, index) => results[index]);
                    
    
                    setAvailTechnicians(availTechniciansData);
                    setChecked(true)
                } catch (error) {
                    console.error(error);
                }
            };
    
            fetchAvailability();
        }
    }, [datetime, allTechnicians]); // Run when datetime or allTechnicians change

    const technicians = checked ? availTechnicians : allTechnicians
    const mod = checked && availTechnicians.length !== allTechnicians.length
    console.log(technicians, mod)
    return {technicians, mod}

}

export default useAvailableTechnicians