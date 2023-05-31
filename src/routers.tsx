import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Catalog from "./pages/catalog/catalog";
import { DefaultLayout } from "./components/layout/default";
import Main from "./pages/main/main";
import About from "./pages/about/about";
import Contacts from "./pages/contacts/contacts";
import ItemPage from "./pages/itemPage/itemPage";
import ErrorPage from "./pages/error/404error";
import CartPage from "./pages/cart/cart";

interface RoutesProps {}

export default class CustomRoutes extends React.Component<RoutesProps> {
  render() {
    const routes: JSX.Element[] = [];
    const defRoutes: JSX.Element[] = [];
    let key = 1;

    defRoutes.push(
      <Route key={`route_${key++}`} path="/" element={<Main />} />
    );

    defRoutes.push(
      <Route key={`route_${key++}`} path="/catalog" element={<Catalog />} />
    );

    defRoutes.push(
      <Route
        key={`route_${key++}`}
        path="/catalog/:id"
        element={<ItemPage />}
      />
    );

    defRoutes.push(
      <Route key={`route_${key++}`} path="/about" element={<About />} />
    );

    defRoutes.push(
      <Route key={`route_${key++}`} path="/contacts" element={<Contacts />} />
    );

    defRoutes.push(
      <Route key={`route_${key++}`} path="/cart" element={<CartPage />} />
    );

    defRoutes.push(
      <Route key={`route_${key++}`} path="*" element={<ErrorPage />} />
    );

    if (defRoutes.length > 0)
      routes.push(
        <Route key={`route_${key++}`} element={<DefaultLayout />}>
          {defRoutes}
        </Route>
      );

    return <Routes>{routes}</Routes>;
  }
}
