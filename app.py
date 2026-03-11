import math
import re
from urllib.parse import urlparse

from flask import Flask, render_template, request

app = Flask(__name__)

# A short list of very common passwords that should always score poorly.
COMMON_WEAK_PASSWORDS = {
    "123456",
    "123456789",
    "qwerty",
    "password",
    "password123",
    "admin",
    "welcome",
    "letmein",
    "iloveyou",
    "abc123",
}

# Small dictionary fragments often seen in weak passwords.
DICTIONARY_FRAGMENTS = [
    "password",
    "admin",
    "qwerty",
    "welcome",
    "login",
    "cyber",
    "security",
    "dragon",
    "football",
    "master",
    "12345",
]

URGENT_KEYWORDS = [
    "urgent",
    "immediately",
    "asap",
    "account suspended",
    "act now",
    "security alert",
]

CREDENTIAL_KEYWORDS = [
    "confirm password",
    "verify password",
    "enter your password",
    "login immediately",
    "reset your password",
    "verify your account",
]

PAYMENT_KEYWORDS = [
    "gift card",
    "wire transfer",
    "bank account",
    "payment required",
    "invoice overdue",
    "send funds",
]

IMPERSONATION_KEYWORDS = [
    "it support",
    "help desk",
    "microsoft support",
    "paypal support",
    "bank security team",
    "ceo request",
]

SHORTENER_DOMAINS = {"bit.ly", "tinyurl.com", "t.co", "rb.gy", "goo.gl"}


def clamp(value, low, high):
    return max(low, min(high, value))


def has_sequential_pattern(value):
    """
    Returns True when obvious 4-character sequences appear.
    Examples: abcd, 1234, qwerty (checked by windows).
    """
    if len(value) < 4:
        return False

    lowered = value.lower()
    sequence_sources = [
        "abcdefghijklmnopqrstuvwxyz",
        "0123456789",
        "qwertyuiopasdfghjklzxcvbnm",
    ]

    for source in sequence_sources:
        for idx in range(len(source) - 3):
            block = source[idx : idx + 4]
            if block in lowered or block[::-1] in lowered:
                return True
    return False


def estimate_entropy_bits(password):
    """
    Entropy estimate: length * log2(character_pool_size).
    """
    if not password:
        return 0.0

    pool_size = 0
    if re.search(r"[a-z]", password):
        pool_size += 26
    if re.search(r"[A-Z]", password):
        pool_size += 26
    if re.search(r"[0-9]", password):
        pool_size += 10
    if re.search(r"[^A-Za-z0-9]", password):
        pool_size += 32

    if pool_size == 0:
        return 0.0

    return len(password) * math.log2(pool_size)


def format_seconds_to_human(seconds):
    if seconds < 1:
        return "instantly"
    if seconds < 60:
        return "seconds"
    if seconds < 3600:
        return "minutes"
    if seconds < 86400:
        return "hours"
    if seconds < 86400 * 30:
        return "days"
    if seconds < 86400 * 365:
        return "months"
    return "years"


def estimate_crack_time(score, entropy_bits):
    """
    Bucket-style output requested in the prompt, with entropy-guided fallback.
    """
    if score < 20:
        return "instantly"
    if score < 40:
        return "seconds"
    if score < 60:
        return "minutes to hours"
    if score < 80:
        return "days to months"

    # For strongest scores, show a broad "years" estimate.
    guesses_per_second = 1_000_000_000
    total_space = 2 ** min(entropy_bits, 120)
    average_attempts = total_space / 2
    seconds = average_attempts / guesses_per_second
    return format_seconds_to_human(seconds)


def analyze_password_strength(password):
    score = 0
    suggestions = []
    lowered = password.lower()

    # Length scoring
    if len(password) >= 8:
        score += 15
    else:
        suggestions.append("Increase length to at least 8 characters.")

    if len(password) >= 12:
        score += 20
    else:
        suggestions.append("Use 12+ characters for stronger brute-force resistance.")

    if len(password) >= 16:
        score += 10

    # Character variety scoring
    if re.search(r"[a-z]", password):
        score += 10
    else:
        suggestions.append("Add lowercase letters.")

    if re.search(r"[A-Z]", password):
        score += 10
    else:
        suggestions.append("Add uppercase letters.")

    if re.search(r"[0-9]", password):
        score += 10
    else:
        suggestions.append("Add numbers.")

    if re.search(r"[^A-Za-z0-9]", password):
        score += 15
    else:
        suggestions.append("Add special characters (e.g., ! @ # $).")

    # Penalties for common weak patterns
    if lowered in COMMON_WEAK_PASSWORDS:
        score -= 40
        suggestions.append("Avoid common passwords used in dictionary attacks.")

    if any(fragment in lowered for fragment in DICTIONARY_FRAGMENTS):
        score -= 12
        suggestions.append("Avoid dictionary words and predictable fragments.")

    if re.search(r"(.)\1{2,}", password):
        score -= 12
        suggestions.append("Avoid repeated character patterns like aaa or 111.")

    if has_sequential_pattern(password):
        score -= 12
        suggestions.append("Avoid sequential patterns like 1234 or abcd.")

    score = clamp(score, 0, 100)
    entropy_bits = estimate_entropy_bits(password)
    crack_time = estimate_crack_time(score, entropy_bits)

    if score < 35:
        strength = "Weak"
        strength_class = "weak"
    elif score < 60:
        strength = "Moderate"
        strength_class = "moderate"
    elif score < 80:
        strength = "Strong"
        strength_class = "strong"
    else:
        strength = "Very Strong"
        strength_class = "very-strong"

    if not suggestions and strength in {"Strong", "Very Strong"}:
        suggestions = ["Great job. Keep this password unique and use MFA for better protection."]

    return {
        "score": score,
        "strength_level": strength,
        "strength_class": strength_class,
        "entropy_bits": round(entropy_bits, 1),
        "crack_time": crack_time,
        "suggestions": suggestions,
    }


