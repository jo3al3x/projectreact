import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    
    const headerStyle = {
        minHeight: '15vh',
        backgroundColor: '#2C3E50'
    };
    const taglineStyle = {
        minHeight: '15vh',
        backgroundColor: '#2C3E50'
    }

    return(<>
    <header class="row" style={headerStyle}>
        <div class="col-12 col-md-12 col-lg-8 text-center text-white display-5" 
             style={taglineStyle}> Phone Fix Booking System
        </div>

        <div class="col-12 col-md-12 col-lg-4">
            <div class="row">
                {/*Button 1*/}
                <Link to="/" class="col-12 col-md-6 col-lg-6 p-0 m-0 border border-dark text-center text-white" 
                      style={{
                          textDecoration: 'none', 
                          backgroundColor: location.pathname === '/' ? '#8dbb70' : '#5f9da0'
                      }}>HOME</Link>                 
                
                {/*Button 2*/}
                <Link to="/advancedJS" class="col-12 col-md-6 col-lg-6 p-0 m-0 border border-dark text-center text-white" 
                      style={{
                          textDecoration: 'none', 
                          backgroundColor: location.pathname === '/advancedJS' ? '#8dbb70' : '#5f9da0'
                      }}>EXTENSION</Link>              
            </div>
        </div>
    </header>     
    </>);
}

export default Header;