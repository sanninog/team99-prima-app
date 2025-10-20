// app/routes/app.products.jsx
import { useLoaderData } from "react-router";
import { json } from "@remix-run/node"; // ✅ correzione qui
import { authenticate } from "../shopify.server.js";
import { Page, Card, ResourceList, Text } from "@shopify/polaris";

// Loader per ottenere i prodotti dal backend Shopify
export const loader = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `);

  const result = await response.json();

  return json(result.data.products.edges.map((edge) => edge.node));
};

// Componente React per visualizzare i prodotti
export default function Products() {
  const products = useLoaderData();

  return (
    <Page title="Products">
      <Card>
        <ResourceList
          resourceName={{ singular: "product", plural: "products" }}
          items={products}
          renderItem={(item) => {
            return (
              <ResourceList.Item id={item.id}>
                <Text variant="bodyMd">{item.title}</Text>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    </Page>
  );
}
