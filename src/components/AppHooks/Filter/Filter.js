import React, {Component} from "react";

export  default  function Filter({onSetFilter}) {
    return(
        <label >
            Find contact by name
            <input type="text" onChange={(e)=>onSetFilter(e.target.value)}  />
        </label>

    )
}
