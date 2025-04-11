const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strengthText");
const tipsList = document.getElementById("tipsList");
const showPasswordsBtn = document.getElementById("showPasswordsBtn");
const previousPasswordsList = document.getElementById("previousPasswords");

let previousPasswords = [];

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  if (password && !previousPasswords.includes(password)) {
  previousPasswords.push(password);
  }

const strength = checkStrength(password);
const tips = getTips(password);

strengthText.textContent = strength.message;
strengthText.style.color = strength.color;

renderTips(tips);
});

showPasswordsBtn.addEventListener("click", () => {
if (previousPasswordsList.style.display === "none") {
renderPreviousPasswords();
previousPasswordsList.style.display = "block";
showPasswordsBtn.textContent = "Hide Previous Passwords";
  } else {
previousPasswordsList.style.display = "none";
showPasswordsBtn.textContent = "Show Previous Passwords";
  }
});

function checkStrength(password) {
if (password.length === 0) {
  return { message: "Password strength will appear here.", color: "#333" };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;

  switch (score) {
  case 0:
  case 1:
  return { message: "Very Weak", color: "red" };
case 2:
  return { message: "Weak", color: "orange" };
  case 3:
  return { message: "Medium", color: "goldenrod" };
case 4:
 return { message: "Strong", color: "green" };
default:
return { message: "Unknown", color: "black" };
  }
}

function getTips(password) {
  const tips = [];

if (password.length < 8) tips.push("Use at least 8 characters.");
if (!/[A-Z]/.test(password)) tips.push("Add at least one uppercase letter.");
if (!/[0-9]/.test(password)) tips.push("Include at least one number.");
if (!/[\W_]/.test(password)) tips.push("Add at least one special character (!@#$...).");

  return tips;
}

function renderTips(tips) {
tipsList.innerHTML = "";

  if (tips.length === 0 && passwordInput.value.length > 0) {
tipsList.innerHTML = "<li>Your password looks strong!</li>";
  } else {
  tips.forEach(tip => {
const li = document.createElement("li");
li.textContent = "• " + tip;
tipsList.appendChild(li);
    });
  }
}

function renderPreviousPasswords() {
previousPasswordsList.innerHTML = "";
previousPasswords.forEach(pwd => {
const li = document.createElement("li");
li.textContent = pwd;
previousPasswordsList.appendChild(li);
  });
}
