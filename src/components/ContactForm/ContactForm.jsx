import { ErrorMessage, Field, Form, Formik } from "formik";
import MaskedInput from "react-text-mask";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsOps";
import { useDispatch } from "react-redux";
import { useId } from "react";

import css from "./ContactForm.module.css";

export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    number: Yup.string()
      .matches(/^\d{3}-\d{3}-\d{4}$/, "Enter in the format 123-456-7891")
      .required("Phone number is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.contactForm}>
        <div className={css.divContact}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field type="text" name="name" id={nameFieldId} />
          <ErrorMessage
            className={css.formError}
            name="name"
            component="span"
          />
        </div>
        <div className={css.divContact}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field name="number">
            {({ field }) => (
              <MaskedInput
                {...field}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                placeholder="123-456-7891"
                id={numberFieldId}
                type="text"
              />
            )}
          </Field>
          <ErrorMessage
            className={css.formError}
            name="number"
            component="span"
          />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
