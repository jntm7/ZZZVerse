import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

const AgentPage = ({ agent }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <img
                    src={agent.image}
                    alt={agent.name}
                    width={500}
                />
                <div style={{ marginLeft: '10rem' }}>
                    <h1>{agent.name}</h1>
                    <div  style= {{display: "flex", gap: "3rem" }}>
                        <div>
                            <p><strong>Element:</strong> {agent.element}</p>
                            <p><strong>Role:</strong> {agent.role}</p>
                            <p><strong>Rarity:</strong> {agent.rarity}</p>
                            <p><strong>Faction:</strong> {agent.faction}</p>
                        </div>
                        <div>
                            <p><strong>Gender:</strong> {agent.gender}</p>
                            <p><strong>Height:</strong> {agent.height} cm</p>
                            <p><strong>Birthday:</strong> {agent.birthday}</p>
                            <p><strong>Released:</strong> Version {agent.version}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Abilities</h2>
            <ul>
            {agent.abilities.map((ability) => (
                <li key={ability.id}>
                <strong>{ability.name}</strong>: {ability.description}
                </li>
            ))}
            </ul>

            <h2>Mindscape Cinemas</h2>
            <ul>
            {agent["mindscape-cinema"].map((cinema) => (
                <li key={cinema.id}>
                <strong>{cinema.name}</strong>: {cinema.description} <br />
                <em>{cinema.alt}</em>
                </li>
            ))}
            </ul>
        </div>
    );
};

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/data/agent-data.json');
  const jsonData = fs.readFileSync(filePath);
  const agents = JSON.parse(jsonData);
  
  const paths = agents.map((agent) => ({
    params: { id: agent.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/agent-data.json');
  const jsonData = fs.readFileSync(filePath);
  const agents = JSON.parse(jsonData);

  const agent = agents.find((a) => a.id.toString() === params.id);

  if (!agent) {
    return { notFound: true };
  }

  return {
    props: {
      agent,
    },
  };
}

export default AgentPage;
