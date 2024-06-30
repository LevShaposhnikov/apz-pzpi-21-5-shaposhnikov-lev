import React, { ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CARS_ROUTE, CUSTOMERS_ROUTE, FEEDBACKS_ROUTE, INSURANCES_ROUTE, MAINTENANCES_ROUTE, MAIN_ROUTE, RENTALS_ROUTE } from "../../consts";


interface IProps {
  children: ReactNode;
}

interface ILink {
  link: string;
  text: string;
  roles?: string[];
}

const applicationLinks: ILink[] = [
  { link: CARS_ROUTE, text: "Cars" },
  { link: CUSTOMERS_ROUTE, text: "Customers" },
  { link: FEEDBACKS_ROUTE, text: "Feedbacks" },
  { link: INSURANCES_ROUTE, text: "Insurances" },
  { link: MAINTENANCES_ROUTE, text: "Maintenances" },
  { link: RENTALS_ROUTE, text: "Rentals" },
];

export const Navbar = ({ children }: IProps) => {

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
          <div className="container">
            <NavLink to={MAIN_ROUTE} className="navbar-brand">
              Car Rent
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
              <ul className="navbar-nav flex-grow-1">
                {applicationLinks.map(({ link, text }) => (
                  <li className="nav-item" key={link}>
                    <NavLink to={link} className="nav-link text-dark">
                      {text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <main role="main" className="pb-3">
          {children}
        </main>
      </div>
    </div>
  );
};
