import Tracker from '@/Componets/Tracker';
import React, { useEffect, useState } from 'react';
import { Select } from "antd";
import { Country, State, City } from "country-state-city";
import { Phone } from 'lucide-react';
import { showError } from '@/Utils/Toast';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function ProceedToCheckOut() {
  const [countryCode, setCountryCode] = useState(null);
  const [stateCode, setStateCode] = useState(null);
  const [cityName, setCityName] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [address, setAddress] = useState({});
  const [price, setPrice] = useState({});
  const [name,setName]=useState('');
  const[phone,setPhone]=useState('');
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(phone.length<10){
      showError('phone number is invalid');
    }
    if (cityName) {
      const addr = { country: countryCode, state: stateCode, city: cityName ,name:name,phone:phone };
      setAddress(addr);
      sessionStorage.setItem('address', JSON.stringify(addr));
    }
    console.log( sessionStorage.getItem('address'))
    navigate('/cart/proceedToCheckOut/OrderSummary')


  }

  useEffect(() => {
    const p = JSON.parse(sessionStorage.getItem('price'));
    if (p) setPrice(p);
  }, []);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (countryCode) {
      setStates(State.getStatesOfCountry(countryCode));
      setStateCode(null);
      setCityName(null);
      setCities([]);
    }
  }, [countryCode]);

  useEffect(() => {
    if (countryCode && stateCode) {
      setCities(City.getCitiesOfState(countryCode, stateCode));
      setCityName(null);
    }
  }, [stateCode, countryCode]);

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
      {/* Tracker */}
     <div className="w-full max-w-4xl mb-6 px-2">
  <Tracker st1="finish" st2="process" st3="wait" st4="wait" st5="wait" />
</div>

      {/* Shipping Form */}
      <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row gap-6">
        {/* Form Section */}
        <form onSubmit={handleSubmit} >
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
          <input
            placeholder="Full Name"
            name="name"
            onChange={(e)=>setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            placeholder="Phone Number"
            type="number"
            name="phone"
            onChange={(e)=>setPhone(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* Location Selects */}
          <div className="space-y-4">
            <Select
              placeholder="Select Country"
              value={countryCode}
              onChange={setCountryCode}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              className="w-full"
            >
              {countries.map((c) => (
                <Option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Select State"
              value={stateCode}
              onChange={setStateCode}
              disabled={!countryCode}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              className="w-full"
            >
              {states.map((s) => (
                <Option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Select City"
              value={cityName}
              onChange={setCityName}
              disabled={!stateCode}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              className="w-full"
            >
              {cities.map((c) => (
                <Option key={c.name} value={c.name}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Display selected */}
          {/* {cityName && (
            <div className="text-gray-700 mt-2">
              Selected: {countryCode} / {stateCode} / {cityName}
            </div>
          )} */}
          <button type='submit'>Submit & Proceed</button>

        </div>
        </form>

        
        
      </div>
    </div>
  );
}

export default ProceedToCheckOut;
