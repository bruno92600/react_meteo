import '../css/Header.css'

function Header() {
  return (
    <ul className="navbar">
        <li className="nav-item">
            Météo
            <div className="ping"></div>
            </li>
        <li className="nav-item">Alerte</li>
        <li className="nav-item">Plan</li>
        <li className="nav-item">Satelite</li>
        <li className="nav-item">News</li>
    </ul>
  )
}

export default Header