def contains_any(text, words):
    text_lower = text.lower()
    return any(word in text_lower for word in words)


def suspicious_sender_domain(sender_email):
    """
    Checks sender format and common suspicious domain patterns.
    """
    if "@" not in sender_email:
        return True

    domain = sender_email.split("@")[-1].lower().strip()
    if not domain or "." not in domain:
        return True

    # Common spoof-like characteristics.
    if re.search(r"[0-9]", domain):
        return True
    if domain.count("-") >= 2:
        return True
    if any(token in domain for token in ["secure-login", "verify-account", "update-security"]):
        return True

    return False


def suspicious_link(link):
    if not link:
        return False

    link = link.strip()
    if not link:
        return False

    parsed = urlparse(link)
    domain = parsed.netloc.lower()

    if parsed.scheme == "http":
        return True

    if re.match(r"^\d{1,3}(\.\d{1,3}){3}$", domain):
        return True

    if domain in SHORTENER_DOMAINS:
        return True

    if "@" in link:
        return True

    if domain.count("-") >= 2:
        return True

    return False


def analyze_phishing_message(sender, subject, body, link):
    combined_text = f"{subject} {body}".lower()
    score = 0
    indicators = []
    recommendations = set()

    if contains_any(combined_text, URGENT_KEYWORDS):
        score += 10
        indicators.append("Urgent language detected (pressure tactic).")
        recommendations.add("Pause before acting. Urgency is a common social-engineering trick.")

    if contains_any(combined_text, CREDENTIAL_KEYWORDS):
        score += 20
        indicators.append("Message appears to request login credentials/password.")
        recommendations.add("Never share passwords through email. Use official login portals only.")

    if contains_any(combined_text, PAYMENT_KEYWORDS):
        score += 20
        indicators.append("Payment request language detected.")
        recommendations.add("Verify payment requests with a trusted contact using a separate channel.")

    if suspicious_sender_domain(sender):
        score += 15
        indicators.append("Suspicious sender domain or sender format.")
        recommendations.add("Verify sender identity directly before responding.")

    if suspicious_link(link):
        score += 15
        indicators.append("Suspicious link pattern detected.")
        recommendations.add("Do not click suspicious links. Type known URLs manually.")

    if contains_any(combined_text, IMPERSONATION_KEYWORDS):
        score += 10
        indicators.append("Possible impersonation language detected.")
        recommendations.add("Confirm identity claims through official company channels.")

    score = clamp(score, 0, 100)

    if score < 25:
        risk_level = "Low"
        risk_class = "low"
    elif score < 50:
        risk_level = "Moderate"
        risk_class = "moderate"
    elif score < 75:
        risk_level = "High"
        risk_class = "high"
    else:
        risk_level = "Critical"
        risk_class = "critical"

    if not indicators:
        indicators = ["No strong phishing indicators detected by current rule set."]
        recommendations.add("Still verify unexpected messages before taking action.")

    return {
        "score": score,
        "risk_level": risk_level,
        "risk_class": risk_class,
        "indicators": indicators,
        "recommendations": sorted(recommendations),
    }


@app.route("/")
def dashboard():
    return render_template("index.html", active_page="dashboard")


@app.route("/password-analyzer", methods=["GET", "POST"])
def password_analyzer():
    result = None
    password_value = ""

    if request.method == "POST":
        password_value = request.form.get("password", "")
        result = analyze_password_strength(password_value)

    return render_template(
        "password_tool.html",
        active_page="password",
        password_value=password_value,
        result=result,
    )


@app.route("/phishing-detector", methods=["GET", "POST"])
def phishing_detector():
    result = None
    form_data = {"sender_email": "", "subject": "", "body": "", "link": ""}

    if request.method == "POST":
        form_data = {
            "sender_email": request.form.get("sender_email", "").strip(),
            "subject": request.form.get("subject", "").strip(),
            "body": request.form.get("body", "").strip(),
            "link": request.form.get("link", "").strip(),
        }
        result = analyze_phishing_message(
            sender=form_data["sender_email"],
            subject=form_data["subject"],
            body=form_data["body"],
            link=form_data["link"],
        )

    return render_template(
        "phishing_tool.html",
        active_page="phishing",
        result=result,
        form_data=form_data,
    )


if __name__ == "__main__":
    app.run(debug=True)
