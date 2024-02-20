import { useState, useEffect } from 'react';
import axios from 'axios';


/**
 * Custom hook for filtering address components.
 * @param {Object} formData - The form data object.
 *  NOTE: using this hook requires the formData to contain the following columns: { region, province, city, barangay }
 * @param {function} setFormData - The function to update form data.
 */
const useAddressFilter = (formData, setFormData) => {

  // location data
  const [location, setLocation] = useState([])
  const [region, setRegion] = useState([])
  const [province, setProvince] = useState([])
  const [city, setCity] = useState([])
  const [barangay, setBarangay] = useState([])

  // filter data for address dropdown
  const [filteredProvince, setFilteredProvince] = useState([])
  const [filteredCity, setFilteredCity] = useState([])
  const [filteredBarangay, setFilteredBarangay] = useState([])

  // is active use states for drop down
  const [provinceActive, setProvinceActive] = useState(false)
  const [cityActive, setCityActive] = useState(true)
  const [barangayActive, setBarangayActive] = useState(true)

  const fetchData = async () => {
    try {
        const locFormsResponse = await axios.get('http://localhost:4000/api/getLocationsForAddressInForms/')
        setLocation(locFormsResponse.data)
        setRegion(locFormsResponse.data.regions)
        setProvince(locFormsResponse.data.provinces)
        setCity(locFormsResponse.data.municipalities)
        setBarangay(locFormsResponse.data.barangays)
    } catch (error) {
        console.error('Error fetching location data: ', error)
    }
  }
  useEffect(() => {
      fetchData()
  },[])
  useEffect(() => {
      console.log('location data: ', location, region, province, city, barangay)
  },[location])

  useEffect(() => {
      const filterProvince = () => {
        const filteredProvince = province.filter(prov => prov.region_id === Number(formData.addr_region_id));
        setFilteredProvince(filteredProvince);
        setProvinceActive(true);
        setFilteredCity([]);
        setFilteredBarangay([]);
        setFormData({
          ...formData,
          addr_province_id: '',
          addr_municipality_id: '',
          addr_barangay_id: ''
        })
      };
  
      const filterCity = () => {
        const filteredCity = city.filter(cit => cit.province_id === Number(formData.addr_province_id));
        setFilteredCity(filteredCity);
        setCityActive(true);
        setFilteredBarangay([]);
      };
  
      const filterBarangay = () => {
        const filteredBarangay = barangay.filter(bar => bar.municipality_id === Number(formData.addr_municipality_id));
        setFilteredBarangay(filteredBarangay);
        setBarangayActive(true);
      };
  
      filterProvince();
    }, [formData.addr_region_id, setFilteredProvince, setProvinceActive, setFilteredCity, setCityActive, setFilteredBarangay, setBarangayActive, province, city, barangay]);
  
    useEffect(() => {
      const filterCity = () => {
        const filteredCity = city.filter(cit => cit.province_id === Number(formData.addr_province_id));
        setFilteredCity(filteredCity);
        setCityActive(true);
        setFilteredBarangay([]);
      };
  
      filterCity();
    }, [formData.addr_province_id, setFilteredCity, setCityActive, setFilteredBarangay, city]);
  
    useEffect(() => {
      const filterBarangay = () => {
        const filteredBarangay = barangay.filter(bar => bar.municipality_id === Number(formData.addr_municipality_id));
        setFilteredBarangay(filteredBarangay);
        setBarangayActive(true);
      };
  
      filterBarangay();
  }, [formData.addr_municipality_id, setFilteredBarangay, setBarangayActive, barangay]);

  return { region, filteredProvince, filteredCity, filteredBarangay }
};

export default useAddressFilter;