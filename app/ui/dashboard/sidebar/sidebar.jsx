import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { v4 as uuidv4 } from "uuid";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdOutlineSettings,
  MdLogout,
  MdPeople,
  MdPersonAdd,
} from "react-icons/md";


import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Facility",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Add Facility",
        path: "/dashboard/users/add",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Add Clients",
        path: "/dashboard/clients/add",
        icon: <MdPersonAdd/>,
      },
      {
        title: "Clients",
        path: "/dashboard/clients",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];




const Sidebar = async () => {
  const { user } = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={user?.img || "/ghs.png"}
          alt=""
          width="50"
          height="50"
          priority={true}
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.name}</span>
          <span className={styles.userTitle}>{user.isAdmin ? 'Administrator' : 'Editor'}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              
              <MenuLink staff={user} item={item} key={uuidv4()} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
