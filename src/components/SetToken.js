import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

const SetToken = ({setAuthenticated}) => {

    const navigate = useNavigate();
    useEffect(() => {
        const processCallback = () => {
          const params = new URLSearchParams(window.location.search);
    
          // Extract token or error
          const token = params.get('token');
          console.log(params);
          console.log(token);
          if (token) {
            localStorage.setItem('token', token);
            setAuthenticated(true)
            // Redirect to the email page
            navigate('/inbox');
          }
          
        };
    
        processCallback();
      }, []);
    return <div>Setting Token</div>
}
export default SetToken