import user from '../user';
import { Navigate } from 'react-router-dom';
function Logout() {
    user.logout()
    window.axios.post('/api/logout').then((response) => {
        console.log(response)
    })
    return (<Navigate to='/'></Navigate>)
}
export default Logout;