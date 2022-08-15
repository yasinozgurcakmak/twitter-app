import s from "./ReplyForm.module.scss";
import React from "react";
import Card from "../Card/Card";
import { Formik, Form, Field } from "formik";
import Input from "../Input/Input";
import Button from "../Button/Button";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { postReply } from "../../api";
import { fetchTwitAction } from "../../store/actionCreators";
const replyFormSchema = yup.object({
  text: yup.string().required().max(250),
});
function ReplyForm({ onCancel, onSuccess, twitId }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const reply = async (values, { resetForm }) => {
    const newReply = { text: values.text, user: user.id, twit: twitId };
    await postReply(newReply);
    await dispatch(fetchTwitAction());
    onSuccess();
  };

  return (
    <Card padding>
      Reply to twit
      <Formik
        initialValues={{ text: "" }}
        onSubmit={reply}
        validationSchema={replyFormSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={Input}
              type="textarea"
              placeholder="Enter your reply..."
              name="text"
            />

            <div className={s.actionsWrapper}>
              <Button
                type="submit"
                color="primary"
                variant="regular"
                isLoading={isSubmitting}
              >
                Reply
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default ReplyForm;
