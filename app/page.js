import Image from "next/image";
import styles from "./page.module.css";
import Notes from "@/components/notes/notes";

export default function Home() {
  return (
    <div className={styles.main}>
      <Notes/>
    </div>
  );
}
