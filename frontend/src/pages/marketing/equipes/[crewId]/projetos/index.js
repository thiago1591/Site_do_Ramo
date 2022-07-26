import MarketingNavBar from "../../../../../components/MarketingNavBar";
import api from "../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

import { BiPlusMedical } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import MarketingMenuRoutes from "../../../../../components/MarketingMenuRoutes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";

export default function projetos({ crew }){ 
    const router = useRouter();
	const { user, isAuthenticated } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isAuthenticated) {
			if (user === null) {
				router.push("/login");
			} else {
				setIsLoading(false);
			}
		}
	}, [user, isAuthenticated]);

    function handleSelectOption(option) {
        router.push(`${crew.id}/${option}`);    
    }

	if (isLoading) {
        return ( <></> )
    } else {
		return (
		  <div className={styles.all}>
			<MarketingNavBar page="equipes" user={user ? user : null} />
	  
			<div className={styles.pageContent}>
				<div className={styles.content}>
				  <MarketingMenuRoutes 
					  routesName={`Equipes/${crew.name}/Projetos`} 
					  routes={`equipes/${crew.id}/projetos`}
				  />
					<div className={styles.row}>
						<div className={styles.text}>
							<h1>Lista de Projetos</h1>
							<p>{crew.projects.length} Projetos</p>
						</div>
						<Link href={`/marketing/equipes/${crew.id}/projetos/criar`}>
						  <span className={styles.link}>
							<BiPlusMedical/>
							Criar Projeto
						  </span>
						</Link>
					</div>
	  
					<div className={styles.crewsList}>
						  {crew.projects.map((project) => { 
							return(
							  <div className={styles.crewRow}>
								<div className={styles.name}>
								  <img src={project.image}/>
								  <h2>{project.name}</h2>
								</div>
								<Link href={`/marketing/equipes/${crew.id}/projetos/${project.id}`}>
								  <span className={styles.gearConfig}><BsFillGearFill/></span>
								</Link>
							  </div>
							)
						  })}
					</div>
				</div>
			</div>
		  </div>
		)
	}
}

export async function getServerSideProps(ctx) {
  const { crewId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);
    
    return {
      props: {
        crew: data
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
