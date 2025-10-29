let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function displayBookmarks() {
  const list = document.getElementById("bookmarkList");
  list.innerHTML = "";
  bookmarks.forEach((b, idx) => {
    list.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td>${b.name}</td>
        <td>
          <button class="btn btn-success btn-sm" onclick="visitSite('${b.url}')">
            <i class="fa-solid fa-eye"></i> Visit
          </button>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteBookmark(${idx})">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    `;
  });
}

function addBookmark() {
  const name = document.getElementById('siteName').value.trim();
  const url = document.getElementById('siteURL').value.trim();

  if (!name || !isValidURL(url)) {
    alert("Please enter a valid name and URL (example: https://example.com)");
    return;
  }

  bookmarks.push({ name, url });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  clearInputs();
  displayBookmarks();
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}

function visitSite(url) {
  if (!url.startsWith("http")) url = "https://" + url;
  window.open(url, "_blank");
}

function isValidURL(string) {
  const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
  return pattern.test(string);
}

function clearInputs() {
  document.getElementById('siteName').value = "";
  document.getElementById('siteURL').value = "";
}

displayBookmarks();
