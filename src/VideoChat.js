import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import Lobby from "./Lobby";
import Room from "./Room";

const VideoChat = () => {
	const [username, setUsername] = useState("");
	const [roomName, setRoomName] = useState("");
	const [room, setRoom] = useState(null);
	const [connecting, setConnecting] = useState(false);
	const [roomOptions, setRoomOptions] = useState([]);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleRoomNameChange = (event) => {
		setRoomName(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setConnecting(true);
		const data = await fetch(
			`http://localhost:5000?identity=${username}&room=${roomName}`
		).then((res) => res.json());

		Video.connect(data.accessToken, {
			name: roomName,
			video: true,
			audio: true,
		})
			.then((room) => {
				setConnecting(false);
				setRoom(room);
			})
			.catch((err) => {
				console.error(err);
				setConnecting(false);
			});
	};

	const handleLogout = () => {
		setRoom((prevRoom) => {
			if (prevRoom) {
				prevRoom.localParticipant.tracks.forEach((trackPub) => {
					trackPub.track.stop();
				});
				prevRoom.disconnect();
			}
			return null;
		});
	};

	useEffect(() => {
		async function getRoomOptions() {
            setRoomOptions([{ id: 1, name: "Loading..." }]);
			const response = await new Promise((resolve) => {
				setTimeout(
					() =>
						resolve([
							{ id: 1, name: "room1" },
							{ id: 2, name: "room2" },
							{ id: 3, name: "room3" },
						]),
					1000
				);
			});
            setRoomOptions(response)
		};

		getRoomOptions();

		if (room) {
			const tidyUp = (event) => {
				if (event.persisted) {
					return;
				}
				if (room) {
					handleLogout();
				}
			};
			window.addEventListener("pagehide", tidyUp);
			window.addEventListener("beforeunload", tidyUp);
			return () => {
				window.removeEventListener("pagehide", tidyUp);
				window.removeEventListener("beforeunload", tidyUp);
			};
		}
	}, [room]);

	return room ? (
		<Room roomName={roomName} room={room} handleLogout={handleLogout} />
	) : (
		<Lobby
			username={username}
			roomName={roomName}
			handleUsernameChange={handleUsernameChange}
			handleRoomNameChange={handleRoomNameChange}
			handleSubmit={handleSubmit}
			connecting={connecting}
			roomOptions={roomOptions}
		/>
	);
};

export default VideoChat;
