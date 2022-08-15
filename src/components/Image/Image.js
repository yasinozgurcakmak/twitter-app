import React from "react";
import cc from "classcat";
import s from "./Image.module.scss";
function Image({
  className,
  variant = "circle",
  hoverable = false,
  size = "medium", //"small" || "medium" || "large"
  onClick = () => null,
  hoverIcon,
  border = true,
  block = false,
  src,
  alt,
  ...rest
}) {
  const classNames = cc({
    [s[size]]: size,
    [s[variant]]: true,
    [s.imgWrapper]: true,
    [className]: className,
    [s.hoverable]: hoverable,
    [s.border]: border,
    [s.block]: block,
  });
  return (
    <div className={classNames} onClick={onClick} tabIndex={1}>
      {hoverable && <span className={s.hoverTint}>{hoverIcon}</span>}
      <img className={s.img} src={src} alt={alt} {...rest} />
    </div>
  );
}

export default Image;
