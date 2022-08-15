import s from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import SideContent from "../../pages/SideContent";
function MainLayout() {
  return (
    <section className={s.wrapper}>

      <main>
        <Outlet />
      </main>

      <aside>
        <SideContent />
      </aside>
    </section>
  );
}

export default MainLayout;
