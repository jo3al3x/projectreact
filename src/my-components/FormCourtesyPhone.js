import { useState } from 'react';

function FormCourtesyPhone({ passDataToParent, customerType }) {  // Add customerType prop
    const courtesyList = [
        { id: 0, type: 'none', name: 'none', bond: 0 },
        { id: 1, type: 'phone', name: 'iphone', bond: 275 },
        { id: 2, type: 'phone', name: 'samsung galaxy', bond: 100 },
        { id: 3, type: 'phone', name: 'nokia', bond: 100 },
        { id: 4, type: 'charger', name: 'iphone charger', bond: 30 },
        { id: 5, type: 'charger', name: 'samsung charger', bond: 30 },
        { id: 6, type: 'charger', name: 'nokia charger', bond: 30 },
    ];

    const [phoneBorrow, setPhoneBorrow] = useState(0);
    const [chargerBorrow, setChargerBorrow] = useState(0);

    const updateParent = (phoneId, chargerId) => {
        const phone = courtesyList.find(item => item.id === phoneId);
        const charger = courtesyList.find(item => item.id === chargerId);
        
        // set bond to 0 for business customers
        const bondMultiplier = customerType === 'business' ? 0 : 1;
        const totalBond = (phone.bond + charger.bond) * bondMultiplier;

        passDataToParent({
            phoneName: phone.name,
            phoneBond: phone.bond * bondMultiplier,
            chargerName: charger.name,
            chargerBond: charger.bond * bondMultiplier,
            totalBond: totalBond,
        });
    };

    
    const addPhone = (selectedOption) => {
        const phoneId = selectedOption === 'none' ? 0 : Number(selectedOption);
        setPhoneBorrow(phoneId);
        updateParent(phoneId, chargerBorrow);
    };

    const addCharger = (selectedOption) => {
        const chargerId = selectedOption === 'none' ? 0 : Number(selectedOption);
        setChargerBorrow(chargerId);
        updateParent(phoneBorrow, chargerId);
    };

    return (
        <>
            <h2>Courtesy Phone</h2>

            <h4>Choose a phone: </h4>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Item Type</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    id="phoneList"
                    onChange={(e) => addPhone(e.target.value)}
                >
                    <option value="none" selected>None</option>
                    <option value="1">iPhone</option>
                    <option value="2">Samsung Galaxy</option>
                    <option value="3">Nokia</option>
                </select>
            </div>

            <h4>Choose a charger: </h4>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Item Type</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    id="chargerList"
                    onChange={(e) => addCharger(e.target.value)}
                >
                    <option value="none" selected>None</option>
                    <option value="4">iPhone Charger</option>
                    <option value="5">Samsung Charger</option>
                    <option value="6">Nokia Charger</option>
                </select>
            </div>

            <div className="row mt-2 ms-3 me-3 bg-white">
                <table className="table table-bordered" id="borrowItems">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phoneBorrow !== 0 && (
                            <tr>
                                <td>{courtesyList.find(item => item.id === phoneBorrow).name}</td>
                                <td>{customerType === 'business' ? 0 : courtesyList.find(item => item.id === phoneBorrow).bond}</td>
                            </tr>
                        )}
                        {chargerBorrow !== 0 && (
                            <tr>
                                <td>{courtesyList.find(item => item.id === chargerBorrow).name}</td>
                                <td>{customerType === 'business' ? 0 : courtesyList.find(item => item.id === chargerBorrow).bond}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default FormCourtesyPhone;


