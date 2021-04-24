import { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Search.module.css";

export default function Search() {
  const [term, termSet] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    termSet("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => termSet(e.target.value)}
          placeholder="Search events"
        />
      </form>
    </div>
  );
}
