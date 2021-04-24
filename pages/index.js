import Link from "next/link";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

export default function Home({ evts }) {
  return (
    <Layout>
      <center>
        <h1>Home</h1>
      </center>
      {evts && evts.length === 0 && <h3>No events to show</h3>}

      {evts && evts.map((ev) => <EventItem key={ev.name} evt={ev} />)}

      {evts && evts.length > 0 && (
        <Link href="/events">
          <center>
            <a className="btn-secondary ">View All Events</a>
          </center>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const evts = await res.json();

  return {
    props: {
      evts,
    },
    revalidate: 10,
  };
}
