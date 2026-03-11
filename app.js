const storageKeys = {
  exploredThreats: "cyberlearn_explored_threats",
  quizStats: "cyberlearn_quiz_stats",
  topicMastery: "cyberlearn_topic_mastery",
};

const threatLibrary = [
  {
    id: "phishing-email",
    title: "Email Phishing",
    category: "Phishing",
    severity: "high",
    overview:
      "Attackers impersonate trusted organizations to trick users into clicking malicious links or sharing credentials.",
    example:
      "A fake Microsoft 365 alert asks you to 'verify your account' and redirects to a cloned sign-in page.",
    prevention: [
      "Inspect sender domains carefully, not just display names.",
      "Never sign in through links sent in urgent emails.",
      "Enable multi-factor authentication to reduce account-takeover risk.",
    ],
  },
  {
    id: "spear-phishing",
    title: "Spear Phishing",
    category: "Social Engineering",
    severity: "high",
    overview:
      "A targeted phishing attempt crafted using personal or organizational details to appear highly credible.",
    example:
      "A finance employee receives a realistic invoice update from an executive spoof account requesting wire payment.",
    prevention: [
      "Validate payment or data requests through secondary channels.",
      "Limit publicly exposed employee information.",
      "Use email authentication controls (SPF, DKIM, DMARC).",
    ],
  },
  {
    id: "ransomware",
    title: "Ransomware",
    category: "Malware",
    severity: "high",
    overview:
      "Malicious software encrypts files and demands payment to restore access, often combined with data theft.",
    example:
      "A user opens a malicious attachment; the endpoint encrypts network shares overnight.",
    prevention: [
      "Maintain tested offline backups.",
      "Patch systems quickly and disable unused remote services.",
      "Segment critical systems and enforce least privilege access.",
    ],
  },
  {
    id: "trojan-malware",
    title: "Trojan Malware",
    category: "Malware",
    severity: "elevated",
    overview:
      "A program masquerades as legitimate software while secretly installing backdoors or spyware.",
    example:
      "A free media converter installs a hidden remote access tool that exfiltrates browser data.",
    prevention: [
      "Download software only from trusted vendors.",
      "Use endpoint detection to monitor suspicious process behavior.",
      "Restrict admin rights to prevent unauthorized installs.",
    ],
  },
  {
    id: "credential-stuffing",
    title: "Credential Stuffing",
    category: "Authentication",
    severity: "high",
    overview:
      "Attackers automate login attempts using leaked username/password pairs from previous breaches.",
    example:
      "A streaming account is taken over because the same password was reused from an old forum breach.",
    prevention: [
      "Use unique passwords for every account.",
      "Deploy MFA and anomaly-based login detection.",
      "Block or throttle automated login attempts.",
    ],
  },
  {
    id: "weak-passwords",
    title: "Weak Password Practices",
    category: "Password Security",
    severity: "medium",
    overview:
      "Simple, reused, or predictable passwords are easily cracked through brute-force or dictionary attacks.",
    example:
      "Using 'Welcome123' across personal and work accounts allows one breach to impact all services.",
    prevention: [
      "Use long passphrases (12+ characters).",
      "Adopt a password manager for unique credentials.",
      "Rotate compromised passwords immediately.",
    ],
  },
  {
    id: "public-wifi",
    title: "Unsafe Public Wi-Fi",
    category: "Network Security",
    severity: "elevated",
    overview:
      "Unencrypted or rogue access points allow attackers to intercept traffic or inject malicious content.",
    example:
      "A fake 'Airport_Free_WiFi' hotspot captures session cookies from connected users.",
    prevention: [
      "Use a trusted VPN on public networks.",
      "Avoid accessing sensitive services on unknown Wi-Fi.",
      "Verify network names with staff before joining.",
    ],
  },
  {
    id: "man-in-the-middle",
    title: "Man-in-the-Middle (MitM)",
    category: "Network Security",
    severity: "high",
    overview:
      "An attacker secretly relays and possibly alters communication between two parties.",
    example:
      "Compromised router settings redirect users to fake banking pages over insecure HTTP.",
    prevention: [
      "Enforce HTTPS and certificate validation.",
      "Harden router credentials and firmware.",
      "Use DNS security and monitor for certificate anomalies.",
    ],
  },
  {
    id: "data-brokering",
    title: "Excessive Data Exposure",
    category: "Data Privacy",
    severity: "medium",
    overview:
      "Apps and services collect or share more personal information than required, increasing breach impact.",
    example:
      "A mobile app collects contact lists and location continuously without essential functionality needs.",
    prevention: [
      "Apply data minimization and retention policies.",
      "Review privacy permissions before app install.",
      "Encrypt sensitive data at rest and in transit.",
    ],
  },
  {
    id: "drive-by-download",
    title: "Drive-by Download",
    category: "Safe Browsing",
    severity: "elevated",
    overview:
      "Malware downloads automatically when visiting compromised websites or malicious ads.",
    example:
      "An outdated browser plugin is exploited through a malicious ad network script.",
    prevention: [
      "Keep browsers and extensions fully updated.",
      "Use content blockers and script restrictions.",
      "Avoid untrusted websites and pop-up download prompts.",
    ],
  },
  {
    id: "mfa-fatigue",
    title: "MFA Fatigue Attacks",
    category: "Authentication",
    severity: "high",
    overview:
      "Attackers trigger repeated MFA prompts until users approve one out of confusion or annoyance.",
    example:
      "A user receives 20 push notifications and eventually accepts one to stop the disruption.",
    prevention: [
      "Use number matching in MFA prompts.",
      "Train users to deny and report unexpected prompts.",
      "Apply conditional access and risk-based sign-in policies.",
    ],
  },
  {
    id: "usb-baiting",
    title: "USB Baiting",
    category: "Social Engineering",
    severity: "medium",
    overview:
      "Attackers leave malicious USB devices where targets may plug them into trusted systems.",
    example:
      "A device labeled 'Payroll Q4' installs malware when connected to an office workstation.",
    prevention: [
      "Disable auto-run and restrict removable media policies.",
      "Provide secure channels for file transfer.",
      "Train staff never to plug in unknown devices.",
    ],
  },
];

