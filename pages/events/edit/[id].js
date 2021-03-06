import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { FaImage } from "react-icons/fa";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";

import styles from "@/styles/Form.module.css";
import ImageUpload from "@/components/ImageUpload";
import { parseCookies } from "@/helpers/helpers";

export default function EditEventPage({ evt, token }) {
  const [values, valuesSet] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, imagePreviewSet] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const [showModal, showModalSet] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Fill in nigga");
      return;
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    console.log(evt);

    if (!res.ok) {
      if ([403, 401].includes(res.status)) {
        toast.error(`Invalid permision, you cannot modify this event`);
      } else {
        toast.error(data.message);
      }
    } else {
      router.push(`/events/${data.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    valuesSet({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();

    imagePreviewSet(data.image.formats.thumbnail.url);
    showModalSet(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">
        <a className="btn-secondary">Go back</a>
      </Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>

        <input type="submit" value="Update Event" className="btn-info" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div> No Image Uploaded </div>
      )}

      <div>
        <button className="btn" onClick={() => showModalSet(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => showModalSet(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: { evt, token },
  };
}
