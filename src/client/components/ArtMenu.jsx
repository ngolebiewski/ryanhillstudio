import React from "react";
import { Link } from "react-router-dom";

const ArtMenu = ({ parentPage, setParentPage }) => {
  return (
    <>
      <ul id="menu">
        <li><Link to="/ryan-hill" onClick={() => setParentPage("ryan-hill")}>Ryan Hill</Link></li>
        <li><Link to="/drawing" onClick={() => setParentPage("drawing")}>Drawing</Link></li>
        <li><Link to="/installation" onClick={() => setParentPage("installation")}>Installation</Link></li>
        <li><Link to="/studio" onClick={() => setParentPage("studio")}>Studio</Link></li>
        <li><Link to="/events" onClick={() => setParentPage("events")}>Events</Link></li>
        <li><Link to="/contact" onClick={() => setParentPage("contact")}>Contact</Link></li>
      </ul>
    </>
  )
}

export default ArtMenu;