const quizBank = [
  {
    topic: "Phishing",
    question: "What is the strongest sign an email may be phishing?",
    options: [
      "It contains your first name",
      "It creates urgency and asks for account verification via a link",
      "It uses your company logo",
      "It has no attachments",
    ],
    answer: "It creates urgency and asks for account verification via a link",
    explanation:
      "Phishing commonly pressures users with urgency and redirects them to credential-harvesting pages.",
  },
  {
    topic: "Phishing",
    question: "Which response is safest after receiving a suspicious login alert email?",
    options: [
      "Click the email link and change password",
      "Reply and ask if the alert is real",
      "Open the known official site manually and verify account activity there",
      "Forward it to friends for confirmation",
    ],
    answer: "Open the known official site manually and verify account activity there",
    explanation:
      "Typing the official URL yourself avoids malicious links and lets you verify account alerts safely.",
  },
  {
    topic: "Phishing",
    question: "What does spear phishing primarily rely on?",
    options: [
      "Mass random messages",
      "Physical theft of devices",
      "Target-specific personal or organizational information",
      "Exploiting old browser caches only",
    ],
    answer: "Target-specific personal or organizational information",
    explanation:
      "Spear phishing is tailored to a specific person or team and appears more credible because of context.",
  },
  {
    topic: "Phishing",
    question: "Which email domain is most suspicious?",
    options: ["support@paypal.com", "alerts@paypa1-security.com", "help@dropbox.com", "noreply@zoom.us"],
    answer: "alerts@paypa1-security.com",
    explanation:
      "Typosquatting domains (like replacing an 'l' with '1') are common in phishing campaigns.",
  },
  {
    topic: "Malware",
    question: "What is ransomware designed to do first?",
    options: ["Increase battery life", "Encrypt data to deny access", "Speed up a system", "Patch vulnerabilities"],
    answer: "Encrypt data to deny access",
    explanation:
      "Ransomware's goal is to lock users out of their files or systems and demand payment.",
  },
  {
    topic: "Malware",
    question: "A Trojan typically enters systems by:",
    options: [
      "Appearing as legitimate software",
      "Self-replicating without user action",
      "Only exploiting Wi-Fi routers",
      "Physically damaging hardware",
    ],
    answer: "Appearing as legitimate software",
    explanation:
      "Trojans rely on deception, often bundled as fake installers, game mods, or free tools.",
  },
  {
    topic: "Malware",
    question: "Which control best limits malware spread inside an organization?",
    options: ["Using one shared admin account", "Network segmentation", "Disabling updates", "Saving passwords in plaintext"],
    answer: "Network segmentation",
    explanation:
      "Segmentation reduces lateral movement, limiting impact when one endpoint is compromised.",
  },
  {
    topic: "Malware",
    question: "What is the most reliable defense against paying ransom after an attack?",
    options: ["Ignoring patching", "Maintaining tested offline backups", "Turning off antivirus", "Keeping one copy on the same server"],
    answer: "Maintaining tested offline backups",
    explanation:
      "Offline and recovery-tested backups help restore systems without relying on attacker promises.",
  },
  {
    topic: "Ransomware",
    question: "Why is paying a ransom risky even if data appears recoverable?",
    options: [
      "Attackers always return data instantly",
      "Payment guarantees legal compliance",
      "No guarantee decryption works and attackers may strike again",
      "It improves your cyber insurance score",
    ],
    answer: "No guarantee decryption works and attackers may strike again",
    explanation:
      "Threat actors may not provide functional decryptors and payment can incentivize repeat attacks.",
  },
  {
    topic: "Ransomware",
    question: "What should an incident response team prioritize first during active ransomware spread?",
    options: ["Post on social media", "Isolate affected systems from the network", "Delete logs", "Reboot all devices immediately"],
    answer: "Isolate affected systems from the network",
    explanation:
      "Rapid isolation can stop propagation and preserve evidence for investigation and recovery.",
  },
  {
    topic: "Ransomware",
    question: "Which policy reduces ransomware impact from compromised credentials?",
    options: ["Shared root password", "Least privilege access", "Public admin portals", "Disabled account lockout"],
    answer: "Least privilege access",
    explanation:
      "Least privilege minimizes what a compromised account can access or encrypt.",
  },
  {
    topic: "Ransomware",
    question: "What is double extortion in ransomware attacks?",
    options: [
      "Encrypting the same file twice",
      "Demanding two currencies",
      "Stealing data before encryption to pressure victims with leak threats",
      "Attacking only backup drives",
    ],
    answer: "Stealing data before encryption to pressure victims with leak threats",
    explanation:
      "Modern ransomware often combines encryption with data theft to increase payment pressure.",
  },
  {
    topic: "Password Security",
    question: "Which password is strongest?",
    options: ["Password123!", "Summer2025", "Blue!River#Galaxy89", "Qwerty2026"],
    answer: "Blue!River#Galaxy89",
    explanation:
      "Long, unique, and unpredictable passphrases are significantly harder to crack.",
  },
  {
    topic: "Password Security",
    question: "What is the best way to manage many unique passwords?",
    options: ["Reuse one complex password", "Store all in notes app", "Use a reputable password manager", "Write them in plain text files"],
    answer: "Use a reputable password manager",
    explanation:
      "Password managers generate and store strong unique credentials safely.",
  },
  {
    topic: "Password Security",
    question: "Credential stuffing succeeds mainly because users:",
    options: ["Use antivirus", "Reuse passwords across services", "Enable MFA", "Use passphrases"],
    answer: "Reuse passwords across services",
    explanation:
      "Reused passwords let attackers test leaked credentials across unrelated accounts.",
  },
  {
    topic: "Password Security",
    question: "Which action should follow notice of a third-party data breach?",
    options: [
      "Ignore if no suspicious activity yet",
      "Change only your username",
      "Reset affected passwords and any reused variants immediately",
      "Disable browser updates",
    ],
    answer: "Reset affected passwords and any reused variants immediately",
    explanation:
      "Breach response should include immediate resets and stopping password reuse elsewhere.",
  },
  {
    topic: "Social Engineering",
    question: "Social engineering attacks mainly exploit:",
    options: ["Compiler errors", "Human trust and behavior", "Only firewall misconfigurations", "Physical hardware faults"],
    answer: "Human trust and behavior",
    explanation:
      "These attacks manipulate emotion, urgency, authority, or curiosity to bypass technical controls.",
  },
  {
    topic: "Social Engineering",
    question: "An attacker pretending to be IT support asks for your MFA code. Best response?",
    options: ["Share quickly to avoid lockout", "Decline and report via official channel", "Ask for their personal phone number", "Post the request in a public chat"],
    answer: "Decline and report via official channel",
    explanation:
      "Legitimate IT staff should never request your one-time verification code.",
  },
  {
    topic: "Social Engineering",
    question: "What is baiting in cybersecurity?",
    options: [
      "A phishing email with no links",
      "Using enticing offers or devices to trigger unsafe user actions",
      "Encrypting network traffic",
      "Blocking all USB ports remotely",
    ],
    answer: "Using enticing offers or devices to trigger unsafe user actions",
    explanation:
      "Baiting relies on curiosity, such as malicious USB drives or fake downloads.",
  },
  {
    topic: "Social Engineering",
    question: "What is the strongest defense against pretexting calls?",
    options: ["Quickly complying with authority", "Identity verification procedures", "Sharing less in emails only", "Turning off browser cookies"],
    answer: "Identity verification procedures",
    explanation:
      "A clear verification workflow prevents attackers from exploiting fake authority scenarios.",
  },
  {
    topic: "Network Security",
    question: "Which protocol should be used instead of HTTP for secure browsing?",
    options: ["FTP", "HTTPS", "Telnet", "SMTP"],
    answer: "HTTPS",
    explanation:
      "HTTPS uses TLS encryption to protect confidentiality and integrity of data in transit.",
  },
  {
    topic: "Network Security",
    question: "What is a major risk of public Wi-Fi?",
    options: ["Guaranteed malware removal", "Traffic interception on insecure networks", "Automatic MFA activation", "Longer battery life"],
    answer: "Traffic interception on insecure networks",
    explanation:
      "Attackers can monitor or manipulate unencrypted traffic on rogue or insecure access points.",
  },
  {
    topic: "Network Security",
    question: "Which practice improves home router security most directly?",
    options: ["Keeping default admin password", "Disabling firmware updates", "Changing default credentials and updating firmware", "Sharing Wi-Fi password publicly"],
    answer: "Changing default credentials and updating firmware",
    explanation:
      "Router hardening closes common takeover paths used in network attacks.",
  },
  {
    topic: "Network Security",
    question: "A VPN is most useful on public networks because it:",
    options: ["Makes passwords unnecessary", "Encrypts traffic between device and VPN server", "Blocks all phishing attacks", "Prevents all malware infections"],
    answer: "Encrypts traffic between device and VPN server",
    explanation:
      "VPN tunneling helps protect traffic from local eavesdropping on untrusted networks.",
  },
  {
    topic: "Data Privacy",
    question: "Data minimization means:",
    options: [
      "Collecting all possible data for future use",
      "Collecting only data necessary for a clear purpose",
      "Deleting data backups daily",
      "Allowing unrestricted third-party sharing",
    ],
    answer: "Collecting only data necessary for a clear purpose",
    explanation:
      "Minimizing collection reduces breach impact and improves compliance with privacy principles.",
  },
  {
    topic: "Data Privacy",
    question: "Which is personally identifiable information (PII)?",
    options: ["A random color preference", "An email tied to an individual", "System uptime", "Weather data"],
    answer: "An email tied to an individual",
    explanation:
      "PII includes data that can identify a specific person directly or indirectly.",
  },
  {
    topic: "Data Privacy",
    question: "What is a key reason to encrypt sensitive data at rest?",
    options: ["Faster internet speed", "Prevent readable exposure if storage is stolen or breached", "Eliminate need for authentication", "Bypass patching"],
    answer: "Prevent readable exposure if storage is stolen or breached",
    explanation:
      "Encryption at rest protects data confidentiality when physical or cloud storage is compromised.",
  },
  {
    topic: "Data Privacy",
    question: "What is the best first step before granting a mobile app permissions?",
    options: ["Accept all quickly", "Review requested permissions against app function", "Disable your lock screen", "Install from unknown sources"],
    answer: "Review requested permissions against app function",
    explanation:
      "Permission review reduces unnecessary data sharing and privacy risks.",
  },
  {
    topic: "Safe Browsing",
    question: "Which behavior lowers risk of drive-by malware?",
    options: ["Ignoring browser updates", "Running old plugins", "Keeping browser and extensions updated", "Disabling site isolation"],
    answer: "Keeping browser and extensions updated",
    explanation:
      "Frequent updates patch known vulnerabilities exploited by malicious websites.",
  },
  {
    topic: "Safe Browsing",
    question: "What is the safest response to a pop-up claiming your device is infected?",
    options: ["Call the number in the pop-up", "Download the offered cleaner", "Close the tab and run trusted security tools", "Share the warning link with teammates"],
    answer: "Close the tab and run trusted security tools",
    explanation:
      "Scareware pop-ups often lead to fraud or malware; avoid interacting with their links or numbers.",
  },
  {
    topic: "Safe Browsing",
    question: "Before downloading a file from the web, you should:",
    options: ["Disable endpoint protection", "Verify source reputation and file legitimacy", "Run it as admin immediately", "Ignore file extension"],
    answer: "Verify source reputation and file legitimacy",
    explanation:
      "Source verification prevents accidental execution of malicious or tampered files.",
  },
  {
    topic: "Safe Browsing",
    question: "Which URL is most likely safe?",
    options: [
      "http://secure-bank-login.com",
      "https://yourbank.com/account",
      "https://yourbank.security-login.co",
      "http://192.168.1.9/verify",
    ],
    answer: "https://yourbank.com/account",
    explanation:
      "The legitimate domain with HTTPS is usually safest; attackers often use lookalike domains.",
  },
  {
    topic: "Authentication",
    question: "Why is MFA stronger than password-only authentication?",
    options: [
      "It replaces passwords entirely",
      "It requires an additional factor beyond a password",
      "It guarantees no account breaches ever",
      "It works only on mobile apps",
    ],
    answer: "It requires an additional factor beyond a password",
    explanation:
      "MFA reduces risk from stolen passwords by requiring something you have or are.",
  },
  {
    topic: "Authentication",
    question: "Which MFA method is generally more phishing-resistant?",
    options: ["SMS one-time codes", "Authenticator push with number matching", "Email verification links", "Security questions"],
    answer: "Authenticator push with number matching",
    explanation:
      "Number matching reduces blind approval and some real-time phishing bypass attempts.",
  },
  {
    topic: "Authentication",
    question: "What does account lockout/throttling protect against?",
    options: ["Backup corruption", "Brute-force login attempts", "Software licensing issues", "Keyboard failures"],
    answer: "Brute-force login attempts",
    explanation:
      "Rate limits and lockouts hinder automated password-guessing attacks.",
  },
  {
    topic: "Authentication",
    question: "If you receive unexpected MFA prompts, what should you do?",
    options: ["Approve one to stop alerts", "Ignore and continue working", "Deny prompts and report possible compromise", "Restart phone and approve later"],
    answer: "Deny prompts and report possible compromise",
    explanation:
      "Unexpected prompts may indicate stolen credentials and active takeover attempts.",
  },
];

