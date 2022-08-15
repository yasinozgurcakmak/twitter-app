import cc from "classcat";
import s from "./Card.module.scss";

function Card({
  children,
  className,
  padding = false,
  shadow = true,
  border = true,
  hoverable = false,
  relative = false,
  onClick = () => null,
}) {
  const classNames = cc({
    [s.card]: true,
    [s.padding]: padding, 
    [s.shadow]: shadow,
    [s.border]: border,
    [s.hover]: hoverable,
    [s.relative]: relative,
    [className]: true, 
  });

  return (
    <div className={classNames} onClick={onClick} tabIndex={1}>
      {children}
    </div>
  );
}

export default Card;
