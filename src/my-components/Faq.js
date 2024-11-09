import React, { useState } from 'react';

function FAQ() {
    const [searchTerm, setSearchTerm] = useState('');
    
    const faqData = [
        {
            question: "Why do I have to pay a service fee?",
            answer: "A service fee covers the cost of diagnosing and inspecting your device, as well as the expertise and time of our technicians. This fee is waived if your device is under warranty."
        },
        {
            question: "What is the bond for?",
            answer: "The bond is a security deposit for courtesy phones and accessories. It is fully refundable when you return the borrowed items in the same condition they were provided."
        },
        {
            question: "Do I need a charger with my courtesy phone?",
            answer: "While not mandatory, we recommend borrowing a compatible charger to ensure your courtesy phone remains powered during use. A small additional bond applies for chargers."
        }
    ];

    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid" style={{ backgroundColor: '#efffff', minHeight: '100vh' }}>
            <div className="container py-4">
                <h1 className="text-center mb-4">Phone Fix Booking FAQs</h1>
                
                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search FAQs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-warning">Search</button>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {filteredFAQs.map((faq, index) => (
                            <div key={index} className="card mb-3" style={{ backgroundColor: '#FFEFD5' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{faq.question}</h5>
                                    <p className="card-text">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQ;