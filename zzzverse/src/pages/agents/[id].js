import { useRouter } from 'next/router';
import { useEffect } from 'react';
import fs from 'fs';
import path from 'path';

const AgentPage = ({ agent }) => {
    const router = useRouter();

    useEffect(() => {
        if (agent) {
            if (agent.attribute === "Frost" || agent.attribute === "Ice") {
                document.body.style.background = "linear-gradient(135deg, #A9D8E8, #E8F6FD)";
            } else if (agent.attribute === "Electric") {
                document.body.style.background = "linear-gradient(135deg, #C7D8FF, #5A87E7)";
            } else if (agent.attribute === "Physical") {
                document.body.style.background = "linear-gradient(135deg, #FFD8C7,rgb(206, 207, 171))";
            } else if (agent.attribute === "Fire") {
                document.body.style.background = "linear-gradient(135deg, #FFD9D9,rgb(190, 125, 125))";
            } else if (agent.attribute === "Ether") {
                document.body.style.background = "linear-gradient(135deg, #F2D8FF,rgb(96, 75, 114))";
            } else {
                document.body.style.backgroundColor = "";
            }
        }

        return () => {
            document.body.style.backgroundColor = "";
        };
    }, [agent]);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const getImagePath = (type, value) => {
        return `./public/images/assets/${type}/${value.toLowerCase()}.png`;
    }

    return (
        <div>
            <div style={{ display: 'flex', width: '80rem', padding: "0 5rem" }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <img
                        src={getImagePath('attribute', agent.attribute)}
                        alt={agent.attribute}
                        width={200}
                    />
                    <img 
                        src={getImagePath('role', agent.role)}
                        alt={agent.role}
                        width={200}
                    />
                    <img
                        src={getImagePath('rarity', agent.rarity)}
                        alt={agent.rarity}
                        width={200}
                    />
                </div>

                <img
                    src={agent.image}
                    alt={agent.name}
                    width={600}
                />
                <div style={{ marginLeft: '7rem', marginTop: '5rem' }}>
                    <h1>{agent.name}</h1>
                    <div style= {{display: "flex", gap: "5rem" }}>
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
                    <p style={{ textAlign: "justify" }}><strong>Description:</strong> {agent.weapon.weaponDescription}</p>
                </div>

            </div>

            <hr style={{ margin: '2rem 0' }} />

            <div style={{ textAlign: "justify", padding: "0 5rem" }}>
                <h2>Abilities</h2>
                {agent.abilities.map((ability) => (
                    <div key={ability.id} style={{ marginBottom: '1.5rem', marginLeft: '1.5rem' }}>
                        <h3>{ability.name}</h3>
                        <p>{ability.description}</p>
                    </div>
                ))}
            </div>

            <hr style={{ margin: '2rem 0' }} />

            <div style={{ textAlign: "justify", padding: "0 5rem" }}>
                <h2>Mindscape Cinemas</h2>
                {agent["mindscape-cinema"].map((mindscape) => (
                    <div key={mindscape.id} style={{ marginBottom: '1.5rem', marginLeft: '1.5rem' }}>
                        <h3>{mindscape.id}. {mindscape.name}</h3>
                        <p>{mindscape.description}</p>
                        <em style={{ display: 'block', marginTop: '0.5rem' }}>{mindscape.alt}</em>
                    </div>
                ))}
            </div>
            
            
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
