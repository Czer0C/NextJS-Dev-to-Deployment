import { parseCookies } from "@/helpers/helpers";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function DashboardPage({ evts, token }) {
  const router = useRouter();

  const deleteEvent = async (evtId) => {
    if (confirm("Are you sure")) {
      const res = await fetch(`${API_URL}/events/${evtId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
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
      token,
    },
  };
}
