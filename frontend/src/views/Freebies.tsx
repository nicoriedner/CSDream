import { useState } from "react";
import "../css/Freebies.css";
import { Button, Card, Modal } from "react-bootstrap";

// Dummy-Skins (simulieren Frontend-only Loot)
const freebies = [
    {
        name: "Desert Eagle | Blaze",
        value: 100,
        image: "https://bymykel.github.io/CSGO-API/api/images/skins/desert-eagle-blaze.png",
        chance: 0.05,
    },
    {
        name: "AK-47 | Redline",
        value: 30,
        image: "https://bymykel.github.io/CSGO-API/api/images/skins/ak-47-redline.png",
        chance: 0.15,
    },
    {
        name: "P250 | Valence",
        value: 5,
        image: "https://bymykel.github.io/CSGO-API/api/images/skins/p250-valence.png",
        chance: 0.35,
    },
];

const Freebies = () => {
    const [wonSkin, setWonSkin] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const tryLuck = () => {
        const roll = Math.random();
        let cumulative = 0;
        for (const skin of freebies) {
            cumulative += skin.chance;
            if (roll < cumulative) {
                setWonSkin(skin);
                setShowModal(true);
                return;
            }
        }
        setWonSkin(null);
        setShowModal(true);
    };

    return (
        <div className="freebies-container">
            <h2>Daily Freebies</h2>
            <div className="freebies-row">
                {freebies.map((skin, index) => (
                    <Card key={index} className="freebie-card">
                        <Card.Img variant="top" src={skin.image} alt={skin.name} />
                        <Card.Body>
                            <Card.Title>{skin.name}</Card.Title>
                            <Card.Text>{skin.value} Coins</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Button className="try-button" onClick={tryLuck}>Try your luck</Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{wonSkin ? "Congratulations!" : "Better luck next time!"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {wonSkin ? (
                        <div className="modal-skin">
                            <img src={wonSkin.image} alt={wonSkin.name} className="modal-img" />
                            <p>You won <strong>{wonSkin.name}</strong> worth {wonSkin.value} Coins!</p>
                        </div>
                    ) : (
                        <p>You didn’t win anything this time.</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Freebies;