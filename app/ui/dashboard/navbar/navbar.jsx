"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {MdSearch,MdPerson} from "react-icons/md";
import { Modal } from 'react-responsive-modal';
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import 'react-responsive-modal/styles.css';
import styles from "./navbar.module.css";


const Navbar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setSearch('')
    setClients([])
  };

  const fetchPatients = async (name) => {
    if(name.length > 2){
      setLoading(true)
      const res = await fetch(`http://localhost:3000/api/patients/${name}`);
      const data = await res.json();
      setLoading(false);
      setClients(data.allStaff)
    }
  }

  useEffect( () =>{
    fetchPatients(search)
  },[search])


  return (
    <>
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <form action="" className={styles.searchForm}>
          <MdSearch className={styles.searchIcon}/>
          <input type="text" className={styles.searchInput} placeholder="Search..." onClick={onOpenModal}/>
          </form>
        </div>

      </div>
    </div>

    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <h4 className={styles.header}>Enter {"Patient's"} Name</h4>
        <input type="text" value={search || ""} onChange={ (e) => setSearch(e.target.value)}  placeholder="search by name" className={styles.inputSearch}/>
        <hr className={styles.hr}/>
        <div className={styles.userList}>
          <ul className={styles.ul}>
            <>
            {
              clients && clients.length > 0 && clients.map( (client) => (
                <Link key={uuidv4()} href={`/dashboard/clients/data/${client.slug}-${client._id}`} className={styles.userListLink}  onClick={onCloseModal}>
                  <MdPerson className={styles.pat_icon}/> 
                  <li className={styles.pat_name}>{`${client.firstName} ${client.middleName !== null ? client.middleName : ''} ${client.lastName}`}</li>
                </Link>
              )
            )
          }
          </>
</ul>

            {
              !loading && search.length > 2 && clients.length < 1 && <p className={styles.noRecord}>No record found for {search}</p>
            }
            {
              loading && <p className={styles.fetching}>fetching Data ...</p>
            }
        </div>
      </Modal>
    </div>
    </>
  );
};

export default Navbar;
