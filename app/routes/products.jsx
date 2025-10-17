import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { Card, Page, ResourceList, Text } from "@shopify/polaris";
import { json } from "@remix-run/node";

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

  return json(result.data.products.edges.map(edge => edge.node));
};

export default function Products() {
  const products = useLoaderData();

  return (
    <Page title="Products">
      <Card>
        <ResourceList
          resourceName={{ singular: 'product', plural: 'products' }}
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
