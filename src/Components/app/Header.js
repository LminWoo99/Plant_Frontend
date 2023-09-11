import myImage from './plant.png';
import '../../css/header.css'
function Header() {
	return (
		
		<header className="header">
			
			<div className="container text-center">
			<img src={myImage}
			className="logo"/>
			<h1>식구하자</h1>
			</div>
		</header>
	);
}

export default Header;