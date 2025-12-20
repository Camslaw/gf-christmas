const messages = [
	"One thing I really love about you is how you make everything feel lighter just by being you.",
	"My favorite moment with you so far is one I replay in my head when I miss you.",
	"I want to keep choosing you and building something real together."
];

let opened = 0;
let historyStack = [];

const ornaments = document.querySelectorAll('.ornament');
const messageBox = document.getElementById('messageBox');
const progress = document.getElementById('progress');
const backButton = document.getElementById('backButton');
const toQuestionBtn = document.getElementById('toQuestionBtn');

toQuestionBtn.classList.remove('show');

function goTo(id, fromBack = false) {
	const current = document.querySelector('.screen.active');

	if (current && !fromBack) {
		historyStack.push(current.id);
	}

	document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
	document.getElementById(id).classList.add('active');

	backButton.style.display = historyStack.length > 0 ? 'block' : 'none';
}

function goBack() {
	if (historyStack.length === 0) return;

	const prev = historyStack.pop();
	goTo(prev, true);
}

function openOrnament(index) {
	if (ornaments[index].classList.contains('opened')) return;

	ornaments[index].classList.add('opened');
	messageBox.textContent = messages[index];
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