const navButtons = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll(".section")];
const jumpButtons = [...document.querySelectorAll("[data-jump]")];

const threatSearchInput = document.getElementById("threat-search");
const threatFilters = document.getElementById("threat-filters");
const threatGrid = document.getElementById("threat-grid");
const threatCount = document.getElementById("threat-count");

const quizTopicOptions = document.getElementById("quiz-topic-options");
const startQuizBtn = document.getElementById("start-quiz-btn");
const quizConfig = document.getElementById("quiz-config");
const quizPanel = document.getElementById("quiz-panel");
const quizSummary = document.getElementById("quiz-summary");
const quizTopicTag = document.getElementById("quiz-topic-tag");
const quizQuestionText = document.getElementById("quiz-question-text");
const quizAnswers = document.getElementById("quiz-answers");
const quizFeedback = document.getElementById("quiz-feedback");
const nextQuestionBtn = document.getElementById("next-question-btn");
const quizProgressText = document.getElementById("quiz-progress-text");
const quizProgressFill = document.getElementById("quiz-progress-fill");

const metricThreats = document.getElementById("metric-threats");
const metricCompleted = document.getElementById("metric-completed");
const metricBestScore = document.getElementById("metric-best-score");
const metricLastTopic = document.getElementById("metric-last-topic");
const learningPathSteps = document.getElementById("learning-path-steps");
const focusTopic = document.getElementById("focus-topic");

let activeThreatCategory = "All";
let threatQuery = "";
let exploredThreatIds = new Set(loadJson(storageKeys.exploredThreats, []));

let quizSession = {
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  topicScores: {},
  selectedTopics: [],
};

function init() {
  bindNavigation();
  initThreatLibrary();
  initQuizLab();
  renderDashboardMetrics();
}

function bindNavigation() {
  navButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveSection(button.dataset.section));
  });

  jumpButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveSection(button.dataset.jump));
  });
}

function setActiveSection(sectionId) {
  sections.forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.section === sectionId);
  });
}

function initThreatLibrary() {
  const categories = ["All", ...new Set(threatLibrary.map((item) => item.category))];
  categories.forEach((category) => {
    const chip = document.createElement("button");
    chip.className = `chip ${category === "All" ? "active" : ""}`;
    chip.textContent = category;
    chip.addEventListener("click", () => {
      activeThreatCategory = category;
      [...threatFilters.children].forEach((el) => el.classList.toggle("active", el.textContent === category));
      renderThreatCards();
    });
    threatFilters.appendChild(chip);
  });

  threatSearchInput.addEventListener("input", (event) => {
    threatQuery = event.target.value.toLowerCase().trim();
    renderThreatCards();
  });

  renderThreatCards();
}

function renderThreatCards() {
  const filtered = threatLibrary.filter((item) => {
    const categoryMatch = activeThreatCategory === "All" || item.category === activeThreatCategory;
    const searchMatch =
      !threatQuery ||
      `${item.title} ${item.category} ${item.overview} ${item.example} ${item.prevention.join(" ")}`
        .toLowerCase()
        .includes(threatQuery);
    return categoryMatch && searchMatch;
  });

  threatCount.textContent = `${filtered.length} topic${filtered.length === 1 ? "" : "s"} shown`;
  threatGrid.innerHTML = "";

  filtered.forEach((threat) => {
    const card = document.createElement("article");
    card.className = "threat-card";
    card.innerHTML = `
      <div class="threat-meta">
        <span class="chip">${threat.category}</span>
        <span class="level ${threat.severity}">${threat.severity}</span>
      </div>
      <h3>${threat.title}</h3>
      <p>${threat.overview}</p>
      <button class="expand-btn" data-threat-id="${threat.id}">View details</button>
      <div class="threat-details" id="details-${threat.id}">
        <p><strong>Real-world example:</strong> ${threat.example}</p>
        <p><strong>Prevention strategies:</strong></p>
        <ul>${threat.prevention.map((step) => `<li>${step}</li>`).join("")}</ul>
      </div>
    `;

    threatGrid.appendChild(card);
  });

  const expandButtons = [...document.querySelectorAll(".expand-btn")];
  expandButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(`details-${button.dataset.threatId}`);
      const isVisible = target.classList.toggle("visible");
      button.textContent = isVisible ? "Hide details" : "View details";

      if (isVisible) {
        exploredThreatIds.add(button.dataset.threatId);
        saveJson(storageKeys.exploredThreats, [...exploredThreatIds]);
        renderDashboardMetrics();
      }
    });
  });
}

