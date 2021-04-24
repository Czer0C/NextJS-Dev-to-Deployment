import { parseCookies } from "@/helpers/helpers";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";

export default function DashboardPage({ evts }) {
  const deleteEvent = (evtId) => {
    console.log(evtId);
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard Page</h1>
        <h3>My Events</h3>

        {evts.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const evts = await res.json();

  return {
    props: {
      evts,
    },
  };
}
