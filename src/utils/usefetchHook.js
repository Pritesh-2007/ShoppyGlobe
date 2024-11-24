import { useState } from "react";

async function usefetch(url)
{
    const data=await fetch(url).then((data)=>data.json());
    return data;

}
export default usefetch;