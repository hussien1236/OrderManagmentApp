import NavBar from './nav/NavBar';
import { Outlet } from 'react-router-dom';
const Layout = () => {
return (
    <>
        <NavBar />
        <div className='p-8'>
            <Outlet />
        </div>
    </>
)
}

export default Layout