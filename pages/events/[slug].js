import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";

import { API_URL } from "@/config/index";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const router = useRouter();

  const deleteEvent = async () => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };
  return (
    <Layout title={`Event ${evt.name}`}>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString()} at {evt.time}
        </span>
        <h1>{evt.name}</h1>

        <ToastContainer />

        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: ${evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);

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
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
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
