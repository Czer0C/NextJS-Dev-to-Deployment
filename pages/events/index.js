import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";

export default function EventsPage({ evts, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {evts && evts.length === 0 && <h3>No events to show</h3>}

      {evts && evts.map((ev) => <EventItem key={ev.name} evt={ev} />)}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const getTotal = await fetch(`${API_URL}/events/count`);

  const total = await getTotal.json();

  const getEvents = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );

  const evts = await getEvents.json();

  return {
    props: {
      evts: evts,
      page: +page,
      total,
    },
  };
}
