import logo from './logo.png'
import { FaPerson, FaAddressBook } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";

const NavBar = ({show}) => {
    return (
        <div className={show ? 'sidebar active' : 'sidebar'}>
            <img src={logo} alt='Logo' className='logo' />
            <ul>
                <li>
                    <a href="/"><IoMdHome />Home</a>
                </li>
                <li>
                    <a href="/">Outer</a>
                </li>
                <li>
                    <a href="/">Top</a>
                </li>
                <li>
                    <a href="/">Pants</a>
                </li>
                <li>
                    <a href="/">Skirt</a>
                </li>
                <li>
                    <a href="/">Shoes</a>
                </li>
                <li>
                    <a href="/"><FaPerson />About us</a>
                </li>
                <li>
                    <a href="/"><FaAddressBook /> Contact us</a>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;
