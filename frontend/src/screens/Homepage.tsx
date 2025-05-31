import logo from "../assets/CSDream_Logo.png";
import "../css/Homepage.css"

const games = [
    {
        name: 'Upgrader',
        image: '../assets/upgrader.jpg',
    },
    {
        name: 'Roulette',
        image: '../assets/roulette.png',
    },
    {
        name: 'Tower',
        image: '../assets/tower.jpeg',
    },
    {
        name: 'Slotmaschine',
        image: '../assets/slot.jpeg',
    },
];

function Homepage() {
    return (
        <div>
            <div className="logo-container">
                <img src={logo}/>
            </div>
            <div className="carousel-container">
                <div className="carousel-track">
                    {games.map((game, index) => (
                        <div className="game-card" key={index}>
                            <img src={game.image} alt={game.name} className="game-image" />
                            <div className="game-name">{game.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;