function initQuizLab() {
  const topics = [...new Set(quizBank.map((question) => question.topic))];

  topics.forEach((topic) => {
    const chip = document.createElement("button");
    chip.className = "chip active";
    chip.dataset.topic = topic;
    chip.textContent = topic;
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
    });
    quizTopicOptions.appendChild(chip);
  });

  startQuizBtn.addEventListener("click", () => {
    const selectedTopics = [...quizTopicOptions.querySelectorAll(".chip.active")].map((chip) => chip.dataset.topic);
    if (!selectedTopics.length) {
      alert("Select at least one topic to start the quiz.");
      return;
    }

    startQuiz(selectedTopics);
  });

  nextQuestionBtn.addEventListener("click", () => {
    quizSession.index += 1;
    if (quizSession.index >= quizSession.questions.length) {
      finishQuiz();
      return;
    }
    renderCurrentQuestion();
  });
}

function startQuiz(selectedTopics) {
  const filteredQuestions = quizBank.filter((question) => selectedTopics.includes(question.topic));
  const randomized = shuffleArray(filteredQuestions).slice(0, Math.min(filteredQuestions.length, 15));

  quizSession = {
    questions: randomized,
    index: 0,
    score: 0,
    answered: false,
    topicScores: {},
    selectedTopics,
  };

  selectedTopics.forEach((topic) => {
    quizSession.topicScores[topic] = { correct: 0, total: 0 };
  });

  quizConfig.classList.add("hidden");
  quizSummary.classList.add("hidden");
  quizPanel.classList.remove("hidden");
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const question = quizSession.questions[quizSession.index];
  quizSession.answered = false;
  quizFeedback.classList.add("hidden");
  nextQuestionBtn.classList.add("hidden");

  quizTopicTag.textContent = question.topic;
  quizQuestionText.textContent = question.question;
  quizAnswers.innerHTML = "";

  const choices = shuffleArray([...question.options]);
  choices.forEach((option) => {
    const optionBtn = document.createElement("button");
    optionBtn.className = "answer-btn";
    optionBtn.textContent = option;
    optionBtn.addEventListener("click", () => evaluateAnswer(option, question, optionBtn));
    quizAnswers.appendChild(optionBtn);
  });

  const total = quizSession.questions.length;
  const current = quizSession.index + 1;
  quizProgressText.textContent = `Question ${current} of ${total}`;
  quizProgressFill.style.width = `${(current / total) * 100}%`;
}

