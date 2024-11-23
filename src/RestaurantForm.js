import React, { useState } from 'react';
import axios from 'axios';
import './Restaurant.css';

const RestaurantForm = () => {
    const [formData, setFormData] = useState({
        date: '',
        item: '',
        quantity: '',
        price: '',
    });

    const [status, setStatus] = useState('');
    const [fetchedData, setFetchedData] = useState([]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await fetch('https://restoserver.onrender.com/proxy', {
                method: 'POST',
                mode:'cors',
                headers: {
                    // 'Content-Type': 'text/plain;charset=utf-8',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data, 'dataCheck')
                if (data.status === 'success') {
                    setStatus(data.message);
                    setFormData({
                        date: "",
                        item: "",
                        quantity: "",
                        price: ""
                      });
                } else {
                    setStatus('Failed to submit data.');
                }
            } else {
                setStatus('Error: Unable to connect to server.');
            }
        } catch (error) {
            setStatus('Error: ' + error.message);
        }
    };

    // Fetch data from the Google Sheets web app
    const handleGetData = async () => {
        try {
            const response = await fetch('https://restoserver.onrender.com/proxy');
            console.log(response, 'checkResponse');
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData, 'checkData');
                setFetchedData(responseData.data);
                setStatus('Data fetched successfully!');
            } else {
                setStatus('Error: Unable to fetch data.');
            }
        } catch (error) {
            setStatus('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Restaurant App</h1>
            <form>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Item:
                    <input
                        type="text"
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            <button type="button" onClick={handleGetData} style={{ marginTop: '20px' }}>
                Get Data
            </button>
            {status && <p>{status}</p>}

            {/* Display fetched data */}
            {fetchedData.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', fontSize: '16px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Item</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(fetchedData, 'checkData')}
                  {fetchedData.map((row, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', // Alternating row colors
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      {/* Format Date for readability */}
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(row.Date).toLocaleDateString()}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.Item}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.Quantity}</td>
                      <td
                        style={{
                          padding: '10px',
                          border: '1px solid #ddd',
                          color: row.Price > 2 ? 'green' : 'red', // Highlight price based on value
                          fontWeight: 'bold',
                        }}
                      >
                        {row.Price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            )}
        </div>
    );
};

export default RestaurantForm;
