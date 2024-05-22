import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" onClick={() => setParentPage("home")}><h1 className="courier-prime-regular">Ryan Hill Studio</h1></Link>
      
    </header>
  )
}

export default Header;