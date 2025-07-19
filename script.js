document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      id: "project1",
      title: "Fictional 911 CAD System",
      description: "911 Call Management With Ability To Delete, Draw A GPS-Route, And View Officers On The Call, As Well As A Database Of Fake Names And Fake Civilian Records.",
      media: [
        { type: "image", src: "assets/project1/pic1.png" },
        { type: "image", src: "assets/project1/pic2.png" },
        { type: "image", src: "assets/project1/pic3.png" },
        { type: "image", src: "assets/project1/pic4.png" },
        { type: "image", src: "assets/project1/pic5.png" },
        { type: "video", src: "assets/project1/vid1.mp4" }
      ]
    }
  ];

  const projectList = document.querySelector(".project-list");
  const modal = document.getElementById("projectModal");
  const title = document.getElementById("modalTitle");
  const desc = document.getElementById("modalDescription");
  const media = document.getElementById("modalMedia");
  const closeBtn = document.querySelector(".close-btn");

  // Populate project cards with only titles (description moved to modal)
  projects.forEach(proj => {
    const card = document.createElement("div");
    card.className = "project";
    card.innerHTML = `
      <h3>${proj.title}</h3>
      <button class="view-project-btn">View Project →</button>
    `;
    projectList.appendChild(card);

    card.querySelector(".view-project-btn").addEventListener("click", () => {
      openModal(proj);
    });
  });

function openModal(proj) {
  console.log("Opening modal for project:", proj.title);
  title.textContent = proj.title;
  desc.textContent = proj.description;
  media.innerHTML = "";

  const imageContainer = document.createElement("div");
  imageContainer.className = "media-images";

  const videoContainer = document.createElement("div");
  videoContainer.className = "media-videos";

  let hasImages = false;
  let hasVideos = false;

  proj.media.forEach(item => {
    console.log("Adding media:", item.type, item.src);
    if (item.type === "image") {
      hasImages = true;
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = `${proj.title} Screenshot`;
      imageContainer.appendChild(img);
    } else if (item.type === "video") {
      hasVideos = true;
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      videoContainer.appendChild(video);
    }
  });

  if (hasImages) {
    const imgLabel = document.createElement("h4");
    imgLabel.textContent = "Images";
    media.appendChild(imgLabel);
    media.appendChild(imageContainer);
  }

  if (hasVideos) {
    const vidLabel = document.createElement("h4");
    vidLabel.textContent = "Videos";
    media.appendChild(vidLabel);
    media.appendChild(videoContainer);
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  console.log(modal.classList);
}

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = ""; // restore scroll
  }

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
});
