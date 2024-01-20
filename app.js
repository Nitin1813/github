document.addEventListener("DOMContentLoaded", function () {
    const profileSection = document.getElementById("profile-section");
    const repositoriesSection = document.getElementById("repositories-section");
    const paginationContainer = document.getElementById("pagination");
    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");
    let currentPage = 1;
    const username = "Nitin1813";
    
    

    const fetchUserDetails = async () => {
        
        const apiUrl = `https://api.github.com/users/${username}`;

        try {
            const response = await fetch(apiUrl);
            const user = await response.json();
            console.log(user);
            displayUserProfile(user);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

          
    const fetchRepositories = async (page = 1) => {
        const perPage = 10; // Default per page
        const apiUrl = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;

        try {
            const response = await fetch(apiUrl);
            const repositories = await response.json();
            // const languagesUrl = repositories.languages_url;
            console.log(repositories)
            // const languagesResponse = await fetch(languagesUrl);
            // const languagesData = await languagesResponse.json();
            // const techStack = Object.keys(languagesData);
            displayRepositories(repositories);
           
            displayPagination(page, perPage);
        } catch (error) {
            console.error("Error fetching repositories:", error);
        }
    };

    const displayUserProfile = (user) => {
        profileSection.innerHTML = `<div class="profile_img">
            <img src="${user.avatar_url}" alt="Profile Image" class="img-fluid mb-2"></div><div>
                
            <h2>${user.name}</h2>

            <p>Username: ${user.login}</p>
            <p>${user.bio}</p>
            <p>Profile URL: <a href="${user.html_url}" target="_blank">${user.html_url}</a></p></div>
        `;
    };

    const displayRepositories = (repositories) => {
        repositoriesSection.innerHTML = "";
        const div = document.createElement("div");
        div.classList.add("Repo");
        repositoriesSection.appendChild(div);
        repositories.forEach(repository => {
            const repositoryElement = document.createElement("div");
            

            repositoryElement.classList.add("repository");
            repositoryElement.innerHTML = `
                <h3>${repository.name}</h3>
                <p>${repository.description || "No description available"}</p>
                <p>Topics: ${repository.topics.join(", ")}</p>
                <p>Tech Stack ${repository.language}</p>
                
            `;
            div.appendChild(repositoryElement);
        });
    };

    const displayPagination = (page, perPage) => {
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(100 / perPage); // Maximum 100 repositories
        const prev = document.createElement("button");
        prev.classList.add("btn","btn-primary", "mr-2");
        prev.id = "prevPegeBtn";
        prev.innerHTML = "Previous";
        paginationContainer.appendChild(prev);
        // <button id="prevPageBtn" class="btn btn-primary mr-2">Previous Page</button>
        // <button id="nextPageBtn" class="btn btn-primary">Next Page</button>
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement("span");
            pageItem.classList.add("pagination-item", "mr-2", "p-2");
            pageItem.textContent = i;
            pageItem.addEventListener("click", () => {
                currentPage = i;
                fetchRepositories(currentPage);
            });

            if (i === page) {
                pageItem.classList.add("active");
            }

            paginationContainer.appendChild(pageItem);
        }
        const next = document.createElement("button");
        next.classList.add("btn","btn-primary","mr-2");
        next.id = "nextPageBtn";
        next.innerHTML = "Next";
        paginationContainer.appendChild(next);
    };

    fetchUserDetails();
    fetchRepositories(currentPage);
    
});

