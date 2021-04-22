import { useRouter } from "next/router";
import Layout from "@/components/Layout";

import { API_URL } from "@/config/index";

export default function EventPage({ evt }) {
  const router = useRouter();

  return (
    <Layout title={`Event ${router.query.slug}`}>
      <h1>{evt.name}</h1>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);

  const evts = await res.json();

  const paths = evts.map((ev) => ({
    params: { slug: ev.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);

  const evts = await res.json();

  return {
    props: {
      evt: evts[0],
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);

//   const evts = await res.json();

//   return {
//     props: {
//       evt: evts[0],
//     },
//   };
// }
