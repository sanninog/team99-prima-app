import { useEffect } from "react";
import { Page, Text } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function HomePage() {
  const app = useAppBridge();

  useEffect(() => {
    app.dispatch({
      type: "APP::NAVIGATION::UPDATE",
      payload: {
        items: [
          {
            label: "Home",
            destination: "/",
          },
          {
            label: "Products",
            destination: "/products",
          },
        ],
      },
    });
  }, [app]);

  return (
    <Page title="Home">
      <Text variant="bodyMd">Welcome to your Shopify App!</Text>
    </Page>
  );
}
