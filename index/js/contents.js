class Track {
	constructor(id, title, info, src, section) {
		this.id = id;
		this.title = title;
		this.info = info;
		this.src = src;
		this.section = section;
		this.dom = this.createDOM();
	}
	createDOM() {
		let container = e("div");
		container.classList.add("content", "col-12", "col-sm-6");
		
		let title = e("button");
		title.textContent = this.title;
		title.classList.add("btn");
		title.setAttribute("data-bs-toggle", "collapse");
		title.setAttribute("data-bs-target", this.id);
		title.addEventListener("click", () => {
			toggle(container);
			toggle(title);
			for (let list of this.info.children) {
				toggle(list);
			}
			updateSectionsContainer(s(this.section));
		});
		
		let info = this.info;
		info.id = this.id.substring(1);
		info.classList.add("collapse");
		
		let player = e("audio");
		player.textContent = "Your browser does not support this format."
		player.setAttribute("src", this.src);
		player.setAttribute("controls", "");
		player.setAttribute("loop", "");
		
		addChildren(info, [player]);
		addChildren(container, [title, info]);
		addChildren(s(this.section), [container]);
		
		return container;
	}
}
class Section {
	constructor(id, data) {
		this.id = id;
		this.data = data;
	}
	createList(title, textItems, elementItems) {
		let list = e("ul");
		list.textContent = title;
		list.classList.add("content-info-list");
		
		if (textItems) {
			for (let item of textItems) {
				let element = e("li");
				element.classList.add("content-info-item");
				element.textContent = item;
				list.appendChild(element);
			}
		}
		
		if (elementItems) {
			for (let item of elementItems) {
				if (item) {
					let element = e("li");
					element.classList.add("content-info-item");
					element.appendChild(item);
					list.appendChild(element);
				}
			}
		}
		
		return list;
	}
	createLink(text, href) {
		let link = e("a");
		link.classList.add("link");
		link.textContent = text;
		link.href = href;
		return link;
	}
}
class Discography extends Section {
	createTracks() {
		for (let i = 0; i < this.data.length; i++) {
			let t = this.data[i];
			let track = new Track(`#discography-${i}`, t.titles[0],  this.createTrackInfo(t), t.links.src, this.id);
		}
	}
	createTrackInfo(trackData) {
		let info = e("div");
		
		let titles = this.createList("Title(s):", trackData.titles);
		
		let album = this.createList("Album:", [trackData.album]);
		
		let official = trackData.links.official ? this.createLink("Original Source", trackData.links.official) : null;
		let download = this.createLink("Download", trackData.links.src);
		let links = this.createList("External Link(s):", null, [official, download]);
		
		addChildren(info, [titles, album, links]);
		return info;
	}
}
class Covers extends Section {
	createTracks() {
		for (let i = 0; i < this.data.length; i++) {
			let t = this.data[i];
			let track = new Track(`#covers-${i}`, t.title, this.createTrackInfo(t), t.links.src, this.id);
		}
	}
	createTrackInfo(trackData) {
		let info = e("div");
		
		let title = this.createList("Title:", [trackData.title]);
		
		let artist = this.createList("Artist:", [trackData.artist]);
		
		let download = this.createLink("Download", trackData.links.src);
		let links = this.createList("External Link(s):", null, [download]);
		
		addChildren(info, [title, artist, links]);
		return info;
	}
}
class Livestreams extends Section {
	createTracks() {
		for (let i = 0; i < this.data.length; i++) {
			let t = this.data[i];
			let track = new Track(`#livestreams-${i}`, t[0], this.createTrackInfo(t), t[1], this.id);
		}
	}
	createTrackInfo(trackData) {
		let info = e("div");
		
		let date = this.createList("Date:", [new Date(trackData[0]).toString().slice(0, 15)]);
		
		let download = this.createLink("Drive Link", trackData[1]);
		let links = this.createList("External Link(s):", null, [download]);
		
		addChildren(info, [date, links]);
		return info;
	}
}
class Others extends Section {
	createTracks() {
		for (let i = 0; i < this.data.length; i++) {
			let t = this.data[i];
			let track = new Track(`#others-${i}`, t.title + " " + t.version, this.createTrackInfo(t), t.links.src, this.id);
		}
	}
	createTrackInfo(trackData) {
		let info = e("div");
		
		let title = this.createList("Title:", [trackData.title]);
		
		let source = trackData.links.source ? this.createLink("Original Source", trackData.links.source) : null;
		let download = this.createLink("Download", trackData.links.src);
		let links = this.createList("External Link(s):", null, [source, download]);
		
		addChildren(info, [title, links]);
		return info;
	}
}