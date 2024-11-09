import React, { useEffect } from 'react';

function FormCost({ sharedPropBond, sharedPropWarranty, customerType, passDataToParent }) {
    const serviceFee = sharedPropWarranty ? 0 : 85;
    const total = sharedPropBond + serviceFee;
    const gst = (total * 0.15).toFixed(2);
    const totalWithGst = (total * 1.15).toFixed(2);

    useEffect(() => {
        passDataToParent({
            bond: sharedPropBond,
            serviceFee: serviceFee,
            gst: gst,
            totalWithGst: totalWithGst,
            customerType: customerType
        });
    }, [sharedPropBond, sharedPropWarranty, customerType, passDataToParent]);

    return (
        <div className="p-4" style={{ backgroundColor: '#EDBB99' }}>
            <h2>Cost</h2>

            <div className="row mb-2">
                <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>
                <input 
                    className="col-12 col-md-12 col-lg-8" 
                    type="number" 
                    value={sharedPropBond} 
                    readOnly 
                />
            </div>

            <div className="row mb-2">
                <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
                <input 
                    className="col-12 col-md-12 col-lg-8" 
                    type="number" 
                    value={serviceFee} 
                    readOnly 
                />
            </div>

            <div className="row mb-2">
                <label className="col-12 col-md-12 col-lg-4">Total ($)</label>
                <input 
                    className="col-12 col-md-12 col-lg-8" 
                    type="number" 
                    value={total} 
                    readOnly 
                />
            </div>

            <div className="row mb-2">
                <label className="col-12 col-md-12 col-lg-4">GST ($)</label>
                <input 
                    className="col-12 col-md-12 col-lg-8" 
                    type="number" 
                    value={gst} 
                    readOnly 
                />
            </div>

            <div className="row mb-2">
                <label className="col-12 col-md-12 col-lg-4">Total (+GST) ($)</label>
                <input 
                    className="col-12 col-md-12 col-lg-8" 
                    type="number" 
                    value={totalWithGst} 
                    readOnly 
                />
            </div>
        </div>
    );
}

export default FormCost;