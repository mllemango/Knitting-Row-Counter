// component's from slate's example
// https://github.com/ianstormtaylor/slate/blob/master/site/components.tsx
import React, { Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { cx, css } from "emotion";

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : '#919191'};
        `
      )}
    />
  )
);

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
));

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        padding: 5px 0px 5px 15px;
        border-bottom: 2px solid #eee;
        margin-bottom: 20px;
      `
    )}
  />
));
