let links = [];
const searchInput = document.getElementById('search');
const card = document.querySelector('.card');

const getLinks = async () => {
  await fetch('./links.json')
    .then((response) => response.json())
    .then((data) => {
      links = data;
    })
    .catch((error) => console.log(error));
};

const displayLinks = (links) => {
  card.innerHTML = '';

  links.forEach((link) => {
    // Create a link container
    let linkContainer = document.createElement('div');
    linkContainer.className = 'link-container';

    let linkUrl = document.createElement('a');
    linkUrl.href = link['link'];
    linkUrl.textContent = link['link'];

    let linkDescription = document.createElement('p');
    linkDescription.textContent = link['description'];
    linkDescription.className = 'link';

    let linkKeywords = document.createElement('small');
    linkKeywords.className = 'keywords';
    linkKeywords.textContent = link['keywords'];

    linkContainer.appendChild(linkUrl);
    linkContainer.appendChild(linkDescription);
    linkContainer.appendChild(linkKeywords);

    card.appendChild(linkContainer);
  });
};

const loadLinks = () => {
  const query = searchInput.value || '';
  const lowercaseQuery = query.toLowerCase();


  const filterKeys = ['link', 'description', 'keywords'];
  let filteredLinks = links.filter((item) => {
    // Check if all keys are present or not
    if (!filterKeys.every((key) => key in item)) return false;

    // match the keys
    return filterKeys.some((key) => {
      return item[key].toLowerCase().includes(lowercaseQuery);
    });
  });

  // Display the links
  displayLinks(filteredLinks);
};

const setup = async () => {
  // Loading the links
  await getLinks();

  searchInput.addEventListener('input', loadLinks);

  // For the initial Load
  loadLinks();
};

// Initial Setup
setup();
