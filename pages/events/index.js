import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

export default function EventsPage({ evts }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {evts && evts.length === 0 && <h3>No events to show</h3>}

      {evts && evts.map((ev) => <EventItem key={ev.name} evt={ev} />)}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);

  const evts = await res.json();

  return {
    props: {
      evts: evts,
    },
    revalidate: 10,
  };
}
