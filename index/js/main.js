function updateSectionsContainer(section) {
	/* Update the height of the sections container to move the elements below. */
	setTimeout(() => {
		s("#sections-container").style.height = section.offsetHeight + "px";
	}, 300);
}

let discography = new Discography("#discography-sec", data.discography);
discography.createTracks();

let covers = new Covers("#covers-sec", data.covers);
covers.createTracks();

let livestreams = new Livestreams("#livestreams-sec", data.live_streams);
livestreams.createTracks();

let others = new Others("#others-sec", data.others);
others.createTracks();

window.onload = () => {
	updateSectionsContainer(s("#discography-sec"));
};