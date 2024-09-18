import { Link } from "react-router-dom";

const Header = ( {setParentPage}) => {
  return (
    <header>
      <Link to="/" onClick={() => setParentPage("home")}><h1 id="header-title">Ryan Hill Studio</h1></Link>
    </header>
  )
}

export default Header;