import React, { useState } from 'react';

function FormRepairDetail({ passDataToParent }) {
    const [repairDetails, setRepairDetails] = useState({
        purchaseDate: '',
        repairDate: '',
        warranty: false,
        imei: '',
        make: 'Apple',
        modelNumber: '',
        faultCategory: 'screen',
        description: ''
    });

    // Calculate max date (today) for both fields
    const today = new Date().toISOString().split('T')[0];

    // Calculate warranty end date (24 months from purchase)
    const getWarrantyEndDate = (purchaseDate) => {
        if (!purchaseDate) return today;
        
        const purchaseDateTime = new Date(purchaseDate);
        const warrantyEnd = new Date(purchaseDateTime);
        warrantyEnd.setMonth(purchaseDateTime.getMonth() + 24);
        
        return warrantyEnd.toISOString().split('T')[0];
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        let updates = {
            ...repairDetails,
            [name]: fieldValue
        };
        
        // If changing purchase date, check repair date validity
        if (name === 'purchaseDate' && repairDetails.repairDate) {
            const warrantyEnd = getWarrantyEndDate(value);
            
            // Check if repair date is beyond warranty period
            if (new Date(repairDetails.repairDate) > new Date(warrantyEnd)) {
                updates.warranty = false; // Automatically uncheck warranty
            }
        }

        // If changing repair date, check warranty validity
        if (name === 'repairDate' && value) {
            const warrantyEnd = getWarrantyEndDate(repairDetails.purchaseDate);
            
            // If repair date is beyond warranty period, warranty must be false
            if (new Date(value) > new Date(warrantyEnd)) {
                updates.warranty = false;
            }
        }

        setRepairDetails(updates);
        passDataToParent(updates);
    };

    return (
        <>
            <h2>Repair Details</h2>
            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Purchase Date *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="date"
                    name="purchaseDate"
                    value={repairDetails.purchaseDate}
                    onChange={handleChange}
                    max={today}
                    required
                />
            </div>
            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="date"
                    name="repairDate"
                    value={repairDetails.repairDate}
                    onChange={handleChange}
                    min={repairDetails.purchaseDate}
                    max={today}
                    required
                    disabled={!repairDetails.purchaseDate}
                />
            </div>

            {/* Under Warranty */}
            <div className="row">
                <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                    <legend className="col-11 float-none w-auto">Under Warranty</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                        <input
                            type="checkbox"
                            name="warranty"
                            checked={repairDetails.warranty}
                            onChange={handleChange}
                            disabled={
                                repairDetails.repairDate && 
                                new Date(repairDetails.repairDate) > new Date(getWarrantyEndDate(repairDetails.purchaseDate))
                            }
                        />
                        {repairDetails.purchaseDate && repairDetails.repairDate && (
                            <div className="col-12 text-muted small">
                                {new Date(repairDetails.repairDate) > new Date(getWarrantyEndDate(repairDetails.purchaseDate)) 
                                    ? "Warranty expired (over 24 months from purchase date)"
                                    : "Within warranty period"}
                            </div>
                        )}
                    </div>
                </fieldset>
            </div>

            {/* Rest of the form remains the same */}
            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">IMEI *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    name="imei"
                    value={repairDetails.imei}
                    pattern="\d{15}"
                    maxLength="15"
                    title="IMEI must be exactly 15 digits"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="row mt-2 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Make *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    name="make"
                    value={repairDetails.make}
                    onChange={handleChange}
                >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung Galaxy</option>
                    <option value="Nokia">Nokia</option>
                </select>
            </div>

            <div className="row mt-1 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Model Number</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="number"
                    name="modelNumber"
                    value={repairDetails.modelNumber}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="row mt-2 mb-3">
                <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    name="faultCategory"
                    value={repairDetails.faultCategory}
                    onChange={handleChange}
                >
                    <option value="screen">Screen</option>
                    <option value="battery">Battery</option>
                    <option value="camera">Camera Defect</option>
                    <option value="software">Software Problems</option>
                    <option value="connectivity">Connectivity Faults</option>
                </select>
            </div>

            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Description</label>
                <textarea
                    className="col-12 col-md-12 col-lg-7"
                    name="description"
                    rows="4"
                    value={repairDetails.description}
                    onChange={handleChange}
                    placeholder="Enter a detailed description here..."
                />
            </div>
        </>
    );
}

export default FormRepairDetail;
