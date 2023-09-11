import "../../css/footer.css"

function Footer() {
	return (
		<footer className="py-4 text-light footer" style={{ backgroundColor: "#EFFBF5", border: "2px solid #BCE2C1" }}>
          <div className="container text-center">
            <ul className="nav justify-content-center mb-3">
              <li className="nav-item">
                <a className="nav-link text-light" href="/">Top</a>
              </li>
            </ul>

            <p>
              <small>Copyright &copy;MinWoo Lee</small>
            </p>
          </div>
        </footer>
	);
}

export default Footer;