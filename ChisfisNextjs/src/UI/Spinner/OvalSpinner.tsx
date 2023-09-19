import React from "react";
import { Oval } from "react-loader-spinner";

interface OvalSpinner {
  color: string;
  height: number;
  width: number;
  visible:boolean
}

function OvalSpinner({ color, height, width, visible }: OvalSpinner) {
  return (
    <Oval
      height={height}
      width={width}
      color={color}
      wrapperStyle={{}}
      wrapperClass=""
      visible={visible}
      ariaLabel="oval-loading"
      secondaryColor={color}
      strokeWidth={6}
      strokeWidthSecondary={6}
    />
  );
}

export default OvalSpinner;
