import {Params, useParams} from "react-router-dom";
import React, {ComponentType} from "react";

type TParamsProps = {
  params: Params<string>;
}

function withParams(Component: any) {
  return function (props: any){
    let p = useParams()
    return <Component {...props} params={p}  />
  }
};


export default withParams