import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { CreateNoteRequest } from "@/types/note";
import { createNote } from "@/lib/api";
import toast from "react-hot-toast";
import {
  ErrorMessage as FormikErrorMessage,
  Field,
  Form,
  Formik,
} from "formik";

interface NoteFormProps {
  onClose: () => void;
}
const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be less than 50 characters"),
    content: Yup.string().max(500, "Content must be less then 500 characters"),
    tag: Yup.string()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
      .required("Tag is required"),
  });

  const initialValues: CreateNoteRequest = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const handleSubmit = (values: CreateNoteRequest) => {
    noteMutation.mutate(values);
  };

  const noteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
      toast.success("Note was created");
    },
  });

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <FormikErrorMessage
            name="title"
            className={css.error}
            component="span"
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <FormikErrorMessage
            component="span"
            name="content"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <FormikErrorMessage
            component="span"
            name="tag"
            className={css.error}
          />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
