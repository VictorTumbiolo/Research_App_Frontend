import { Link } from 'react-router-dom'

export function Nav() {
  return (
    <header className="app-header">
      <div className="app-header-text">
        <h1>Research Paper Graph</h1>
        <p>Explore relationships between papers and their references</p>
      </div>
      <Link to="/about" className="about-button">
        About This Project
      </Link>
    </header>
  )
}