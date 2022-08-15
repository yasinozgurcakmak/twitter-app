import s from "./Button.module.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Button({
  children,
  isLoading = false,
  color,
  variant,
  type = "button",
  icon,
  fab = false,
  bubbling = true,
  onClick = () => null, 
  ...rest
}) {
  const className = `${s.btn} ${s[color]} ${s[variant]} ${fab ? s.fab : ""}`;

  // Event Bubbling blocked
  const clickHandler = (event) => {
    if (bubbling) {
      onClick(event);
    } else {
      event.stopPropagation();
      event.preventDefault();
      onClick(event);
    }
  };
  return (
    <button
      className={className}
      type={type}
      disabled={isLoading}
      onClick={clickHandler}
      {...rest}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className={s.loadingIcon} />
      ) : (
        icon
      )}
      {!isLoading && children}
    </button>
  );
}

export default Button;
