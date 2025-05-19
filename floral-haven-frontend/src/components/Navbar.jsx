import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = false; // Replace with actual auth check

    return (
        <aside className="navbar">
            <nav>
                <NavLink to="/" exact>
                    <img src="/assets/logo.png" alt="Floral Haven Logo" />
                </NavLink>

                <NavLink to="/bat" className="btn" activeClassName="active">
                    Bats
                </NavLink>

                <NavLink to="/butterfly" className="btn" activeClassName="active">
                    Butterflies
                </NavLink>

                <NavLink to="/bee" className="btn" activeClassName="active">
                    Bees
                </NavLink>

                <NavLink to="/hummingbird" className="btn" activeClassName="active">
                    Hummingbirds
                </NavLink>

                <NavLink to="/garden-layouts" className="btn" activeClassName="active">
                    Garden Layouts
                </NavLink>

                <NavLink to="/contact" className="btn" activeClassName="active">
                    Contact Us
                </NavLink>

                <NavLink to="/guest-profile" className="btn" activeClassName="active">
                    Guest Profile
                </NavLink>

                {isLoggedIn ? (
                    <>
                        <NavLink to="/profile" className="btn" activeClassName="active">
                            Profile
                        </NavLink>

                        <NavLink to="/settings" className="btn" activeClassName="active">
                            Settings
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/signup" className="btn" activeClassName="active">
                            Sign up
                        </NavLink>

                        <NavLink to="/login" className="btn" activeClassName="active">
                            Login
                        </NavLink>
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Navbar;