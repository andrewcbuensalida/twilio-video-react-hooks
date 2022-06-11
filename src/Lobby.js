import React from "react";
import './Lobby.css'

const Lobby = ({
	username,
	handleUsernameChange,
	roomName,
	handleRoomNameChange,
	handleSubmit,
	connecting,
	roomOptions,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<h2>Enter a room</h2>
			<div>
				<label htmlFor="name">Username:</label>
				<input
					type="text"
					id="field"
					value={username}
					onChange={handleUsernameChange}
					readOnly={connecting}
					required
				/>
			</div>

			<div>
				<label htmlFor="room">Room name:</label>

				<select
					id="room"
                    className="Lobby_select"
					value={roomName}
					onChange={handleRoomNameChange}
					readOnly={connecting}
					required
				>
					{roomOptions.map((room) => (
						<option key={room.id} value={room.name}>
							{room.name}
						</option>
					))}
				</select>
			</div>

			<button type="submit" disabled={connecting}>
				{connecting ? "Connecting" : "Join"}
			</button>
		</form>
	);
};

export default Lobby;
