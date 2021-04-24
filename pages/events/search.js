import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Link from "next/link";
import qs from "qs";

import { API_URL } from "@/config/index";

export default function SearchPage({ evts, term }) {
  return (
    <Layout title={`Search Results For: ${term}`}>
      <Link href="/events">
        <a className="btn-secondary">Go back</a>
      </Link>
      <h1>
        Search results for{" "}
        <u>
          <i>{term}</i>
        </u>
      </h1>
      {evts && evts.length === 0 && <h3>No events to show</h3>}

      {evts && evts.map((ev) => <EventItem key={ev.name} evt={ev} />)}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);

  const evts = await res.json();

  return {
    props: {
      evts: evts,
      term,
    },
  };
}
