const messages = [
	"我真的很喜欢你的幽默，还有你偶尔小小地逗我一下。每次都让我忍不住笑出来。",
	"在我心里，你就是最漂亮的女生。",
	"你对我真的很好，也很温柔。我每次想到这些，心都会软一下。"
];

let opened = 0;
let historyStack = [];

const ornaments = document.querySelectorAll('.ornament');
const messageBox = document.getElementById('messageBox');
const progress = document.getElementById('progress');
const backButton = document.getElementById('backButton');
const toQuestionBtn = document.getElementById('toQuestionBtn');
const notYetBtn = document.getElementById('notYetBtn');
const notYetMsg = document.getElementById('notYetMsg');

let notYetCount = 0;

const notYetLines = [
	"诶诶先别点这个嘛～😗",
	"真的要“再等等”吗？我有点舍不得 😭",
	"那我再努力一点点，好不好？🥺"
];

toQuestionBtn.classList.remove('show');

function resetNotYet() {
	notYetCount = 0;
	notYetMsg.textContent = "";
	notYetBtn.classList.remove('shake');
}

function goTo(id, fromBack = false) {
	const current = document.querySelector('.screen.active');

	if (current && !fromBack) {
		historyStack.push(current.id);
	}

	document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
	document.getElementById(id).classList.add('active');

	// Reset the playful "not yet" message whenever we land on the question screen
	if (id === "screen-question") {
		resetNotYet();
	}

	if (current && current.id === "screen-question" && id !== "screen-question") {
		resetNotYet();
	}

	backButton.style.display = historyStack.length > 0 ? 'block' : 'none';
}

function goBack() {
	if (historyStack.length === 0) return;

	const prev = historyStack.pop();
	goTo(prev, true);
}

function openOrnament(index) {
	// Always allow rereading
	messageBox.textContent = messages[index];

	// If it's already opened, don't count again
	if (ornaments[index].classList.contains('opened')) return;

	// First-time open logic
	ornaments[index].classList.add('opened');
	opened++;
	progress.textContent = `${opened} / 3 已打开`;

	if (opened === 3) {
		toQuestionBtn.classList.add('show');
	}
}

function yes() {
	goTo('screen-yes');
	confetti();
}

function notYet() {
	// Shake a few times first
	if (notYetCount < 3) {
		notYetCount++;

		// Update message (use the next line each time)
		notYetMsg.textContent = notYetLines[Math.min(notYetCount - 1, notYetLines.length - 1)];

		// Trigger shake animation (restart it reliably)
		notYetBtn.classList.remove('shake');
		void notYetBtn.offsetWidth; // forces reflow so animation can replay
		notYetBtn.classList.add('shake');

		return;
	}

	// After 3 tries, allow "Not yet" to proceed normally
	goTo('screen-notyet');
}

function createSnow() {
	const snowflake = document.createElement('div');
	snowflake.className = 'snowflake';
	snowflake.textContent = '❄';
	snowflake.style.left = Math.random() * 100 + 'vw';
	snowflake.style.animationDuration = (Math.random() * 3 + 3) + 's';
	document.body.appendChild(snowflake);

	setTimeout(() => snowflake.remove(), 7000);
}

setInterval(createSnow, 300);

function confetti() {
	for (let i = 0; i < 100; i++) {
		const c = document.createElement('div');
		c.style.position = 'fixed';
		c.style.width = '6px';
		c.style.height = '6px';
		c.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
		c.style.left = '50%';
		c.style.top = '50%';
		c.style.transform = 'translate(-50%, -50%)';
		c.style.transition = 'transform 1.2s ease, opacity 1.2s';
		document.body.appendChild(c);

		requestAnimationFrame(() => {
			c.style.transform =
				`translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px)`;
			c.style.opacity = '0';
		});

		setTimeout(() => c.remove(), 1300);
	}
}
