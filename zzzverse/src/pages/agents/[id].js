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
                <div style={{ marginLeft: '7rem', marginTop: '5rem' }}>
                    <h1>{agent.name}</h1>
                    <div style= {{display: "flex", gap: "3rem" }}>
                        <div>
                            <p><strong>Attribute:</strong> {agent.attribute}</p>
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
                    <p style={{ fontSize: '1.25rem'}}><strong>Signature W-Engine:</strong> {agent.weapon.weaponName}</p>
                    <img 
                        src={agent.weapon.weaponImage}
                        alt={agent.weapon.weaponName}
                        width={300} 
                    />
                    <p><strong>Base Stat:</strong> {agent.weapon.weaponBaseStat}</p>
                    <p><strong>Sub Stat:</strong> {agent.weapon.weaponSubStat}</p>
                    <p><strong>Description:</strong> {agent.weapon.weaponDescription}</p>
                </div>
            </div>

            <hr style={{ margin: '2rem 0' }} />

            <h2>Abilities</h2>
            <ul>
                {agent.abilities.map((ability) => (
                    <li key={ability.id} style={{ marginBottom: '1.5rem' }}>
                        <strong>{ability.name}</strong><br />
                        {ability.description}
                    </li>
                ))}
            </ul>

            <hr style={{ margin: '2rem 0' }} />

            <h2>Mindscape Cinemas</h2>
            <ol>
                {agent["mindscape-cinema"].map((mindscape) => (
                    <li key={mindscape.id} style={{ marginBottom: '1.5rem' }}>
                        <strong style={{ display: 'block', marginTop: '0.25rem' }}>{mindscape.name}</strong><br />
                        {mindscape.description}<br />
                        <em style={{ display: 'block', marginTop: '0.5rem' }}>{mindscape.alt}</em>
                    </li>
                ))}
            </ol>
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
