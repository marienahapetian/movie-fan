import "../assets/styles/Footer.css";
const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-brand">
					<h2>MovieFan</h2>
					<p>Building modern and elegant digital experiences.</p>
				</div>

				<div className="footer-links">
					<h3>Quick Links</h3>
					<ul>
						<li>
							<a href="#">Home</a>
						</li>
						<li>
							<a href="#">Services</a>
						</li>
						<li>
							<a href="#">Portfolio</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
					</ul>
				</div>

				<div className="footer-social">
					<h3>Follow Us</h3>
					<div className="social-icons">
						<a href="#">Facebook</a>
						<a href="#">Twitter</a>
						<a href="#">Instagram</a>
						<a href="#">LinkedIn</a>
					</div>
				</div>
			</div>

			<div className="footer-bottom">
				<p>&copy; 2026 YourBrand. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
