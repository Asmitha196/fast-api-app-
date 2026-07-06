type Props = {
    currentPage: string;
    onNavigate: (page: string) => void;
}

function NavBar({ currentPage, onNavigate }: Props) {
    return (
        <nav className="app-nav">
            <div className="nav-actions">
                <button className={currentPage === "home" ? "active" : ""} onClick={() => onNavigate("home")} disabled={currentPage === "home"}>Home</button>
                <button className={currentPage === "chat" ? "active" : ""} onClick={() => onNavigate("chat")} disabled={currentPage === "chat"}>Chat</button>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default NavBar