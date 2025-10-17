import { Outlet, useLocation } from "react-router-dom";
import { AppProvider, Frame, Navigation } from "@shopify/polaris";
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <title>Team99 App</title>
      </head>
      <body>
        <AppProvider i18n={translations}>
          <Frame
            navigation={
              <Navigation location={location.pathname} items={navigationItems} />
            }
          >
            <Outlet />
          </Frame>
        </AppProvider>
      </body>
    </html>
  );
}
