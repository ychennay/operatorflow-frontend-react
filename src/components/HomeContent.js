import React from "react";
import MediaCard from "./ProductCard";

export default function HomeContent() {
  return (
    <section className="container">
      <div className="columns features">
        <div className="column is-4">
          <div className="card is-shady">
            <MediaCard />
          </div>
        </div>
        <div className="column is-4">
          <div className="card is-shady">
            <MediaCard />
          </div>
        </div>
        <div className="column is-4">
          <div className="card is-shady">
            <MediaCard />
          </div>
        </div>
      </div>
    </section>
  );
}
