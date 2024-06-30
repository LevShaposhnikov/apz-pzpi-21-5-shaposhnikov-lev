import { ComponentType } from "react";
import { CARS_ROUTE, CUSTOMERS_ROUTE, FEEDBACKS_ROUTE, INSURANCES_ROUTE, MAINTENANCES_ROUTE, MAIN_ROUTE, RENTALS_ROUTE } from "./consts";
import { MainPage } from "./pages/MainPage";
import { Cars } from "./pages/Cars";
import { Customers } from "./pages/Customers";
import { Feedbacks } from "./pages/Feedbacks";
import { Insurances } from "./pages/Insurances";
import { Maintenances } from "./pages/Maintenances";
import { Rentals } from "./pages/Rentals";

interface RouteData {
    path: string,
    Component: ComponentType,
}

export const applicationRoutes: RouteData[] = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: CARS_ROUTE, Component: Cars },
    { path: CUSTOMERS_ROUTE, Component: Customers },
    { path: FEEDBACKS_ROUTE, Component: Feedbacks },
    { path: INSURANCES_ROUTE, Component: Insurances },
    { path: MAINTENANCES_ROUTE, Component: Maintenances },
    { path: RENTALS_ROUTE, Component: Rentals },
]