import styles from "@/app/ui/notFound/notFound.module.css";
import Link from "next/link"



function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <div className={styles.msg}>Page Not Found</div>
        <Link href={'/dashboard'} className={styles.btnHome}>Go Home</Link>
    </div>
  );
}

export default NotFoundPage;
