import Form from "components/Form";
import Layout from "layouts/Dashboard";
import { gitFetcher } from "lib/fetcher";
import { ACTION } from "lib/strings";
import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useMemo, useState, useReducer, createContext, useEffect } from "react";
import useSWR from "swr";
import { SuperWrestler } from "types/app";
import type { Organization } from "types/octokit";
import { init, reducer, type ACTIONTYPE } from "reducers/Form";

interface iGlobalContext {
  mode: "init" | "edit";
  state: Partial<SuperWrestler>;
  dispatch: (payload: ACTIONTYPE) => void;
}

export const GlobalContext = createContext<iGlobalContext>({
  mode: "init",
  state: {},
  dispatch: () => {},
});

interface SubmitProps {
  id: string;
  wrestler: SuperWrestler;
  hallOfFame: boolean;
}

const Submit = ({ hallOfFame, id, wrestler }: SubmitProps) => {
  const { data: session } = useSession();
  const [state, dispatch] = useReducer(reducer, init);

  const { data: orgs = [], error } = useSWR<Organization[]>(
    [!hallOfFame && `/user/orgs`, session?.accessToken],
    gitFetcher
  );

  const toSubmit = useMemo(
    () => orgs?.filter((org) => String(org.id) === id)[0],
    [orgs, id]
  );

  const fields = useMemo(
    () => ({
      ...(!hallOfFame ? init : wrestler),
      ...(!hallOfFame && {
        id: toSubmit?.["id"],
        identity: toSubmit?.["avatar_url"],
        description: toSubmit?.["description"],
        slug: toSubmit?.["login"],
        alias: toSubmit?.["login"],
      }),
    }),
    []
  );

  useEffect(() => dispatch({ type: "PAYLOAD", data: fields }), [fields]);

  return (
    <Layout>
      <GlobalContext.Provider
        value={{ state, dispatch, mode: hallOfFame ? "edit" : "init" }}
      >
        {state && <Form />}
      </GlobalContext.Provider>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let wrestler;
  let hallOfFame = false;

  try {
    wrestler = await fetch(ACTION + `/wrestlers/${params?.wrestler}`);
  } catch (error) {
    hallOfFame = false;
  }

  return {
    props: {
      hallOfFame,
      id: params?.wrestler,
      wrestler: hallOfFame ? wrestler : {},
    },
  };
};

export default Submit;
