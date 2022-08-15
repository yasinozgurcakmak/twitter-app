import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { postTwitAction } from "../../store/actionCreators";
import { FiSend } from "react-icons/fi";
import s from "./TweetForm.module.scss";
import { useRef, useState } from "react";

import Card from "../Card/Card";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Image from "../Image/Image";
import { FaCameraRetro } from "react-icons/fa";

const twitFormSchema = yup.object({
  text: yup.string().required().max(250).min(5),
});

function TweetForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [imgPreviewURL, setImgPreviewURL] = useState(null);
  const inputRef = useRef(null);

  const sendTwit = async (values, { resetForm }) => {
    const newTwit = { text: values.text, user: user.id };
    const file = inputRef.current.files[0];
    console.log(file);

    await dispatch(postTwitAction(newTwit, file));
    setImgPreviewURL(null);
    resetForm();
  };

  const openInput = () => {
    inputRef.current.click();
  };

  const selectPicture = (e) => {
    const file = inputRef.current.files[0]; 

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgPreviewURL(reader.result);
    });
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImgPreviewURL(null); 
    }
  };
  return (
    <Card padding>
      <h3 className={s.title}>Send A twiit</h3>
      <Formik
        initialValues={{ text: "" }}
        onSubmit={sendTwit}
        validationSchema={twitFormSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={Input}
              type="textarea"
              name="text"
              placeholder="Enter Your Twit ..."
              label="Your Twit"
            />
            {imgPreviewURL && (
              <div className={s.imageContainer}>
                <Image
                  src={imgPreviewURL}
                  border={false}
                  variant="rectangle"
                  size="large"
                  block
                />
              </div>
            )}

            <div className={s.actionWrapper}>
              <input type="file" ref={inputRef} onChange={selectPicture} />

              <Button icon={<FaCameraRetro />} fab onClick={openInput}></Button>
            </div>

            <Button
              type="submit"
              color="primary"
              variant="regular"
              isLoading={isSubmitting}
              icon={<FiSend />}
            >
              Twit
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default TweetForm;
