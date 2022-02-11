import { useState } from "react";
import ProjectModal from "../ProjectModal";
import styles from "./styles.module.scss";

import "react-multi-carousel/lib/styles.css";

export function ProjectCard(props) {
  const [showModal, setShowModal] = useState(false);
  const projetos = props.projetos;

  return (

    <div key={projetos.id}>
      <div className={styles.card}>
        <img src={projetos.image}/>
        <h2>{projetos.name}</h2>
        <button
          href={projetos.link}
          onClick={() => setShowModal(true)}
          className={styles.bt}
        >
          <p>Saiba Mais</p>
        </button>
      </div>

      <ProjectModal onClose={() => setShowModal(false)} show={showModal}>
        <div className={styles.modal} key={projetos.id}>
          <div className={styles.projeto}>
            <h1>{projetos.title}</h1>
            <div className={styles.image}>
              <img src={projetos.src}/>
            </div>
            <p>{projetos.description}</p>
          </div>

          <div className={styles.membros}>
            <h1>Membros</h1>
            <div className={styles.gridMember}>
              {projetos.members.map((members) => (
                <div className={styles.gridItem}>
                  <div className={styles.item}>
                        <img src={members.img} />
                  </div>
                  <p>
                    {members.name}
                    <br />
                    {members.cargo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProjectModal>

    </div>
  );
}
