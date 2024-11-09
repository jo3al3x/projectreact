import React from 'react';

// Utility function to format the date
const formatDate = (date) => {
    return date.toLocaleDateString('en-GB'); // Format: dd/mm/yyyy
};

// Utility function to calculate payment due date (5 days after current date)
const getPaymentDueDate = () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 5);
    return formatDate(dueDate);
};

// Get current date for invoice
const getCurrentDateTime = () => {
    return new Date().toLocaleString(); // Format: dd/mm/yyyy, hh:mm:ss
};

function Invoice({ customerDetails, repairDetails, courtesyPhoneDetails, costDetails }) {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            
            {/* Invoice Header */}
            <div style={{ backgroundColor: '#d3d3d3', padding: '10px 0', width: '100vw', position: 'relative', left: 'calc(-50vw + 50%)', marginTop: '-10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ margin: 0, fontWeight: 'bold' }}>Repair Booking</h2>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'right' }}>
                        <p style={{ margin: 0 }}>Amount Due</p>
                        <p style={{ margin: 0 }}>${costDetails.totalWithGst}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {/* Customer Information */}
                <div>
                    <h3>Customer</h3>
                    <p>{customerDetails.firstName} {customerDetails.lastName}</p>
                    <p>{customerDetails.street}, {customerDetails.suburb}, {customerDetails.city}, {customerDetails.postCode}</p>
                    <p>{customerDetails.phoneNumber}</p>
                    <p>{customerDetails.email}</p>
                </div>

                {/* Repair Job Information */}
                <div>
                    <h3>Repair Job</h3>
                    <p><strong>Job Number:</strong> 0001</p>
                    <p><strong>Invoice Date:</strong> {getCurrentDateTime()}</p>
                    <p><strong>Payment Due:</strong> {getPaymentDueDate()}</p>
                </div>
            </div>

            {/* Horizontal Line Below Customer and Repair Job Information */}
            <hr style={{ border: '1px solid black', marginTop: '20px', marginBottom: '20px' }} />

            {/* Repair Details */}
            <h3>Repair Details</h3>
            <div>
                <p><strong>Purchase Date:</strong> {repairDetails.purchaseDate}</p>
                <p><strong>Repair Date:</strong> {repairDetails.repairDate}</p>
                <p><strong>Under Warranty:</strong> {repairDetails.warranty ? 'Yes' : 'No'}</p>
                <p><strong>IMEI:</strong> {repairDetails.imei}</p>
                <p><strong>Make:</strong> {repairDetails.make}</p>
                <p><strong>Model Number:</strong> {repairDetails.modelNumber}</p>
                <p><strong>Fault Category:</strong> {repairDetails.faultCategory}</p>
                <p><strong>Description:</strong> {repairDetails.description}</p>
            </div>

            {/* Courtesy Phone Details */}
            <h3>Courtesy Loan Device Details</h3>
            <table style={{ width: '60%', border: '1px solid black', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '4px', width: '20%' }}>Item</th>
                        <th style={{ border: '1px solid black', padding: '4px', width: '20%' }}>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {courtesyPhoneDetails.phoneName && (
                        <tr>
                            <td style={{ border: '1px solid black', padding: '4px' }}>{courtesyPhoneDetails.phoneName}</td>
                            <td style={{ border: '1px solid black', padding: '4px' }}>${courtesyPhoneDetails.phoneBond}</td>
                        </tr>
                    )}
                    {courtesyPhoneDetails.chargerName && (
                        <tr>
                            <td style={{ border: '1px solid black', padding: '4px' }}>{courtesyPhoneDetails.chargerName}</td>
                            <td style={{ border: '1px solid black', padding: '4px' }}>${courtesyPhoneDetails.chargerBond}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Costs */}
            <div style={{ float: 'right', marginTop: '20px' }}>
                <h3>Totals</h3>
                <p><strong>Bond:</strong> ${costDetails.bond}</p>
                <p><strong>Service Fee:</strong> ${costDetails.serviceFee}</p>
                <p><strong>GST:</strong> ${costDetails.gst}</p>
                <p><strong>Total (including GST):</strong> ${costDetails.totalWithGst}</p>
            </div>

            {/* Contact Information */}
            <div style={{ clear: 'both', marginTop: '40px', borderTop: '1px solid black', paddingTop: '10px' }}>
                <p><strong>Contact Us</strong></p>
                <p>Phone: 1234567</p>
            </div>
        </div>
    );
}

export default Invoice;

