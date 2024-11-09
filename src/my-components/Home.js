import React, { useState } from 'react';
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost from './FormCost';
import FormButtons from './FormButtons';
import Invoice from './Invoice';

function Home() {
    const [customerDetails, setCustomerDetails] = useState({
        customerType: 'customer'
    });
    const [repairDetails, setRepairDetails] = useState({
        warranty: false
    });
    const [courtesyPhoneDetails, setCourtesyPhoneDetails] = useState({});
    const [costDetails, setCostDetails] = useState({});
    const [sharedBond, setSharedBond] = useState(0);
    const [sharedWarranty, setSharedWarranty] = useState(false);
    const [showInvoice, setShowInvoice] = useState(false);

    const handleCustomerDetails = (details) => {
        setCustomerDetails(details);
        // Only reset bond for business customers, don't touch service fee
        if (details.customerType === 'business') {
            setSharedBond(0);
            setCourtesyPhoneDetails(prevDetails => ({
                ...prevDetails,
                phoneBond: 0,
                chargerBond: 0,
                totalBond: 0
            }));
        }
    };

    const handleRepairDetails = (details) => {
        setRepairDetails(details);
        setSharedWarranty(details.warranty || false);
    };

    const handleCourtesyPhoneDetails = ({ phoneName, phoneBond, chargerName, chargerBond, totalBond }) => {
        // Bond is always 0 for business customers
        const newBond = customerDetails.customerType === 'business' ? 0 : totalBond;
        setSharedBond(newBond);
        setCourtesyPhoneDetails({
            phoneName,
            phoneBond: customerDetails.customerType === 'business' ? 0 : phoneBond,
            chargerName,
            chargerBond: customerDetails.customerType === 'business' ? 0 : chargerBond,
            totalBond: newBond
        });
    };

    const handleCostDetails = (details) => {
        // Bond is always 0 for business customers
        const bond = customerDetails.customerType === 'business' ? 0 : details.bond;
        
        // Service fee is ONLY affected by warranty status
        const serviceFee = sharedWarranty ? 0 : 85;
        
        // Calculate total and GST
        const total = bond + serviceFee;
        const gst = (total * 0.15).toFixed(2);
        const totalWithGst = (total * 1.15).toFixed(2);

        const updatedDetails = {
            ...details,
            bond,
            serviceFee, // This will be 85 unless there's a warranty
            gst,
            totalWithGst,
            customerType: customerDetails.customerType
        };
        
        setCostDetails(updatedDetails);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        // Final calculations before showing invoice
        const bond = customerDetails.customerType === 'business' ? 0 : costDetails.bond;
        const serviceFee = sharedWarranty ? 0 : 85; // Only warranty affects service fee
        const total = bond + serviceFee;
        const gst = (total * 0.15).toFixed(2);
        const totalWithGst = (total * 1.15).toFixed(2);

        const finalCostDetails = {
            ...costDetails,
            bond,
            serviceFee, // Will be 85 unless warranty exists
            gst,
            totalWithGst
        };
        setCostDetails(finalCostDetails);
        setShowInvoice(true);
    };

    return (
        <div className="container-fluid">
            {!showInvoice ? (
                <form className="row" style={{ minHeight: '60vh' }} onSubmit={onSubmit}>
                    <div
                        className="col-12 col-lg-4 p-4 m-0"
                        style={{ minHeight: '30vh', backgroundColor: '#FCF3CF' }}
                    >
                        <FormCustomerDetail 
                            passDataToParent={handleCustomerDetails} 
                        />
                    </div>

                    <div 
                        className="col-12 col-lg-4 p-4 m-0" 
                        style={{ minHeight: '30vh', backgroundColor: '#efffff' }}
                    >
                        <FormRepairDetail 
                            passDataToParent={handleRepairDetails} 
                        />
                    </div>

                    <div className="col-12 col-lg-4 p-0 m-0">
                        <div 
                            className="p-4" 
                            style={{ minHeight: '30vh', backgroundColor: '#5e9598' }}
                        >
                            <FormCourtesyPhone 
                                passDataToParent={handleCourtesyPhoneDetails}
                                customerType={customerDetails.customerType}
                            />
                        </div>

                        <div 
                            className="p-4" 
                            style={{ minHeight: '20vh', backgroundColor: '#EDBB99' }}
                        >
                            <FormCost 
                                sharedPropBond={sharedBond}
                                sharedPropWarranty={sharedWarranty}
                                customerType={customerDetails.customerType}
                                passDataToParent={handleCostDetails}
                            />
                        </div>
                    </div>

                    <div 
                        className="p-4 text-center" 
                        style={{ minHeight: '10vh', backgroundColor: '#EDBB99' }}
                    >
                        <FormButtons />
                    </div>
                </form>
            ) : (
                <Invoice
                    customerDetails={customerDetails}
                    repairDetails={repairDetails}
                    courtesyPhoneDetails={courtesyPhoneDetails}
                    costDetails={costDetails}
                />
            )}
        </div>
    );
}

export default Home;