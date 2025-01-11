import React from "react";

const BioDigitalEmbed = () => {
  return (
    <div style={{ maxWidth: "100%", aspectRatio: "4 / 3", overflow: "hidden" }}>
      <iframe
        id="embedded-human-1"
        frameBorder="0"
        style={{
          aspectRatio: "5 / 3",
          width: "100%",
        }}
        allowFullScreen
        loading="lazy"
        src="https://human.biodigital.com/viewer/?id=5unU&ui-anatomy-descriptions=true&ui-anatomy-pronunciations=true&ui-anatomy-labels=true&ui-audio=true&ui-chapter-list=false&ui-fullscreen=true&ui-help=true&ui-info=true&ui-label-list=true&ui-layers=true&ui-skin-layers=true&ui-loader=circle&ui-media-controls=full&ui-menu=true&ui-nav=true&ui-search=true&ui-tools=true&ui-tutorial=false&ui-undo=true&ui-whiteboard=true&initial.none=true&disable-scroll=false&load-rotate=20&uaid=LzzTV&paid=o_2d9121fc"
        title="BioDigital Human Viewer"
      ></iframe>
    </div>
  );
};

export default BioDigitalEmbed;
