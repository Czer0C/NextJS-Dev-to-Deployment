import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function EventPage() {
  const router = useRouter();

  console.log({ router });

  return (
    <Layout title={`Event ${router.query.slug}`}>
      <h1>My Event: {JSON.stringify(router.query.slug)}</h1>
      <button onClick={() => router.push("/")}>Push home</button>
    </Layout>
  );
}
