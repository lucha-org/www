import Card from "components/OrganizationCard";
import Layout from "layouts/Dashboard";
import { gitFetcher } from "lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import type { Organization } from "types/octokit";
import { Grid } from "@mantine/core";

const Dashboard = () => {
  const { data: session } = useSession();
  const { data: orgs, error } = useSWR<Organization[]>(
    ["/user/orgs", session?.accessToken],
    gitFetcher
  );

  return (
    <Layout>
      {orgs?.length ? (
        <Grid>
          {orgs?.map((org, index) => (
            <Card
              key={org.id}
              skeleton={!orgs}
              goto={String(org.id)}
              {...org}
            />
          ))}
        </Grid>
      ) : (
        <span> No Organizations </span>
      )}
    </Layout>
  );
};

export default Dashboard;
