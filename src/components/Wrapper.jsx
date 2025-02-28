import "./Wrapper.css";

import Minimize from "../assets/minmize.svg";
import Maximize from "../assets/maximize.svg";
import Close from "../assets/close.svg";
import Right from "../assets/Right.svg";
import Left from "../assets/Left.svg";
import Lock from "../assets/lock.svg";
import Hamburger from "../assets/Hamburger.svg";
import Plus from "../assets/Plus.svg";
import Tab from "../assets/Tab.svg";

export default function Wrapper({ title, children }) {
  return (
    <main className="wrapper">
      <section className="upper-nav">
        <div className="tab">
          <object data={Tab} type="image/svg+xml"></object>
          <object data={Plus} type="image/svg+xml"></object>
        </div>
        <div className="window-controls">
          <button className="Window-btn btn" aria-label="Minimize">
            <object type="image/svg+xml" data={Minimize}></object>
          </button>

          <button className="Window-btn btn" aria-label="Maximize">
            <object type="image/svg+xml" data={Maximize}></object>
          </button>

          <button class="Window-btn btn" aria-label="Close">
            <object type="image/svg+xml" data={Close}></object>
          </button>
        </div>
      </section>
      <section className="lower-nav">
        <div className="nav-controls">
          <button className="btn">
            <object type="image/svg+xml" data={Left}></object>
          </button>
          <button className="btn">
            <object data={Right} type="image/svg+xml"></object>
          </button>
        </div>
        <div className="address-bar">
          <object data={Lock} type="image/svg+xml"></object>
          <h3 className="text">{title}</h3>
        </div>
        <div className="nav-controls">
          <button className="btn ham">
            <object data={Hamburger} type="image/svg+xml"></object>
          </button>
        </div>
      </section>

      <section>{children}</section>
    </main>
  );
}
