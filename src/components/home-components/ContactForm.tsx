import emailjs from "emailjs-com";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("../Modal"), { ssr: false });
const ContactForm = () => {
  // const initialValues = { name: "", email: "", subject: "", message: "" };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };
  const [submitted, setSubmitted] = useState(false);
  // const [isSubmitting, SetIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID!,
        e.target as HTMLFormElement,
        process.env.EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setSubmitted(true);
        },
        (error) => {
          setError(error.text);
        }
      );
  }
  const closeModal = () => setSubmitted(false);

  return (
    <section id="contact">
      {submitted && (
        <Modal title="Email" onCancelModal={closeModal}>
          <h3>Email is sent</h3>
        </Modal>
      )}
      {error && (
        <Modal title="Email" onCancelModal={closeModal}>
          <h3>{error} </h3>
        </Modal>
      )}
      {submitted && window.addEventListener("click", () => setSubmitted(false))}
      {error && window.addEventListener("click", () => setError(false))}

      <form className="contact__form" onSubmit={sendEmail}>
        <input
          minLength={5}
          maxLength={20}
          required
          type="text"
          placeholder="Name"
          // onChange={(event) => setName(event.target.value)}
        />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Subject" required maxLength={24} />
        <textarea
          required
          maxLength={150}
          minLength={6}
          name="message"
          placeholder="Message"
          // onChange={(event) => setMessage(event.target.value)}
        ></textarea>
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
};

export default ContactForm;
