import React, { useState, useRef, useEffect } from 'react';

function FormCustomerDetail({ passDataToParent }) {
    const [details, setDetails] = useState({
        customerType: 'customer',
        title: 'Mr',
        firstName: '',
        lastName: '',
        street: '',
        suburb: '',
        city: '',
        postCode: '',
        phoneNumber: '',
        email: ''
    });
    const [addressInput, setAddressInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const timeoutRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedDetails = { ...details, [name]: value };
        setDetails(updatedDetails);
        passDataToParent(updatedDetails);
    };

    const validatePostCode = (event) => {
        const value = event.target.value;
        if (value.length !== 4 || !/^\d+$/.test(value)) {
            event.target.setCustomValidity('Post Code must be exactly 4 digits');
        } else {
            event.target.setCustomValidity('');
        }
    };

    const validatePhoneNumber = (event) => {
        const value = event.target.value;
        if (!/^\d+$/.test(value)) {
            event.target.setCustomValidity('Phone Number must contain only digits');
        } else {
            event.target.setCustomValidity('');
        }
    };

    const fetchAddressSuggestions = async (input) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)},new zealand&format=json&addressdetails=1&limit=5`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'RepairShopApp (contact@repairshop.com)'
                    }
                }
            );
            const data = await response.json();
            
            return data.map(item => ({
                display_name: item.display_name,
                address: {
                    street: [item.address.house_number, item.address.road].filter(Boolean).join(' ') || input,
                    suburb: item.address.suburb || item.address.neighbourhood || '',
                    city: item.address.city || item.address.town || item.address.village || '',
                    postCode: item.address.postcode || ''
                }
            }));
        } catch (error) {
            console.error('Error fetching addresses:', error);
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddressInputChange = (e) => {
        const value = e.target.value;
        setAddressInput(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Update the street value in details state
        const updatedDetails = { 
            ...details, 
            street: value,
            // Clear other address fields when typing a new address
            suburb: '',
            city: '',
            postCode: ''
        };
        setDetails(updatedDetails);
        passDataToParent(updatedDetails);

        if (value.length >= 3) {
            timeoutRef.current = setTimeout(async () => {
                const results = await fetchAddressSuggestions(value);
                setSuggestions(results);
                setShowSuggestions(true);
            }, 300);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setAddressInput(suggestion.address.street); // Update with just the street part
        setSuggestions([]);
        setShowSuggestions(false);

        // Update the details state with new address
        const updatedDetails = {
            ...details,
            street: suggestion.address.street,
            suburb: suggestion.address.suburb,
            city: suggestion.address.city,
            postCode: suggestion.address.postCode
        };
        
        setDetails(updatedDetails);
        passDataToParent(updatedDetails);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setShowSuggestions(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <h2>Customer Details</h2>
            <div className="row">
                <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
                    <legend className="col-11 float-none w-auto">Customer type *</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Customer</label>
                        <input type="radio" id="customerType" name="customerType" value="customer"
                            checked={details.customerType === 'customer'}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Business</label>
                        <input type="radio" id="businessType" name="customerType" value="business"
                            checked={details.customerType === 'business'}
                            onChange={handleChange} />
                    </div>
                </fieldset>
            </div>

            <div className="row mt-2 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Title *</label>
                <select className="col-12 col-md-12 col-lg-7" name="title" value={details.title} onChange={handleChange}>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr">Dr</option>
                </select>
            </div>

            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">First Name *</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="firstName" value={details.firstName} onChange={handleChange} required />
            </div>

            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Last Name *</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="lastName" value={details.lastName} onChange={handleChange} required />
            </div>

            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Address *</label>
                <div className="col-12 col-md-12 col-lg-7" style={{ padding: 0 }}>
                    <input
                        type="text"
                        className="col-12"
                        placeholder="Start typing your address..."
                        value={addressInput}
                        onChange={handleAddressInputChange}
                        onClick={(e) => e.stopPropagation()}
                        required
                    />
                    {isLoading && (
                        <div className="position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    
                    {showSuggestions && suggestions.length > 0 && (
                        <div 
                            className="position-absolute w-100 mt-1 bg-white border rounded shadow-sm z-3"
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxHeight: '200px', overflowY: 'auto' }}
                        >
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="p-2 cursor-pointer hover-bg-light"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {suggestion.display_name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Suburb</label>
                <input 
                    className="col-12 col-md-12 col-lg-7" 
                    type="text" 
                    name="suburb" 
                    value={details.suburb} 
                    onChange={handleChange}
                />
            </div>

            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">City *</label>
                <input 
                    className="col-12 col-md-12 col-lg-7" 
                    type="text" 
                    name="city" 
                    value={details.city} 
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Post Code</label>
                <input 
                    className="col-12 col-md-12 col-lg-7" 
                    type="text" 
                    name="postCode" 
                    value={details.postCode} 
                    onChange={handleChange} 
                    onInput={validatePostCode}
                />
            </div>

            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Phone Number *</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="phoneNumber" value={details.phoneNumber} onChange={handleChange} onInput={validatePhoneNumber} required />
            </div>

            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Email *</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" name="email" value={details.email} onChange={handleChange} required />
            </div>
        </>
    );
}

export default FormCustomerDetail;