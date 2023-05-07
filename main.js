const issueList = document.querySelector("#issue-list");
const pageHeader = document.getElementById("page-number");

let pagenumber = 1;

const fetchIssues = async () => {
  const url = `https://api.github.com/repositories/1296269/issues?page=${pagenumber}&per_page=5`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const displayIssues = (issues) => {
  issueList.innerHTML = "";
  issues.forEach((issue) => {
    const issueName = issue.title;
    const newissue = document.createElement("li");
    newissue.textContent = issueName;
    issueList.appendChild(newissue);
  });
};

const loadNextPage = async () => {
  pagenumber += 1;
  const issues = await fetchIssues();
  displayIssues(issues);
  pageHeader.textContent = `Page number${pagenumber}`;
};

fetchIssues().then((issues) => {
  displayIssues(issues);
  pageHeader.textContent = `Page number ${pagenumber}`;
});

const nextButton = document.querySelector("#next");
nextButton.addEventListener("click", loadNextPage);

const loadprevPage = async () => {
  if (pagenumber > 1) {
    pagenumber -= 1;
    const issues = await fetchIssues();
    displayIssues(issues);
    pageHeader.textContent = `Page number ${pagenumber}`;
  }
};

const prevButton = document.querySelector("#prev");
prevButton.addEventListener("click", loadprevPage);
