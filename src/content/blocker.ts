// Basic Content Script Blocker
// Note: In this implementation, the service worker redirects to blocked.html,
// but we keep this script as an additional layer or for alternative injection logic.

const blockedMsg = document.createElement("div");
blockedMsg.innerHTML = `<h1 data-testid="blocked-message" style="text-align: center; margin-top: 100px; color: #ef4444;">Page Blocked</h1>`;
document.body.innerHTML = "";
document.body.appendChild(blockedMsg);
