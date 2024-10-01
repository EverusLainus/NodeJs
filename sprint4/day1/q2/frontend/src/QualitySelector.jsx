import { useState } from "react";

export const QualitySelector = () => {
  const [selectedQuality, setSelectedQuality] = useState("");

  const qualities = [{ label: "240p", src: "http://localhost:3000/" }];
  return (
    <div>
      <div>
        <label>choose a quality: </label>
        <select
          onChange={(e) => {
            setSelectedQuality(e.target.value);
          }}
          value={selectedQuality}
        >
          {qualities.map((quality, index) => {})}
        </select>
      </div>
    </div>
  );
};
