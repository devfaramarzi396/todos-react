import { NavLink } from 'react-router-dom'
const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" activeClassName="active" exact>Todo-App</NavLink>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/" activeClassName="active" exact>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/todos" activeClassName="active">Todos</NavLink>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header