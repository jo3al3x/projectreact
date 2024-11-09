import { useNavigate } from 'react-router-dom'; 

function FormButtons() {
    const navigate = useNavigate();  

    return (
        <>
            <input 
                type="submit" 
                className="btn me-3 text-dark bg-white" 
                style={{width: '5em'}} 
                value="SUBMIT" 
            />
            <input 
                type="reset" 
                className="btn me-3 text-dark bg-white" 
                style={{width: '5em'}} 
                value="RESET" 
            />
            <input 
                type="button" 
                className="btn me-3 text-dark bg-white" 
                style={{width: '5em'}} 
                value="FAQ" 
                onClick={() => navigate('/faq')} 
            />
        </>
    );
}

export default FormButtons;