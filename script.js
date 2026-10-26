
const beforeMissions = [
  {
    id: "stream",
    text: 'How to stream',
    link: "https://fktrendhouse.carrd.co/#four"
  },
  {
    id: "trend",
    text: "How to trend",
    link: "https://fktrendhouse.carrd.co/#one"
  },
  {
    id: "schedule",
    text: "Schedule at least 10 posts"
  }
];

const afterMissions = [
  {
    id: "youtube",
    text: "Watch the trailer on YouTube and share it"
  },
  {
    id: "tiktok",
    text: "Watch the trailer on TikTok and repost it"
  },
  {
    id: "facebook",
    text: "Watch the trailer on Facebook and share it"
  },
  {
    id: "instagram",
    text: "Watch the trailer on Instagram and share it"
  },
  {
    id: "x",
    text: "Watch the trailer on X and repost it"
  },
  {
    id: "hashtag1",
    text: "Publish at least 1 post with #TheInvisibleDragon"
  },
  {
    id: "hashtag10",
    text: "Publish at least 10 posts with #TheInvisibleDragon"
  },
  {
    id: "hashtag50",
    text: "Publish at least 50 posts with #TheInvisibleDragon"
  },
  {
    id: "hashtag100",
    text: "Publish more than 100 posts with #TheInvisibleDragon"
  }
];

const STORAGE_KEY = "invisibleDragonChecklistProgress";

const allMissions = [...beforeMissions, ...afterMissions];

function getSavedProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function renderMissions(missions, containerId) {
  const container = document.getElementById(containerId);
  const savedProgress = getSavedProgress();

  container.innerHTML = missions.map((mission) => {
    const checked = savedProgress[mission.id] ? "checked" : "";

    const missionText = mission.link
      ? `<a href="${mission.link}" target="_blank" rel="noopener noreferrer">${mission.text}</a>`
      : mission.text;

    return `
      <label class="mission-item" for="mission-${mission.id}">
        <input
          class="mission-checkbox"
          type="checkbox"
          id="mission-${mission.id}"
          data-mission-id="${mission.id}"
          ${checked}
        >
        <span class="mission-label">${missionText}</span>
      </label>
    `;
  }).join("");
}

function updateProgress() {
  const savedProgress = getSavedProgress();

  const completed = allMissions.filter(
    (mission) => savedProgress[mission.id]
  ).length;

  const total = allMissions.length;
  const percentage = (completed / total) * 100;

  document.getElementById("progressText").textContent =
    `You've completed ${completed}/${total} missions!`;

  document.getElementById("progressBar").style.width =
    `${percentage}%`;

  document.getElementById("progressTrack").setAttribute(
    "aria-valuenow",
    completed
  );
}

function saveMissionProgress(event) {
  const checkbox = event.target;

  if (!checkbox.matches(".mission-checkbox")) {
    return;
  }

  const savedProgress = getSavedProgress();
  const missionId = checkbox.dataset.missionId;

  savedProgress[missionId] = checkbox.checked;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(savedProgress)
  );

  updateProgress();
}

function shareAchievement() {
  const savedProgress = getSavedProgress();

  const completed = allMissions.filter(
    (mission) => savedProgress[mission.id]
  ).length;

  const total = allMissions.length;

  const postText =
    `I've completed ${completed}/${total} missions to support ` +
    `#TheInvisibleDragon trailer! ` +
    `Join me and let's support it together!\n\n` +
    `https://trangttq1105.github.io/TheInvisibleDragon/`;

  const shareUrl =
    "https://x.com/intent/tweet?text=" +
    encodeURIComponent(postText);

  window.open(shareUrl, "_blank", "noopener,noreferrer");
}

renderMissions(beforeMissions, "beforeMissions");
renderMissions(afterMissions, "afterMissions");

document.addEventListener("change", saveMissionProgress);

document.getElementById("shareButton").addEventListener(
  "click",
  shareAchievement
);

updateProgress();