function evaluateAnswer(selectedOption, question, selectedButton) {
  if (quizSession.answered) {
    return;
  }

  quizSession.answered = true;
  const isCorrect = selectedOption === question.answer;
  const topicBucket = quizSession.topicScores[question.topic] || { correct: 0, total: 0 };
  topicBucket.total += 1;
  if (isCorrect) {
    quizSession.score += 1;
    topicBucket.correct += 1;
  }
  quizSession.topicScores[question.topic] = topicBucket;

  [...quizAnswers.children].forEach((button) => {
    button.disabled = true;
    if (button.textContent === question.answer) {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  quizFeedback.classList.remove("hidden");
  quizFeedback.innerHTML = `
    <strong>${isCorrect ? "Correct!" : "Not quite."}</strong>
    <p>${question.explanation}</p>
    ${isCorrect ? "" : `<p><strong>Correct answer:</strong> ${question.answer}</p>`}
  `;

  nextQuestionBtn.textContent =
    quizSession.index === quizSession.questions.length - 1 ? "View score summary" : "Next question";
  nextQuestionBtn.classList.remove("hidden");
}

function finishQuiz() {
  const total = quizSession.questions.length;
  const score = quizSession.score;
  const percentage = Math.round((score / total) * 100);
  const encouragement = buildEncouragement(percentage);

  updateStoredQuizStats({
    percentage,
    selectedTopics: quizSession.selectedTopics,
    topicScores: quizSession.topicScores,
  });

  const weakestTopics = Object.entries(quizSession.topicScores)
    .filter(([, value]) => value.total > 0)
    .map(([topic, value]) => ({ topic, accuracy: Math.round((value.correct / value.total) * 100) }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);

  quizSummary.innerHTML = `
    <h3>Quiz complete: ${score}/${total} (${percentage}%)</h3>
    <p>${encouragement}</p>
    <div class="summary-grid">
      ${Object.entries(quizSession.topicScores)
        .map(([topic, value]) => {
          if (!value.total) {
            return "";
          }
          const pct = Math.round((value.correct / value.total) * 100);
          return `
            <article class="summary-card">
              <strong>${topic}</strong>
              <p>${value.correct}/${value.total} correct (${pct}%)</p>
            </article>
          `;
        })
        .join("")}
    </div>
    <p><strong>Focus next on:</strong> ${
      weakestTopics.length
        ? weakestTopics.map((item) => `${item.topic} (${item.accuracy}%)`).join(", ")
        : "Continue mixed-topic practice for broader resilience."
    }</p>
    <button id="restart-quiz-btn" class="action-btn">Practice another randomized round</button>
  `;

  quizPanel.classList.add("hidden");
  quizSummary.classList.remove("hidden");
  quizConfig.classList.remove("hidden");
  renderDashboardMetrics();

  const restartBtn = document.getElementById("restart-quiz-btn");
  restartBtn.addEventListener("click", () => {
    setActiveSection("quiz");
  });
}

function renderDashboardMetrics() {
  const stats = loadJson(storageKeys.quizStats, {
    completed: 0,
    bestScore: 0,
    lastTopic: "No attempts yet",
  });
  const mastery = loadJson(storageKeys.topicMastery, {});

  metricThreats.textContent = `${exploredThreatIds.size}/${threatLibrary.length}`;
  metricCompleted.textContent = String(stats.completed);
  metricBestScore.textContent = `${stats.bestScore}%`;
  metricLastTopic.textContent = stats.lastTopic;
  focusTopic.textContent = getFocusTopic(mastery);

  renderLearningPath(mastery);
}

function renderLearningPath(mastery) {
  const entries = Object.entries(mastery)
    .filter(([, value]) => value.total > 0)
    .map(([topic, value]) => ({ topic, score: Math.round((value.correct / value.total) * 100) }))
    .sort((a, b) => a.score - b.score);

  const fallbackPlan = [
    { title: "Phishing Defense Drill", text: "Study social cues in deceptive emails and verify links safely." },
    { title: "Authentication Hardening", text: "Practice MFA habits, secure recovery methods, and account lockout controls." },
    { title: "Network & Privacy Hygiene", text: "Reinforce safe browsing, Wi-Fi security, and data minimization principles." },
  ];

  let plan = fallbackPlan;
  if (entries.length) {
    plan = entries.slice(0, 3).map((entry) => ({
      title: `${entry.topic} Reinforcement`,
      text: `Current mastery: ${entry.score}%. Revisit this module and run a focused quiz round.`,
    }));
  }

  learningPathSteps.innerHTML = plan
    .map(
      (item, index) => `
        <article class="path-card">
          <strong>Step ${index + 1}: ${item.title}</strong>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function updateStoredQuizStats({ percentage, selectedTopics, topicScores }) {
  const stats = loadJson(storageKeys.quizStats, {
    completed: 0,
    bestScore: 0,
    lastTopic: "No attempts yet",
  });
  stats.completed += 1;
  stats.bestScore = Math.max(stats.bestScore, percentage);
  stats.lastTopic = selectedTopics.length === 1 ? selectedTopics[0] : "Mixed Topics";
  saveJson(storageKeys.quizStats, stats);

  const mastery = loadJson(storageKeys.topicMastery, {});
  Object.entries(topicScores).forEach(([topic, value]) => {
    if (!mastery[topic]) {
      mastery[topic] = { correct: 0, total: 0 };
    }
    mastery[topic].correct += value.correct;
    mastery[topic].total += value.total;
  });
  saveJson(storageKeys.topicMastery, mastery);
}

function getFocusTopic(mastery) {
  const measured = Object.entries(mastery)
    .filter(([, value]) => value.total > 0)
    .map(([topic, value]) => ({ topic, score: value.correct / value.total }))
    .sort((a, b) => a.score - b.score);

  if (measured.length) {
    return `Recommended review: ${measured[0].topic}. Your historical accuracy here is lowest.`;
  }

  const rotating = [
    "Recommended review: Phishing. Practice identifying urgency and lookalike domains.",
    "Recommended review: Authentication. Strengthen MFA and account recovery hygiene.",
    "Recommended review: Safe Browsing. Focus on malicious redirects and download safety.",
  ];
  return rotating[Math.floor(Math.random() * rotating.length)];
}

function buildEncouragement(percentage) {
  if (percentage >= 85) {
    return "Excellent work. Your cyber awareness is strong—challenge yourself with mixed-topic rounds.";
  }
  if (percentage >= 65) {
    return "Solid progress. Review missed explanations and run another round to push into expert range.";
  }
  return "Great effort. Use the answer explanations and threat library details to build stronger fundamentals.";
}

function loadJson(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function shuffleArray(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

init();
