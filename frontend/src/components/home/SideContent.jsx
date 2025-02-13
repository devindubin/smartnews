import React from "react";

const SideContent = () => {
  const items = [
    { id: 1, text: "All your news in one place" },
    { id: 2, text: "Sentiment scored by fully transparent AI" },
    { id: 3, text: "Know what to trust" },
  ];

  return (
    <>
      <h1>SmartNews</h1>
      <ul>
        {items.map((item) => {
          return <li key={item.id}>{item.text}</li>;
        })}
      </ul>
    </>
  );
};

export default SideContent;
