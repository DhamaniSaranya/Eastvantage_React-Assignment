import React, { useState,useEffect } from 'react';
import axios from "axios";
import './App.css';


function App() {
  // useState is used for here for data and count
  const [items, setItems] = useState<any[]>([]);
  const [refresh, setRefresh]= useState(0);
    // useEffect is used for fetching data
    useEffect( ()=> {
      const data_fetch = async () => {
        const res = await axios.get("https://randomuser.me/api");
        const data = res.data.results;
        const data_Req = {
          name: data[0]["name"],
          email: data[0]["email"]
        };
        setItems([data_Req]);
        // data stores in local storage
        localStorage.setItem("my_data" + refresh, JSON.stringify(res));
      };
      data_fetch();
    }, [refresh])
    // returns XML
  return (
      <div className='container'>
        <div className='heading'>
          <p>Click Refresh for Random User Details</p>
          </div>
          {/* data is mapped and passes the data through item */}
          {items.map((item: any) => {
            return (
              <div className='slide'>
                <div className='details'>
                  <img className='image' src= "./avatar.png" alt="Avatar Pic" />
                  <p className='name'> <b>Name: </b> {item.name.title} {item.name.first} {item.name.last}</p>
                  <p className='email'> <b>E-mail: </b>{item.email}</p>
                </div>
              </div>
            )
          })}
          <button className='btn' onClick={() => setRefresh(refresh + 1)}>
            Refresh
          </button>
      </div>
  )
}

export default App;