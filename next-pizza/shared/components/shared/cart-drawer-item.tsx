import React from "react";

interface Props {
  className?: string;
}

export const CartDrawerItem = ({ className }: Props) => {
  return <div className={className}>CartDrawerItem</div>;
};