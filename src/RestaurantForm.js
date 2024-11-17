import React, { useState } from 'react';
import './Restaurant.css';

const RestaurantForm = () => {
    const [formData, setFormData] = useState({
        date: '',
        item: '',
        quantity: '',
        price: '',
    });

    const [status, setStatus] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbw1N7MIe3477Dj2Ltr6SYR4yboymgis5xFl-2Rp7tw3la1t36ac7ov7vBhOaM98BUAe-g/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result === 'success') {
                    setStatus('Data submitted successfully!');
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
                <br />
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
                <br />
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
                <br />
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
                <br />
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default RestaurantForm;
