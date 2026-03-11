const meterFill = document.getElementById("strength-meter-fill");
if (meterFill) {
  // Animate the meter after page load for a smoother result reveal.
  const targetWidth = Number(meterFill.dataset.targetWidth || "0");
  meterFill.style.width = "0%";
  requestAnimationFrame(() => {
    meterFill.style.width = `${Math.max(0, Math.min(100, targetWidth))}%`;
  });
}

const togglePasswordBtn = document.getElementById("toggle-password-btn");
const passwordInput = document.getElementById("password-input");

if (togglePasswordBtn && passwordInput) {
  togglePasswordBtn.addEventListener("click", () => {
    const hidden = passwordInput.type === "password";
    passwordInput.type = hidden ? "text" : "password";
    togglePasswordBtn.textContent = hidden ? "Hide" : "Show";
  });
}
