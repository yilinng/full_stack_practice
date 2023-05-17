import React from "react";
import { useCountry } from "../hooks";

export default function Filter() {

  const { type, value, onChange, onSubmit, filterByName } = useCountry('text')
  //https://www.reddit.com/r/reactjs/comments/up13ei/custom_hook_not_updating_in_component/
  console.log(filterByName)
  return (
    <div>
      <form onSubmit={onSubmit}>
      filter shown with:
      <input
        type={type}
        value={value}
        onChange={onChange}
      />
      <button type="submit">find</button>
      </form>

    </div>
  );
}
