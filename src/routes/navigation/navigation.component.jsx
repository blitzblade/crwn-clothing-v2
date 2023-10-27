import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.jsx'

import CartIcon from '../../components/cart-icon/cart-icon.component';

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                <div>
                    <CrwnLogo className='logo'/>
                </div>
                </LogoContainer>
                
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                
                    {
                    currentUser ? (
                        <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to='/auth'>
                        SIGN IN
                        </NavLink>
                    )
                    }
                    <CartIcon />
                </NavLinks>
                { isCartOpen && <CartDropdown /> }
            </NavigationContainer>
        <Outlet />
        </>
    )
}

export default Navigation;