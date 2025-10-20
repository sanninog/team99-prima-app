import { AppProvider, Frame, Navigation } from "@shopify/polaris";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import translations from "@shopify/polaris/locales/en.json";

export default function App() {
  const location = useLocation();

  const navigationItems = [
    {
      label: "Home",
      url: "/",
      selected: location.pathname === "/",
    },
    {
      label: "Products",
      url: "/products",
      selected: location.pathname === "/products",
    },
  ];

  return (
    <AppProvider i18n={translations}>
      <Frame
        navigation={
          <Navigation location={location.pathname} items={navigationItems} />
        }
      >
        <Outlet />
      </Frame>
    </AppProvider>
  );
}
