import axios from "axios";
import { useEffect } from "react";

/**
 * Purpose: returns address string based on the id from the form
 */

const useAddressString = async (data) => {
    const inp = ['addr_region_id', 'addr_province_id', 'addr_municipality_id', 'addr_barangay_id'].map(prop => data[prop]);
    const { bldg_no, street_name, zipcode } = data
    console.log(inp)
    let response
    useEffect(() => {
        try {
            response = axios.get('http://localhost:4000/api/getAddressString/', inp)
            const string = response.data.split(',')
            // address template -> CONCAT(loc.addr_bldg_no, " ", loc.addr_street_name, " ", b.name, ", ", m.name, ", ", loc.zipcode, " ", p.name) as site_address,
            const address = bldg_no+' '+street_name+' '+string[0]+', '+string[1]+', '+zipcode+' '+string[3]
            return address


        } catch (error) {
            console.log(error)
            return null
        }
    }, [])
}

export default useAddressString