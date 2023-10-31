let currentPage = 0;

const fetchRanks = async (p) => {
  if (p > 0) {
    p = p - 1;
  }
  currentPage = p;
  console.log(currentPage);
  let url = "https://gfg-pccoeranking.vercel.app/getuser/?p=" + p;
  // console.log(url);

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((objData) => {
      // console.log(objData.res)
      let res = objData.res;
      let tableData = "";
      l = res.length;

      for (let i = 0; i < res.length; i++) {
        obj = res[i];
        let Name = res[i].Name;
        tableData += ` <tr>
              <th scope="row">${p * 30 + i + 1}</th>     
              <td><a href="#" onclick="openPopup('${Name}')" 
              >
              ${obj.Name}
              </a></td>
              <td>${obj.Problems}</td>
              <td>${obj.Score}</td>

             
            </tr>`;
      }

      document.getElementById("table_body").innerHTML = tableData;
      console.log("HIiiiiiiiiiiiiiiii");
      let page = "";
      let j = 1;
      j = Math.max(j, currentPage - 4);

      if (j > 12) {
        page += `<li class="page-item"><a onclick="fetchRanks(${1})" class="page-link"href="#">${1}</a></li>`;
        page += `...`;
      }
      for (let i = j; i < j + 12 && i < 100; i++) {
        page += `<li class="page-item ${
          currentPage + 1 == i ? "active" : ""
        }"><a onclick="fetchRanks(${i})" class="page-link"href="#">${i}</a></li>`;
      }
      page += `...`;
      page += `<li class="page-item ${
        currentPage + 1 == 100 ? "active" : ""
      }"><a onclick="fetchRanks(${100})" class="page-link"href="#">${100}</a></li>`;
      document.getElementById("paging").innerHTML = page;

      console.log("Current Page : " + currentPage);
    });
};

let pop = document.getElementById("popup");
let clsid = document.getElementById("clsid");
// When the user clicks on <span> (x), close the modal
clsid.onclick = function () {
  pop.style.display = "none";
};

const openPopup = async (username) => {
  console.log(username);

  let url = "https://gfg-pccoeranking.vercel.app/user/"+username;

  let data = await fetch(url)
  .then((data)=>{
    return data.json()
  });

  console.log(data.res)
  let college_rank = data.res.college_rank;
  let Institution = data.res.details.Institution;
  let Language_Used = data.res.details['Language Used'];
  let profile_pic = data.res['profile_pic'];
  let overall_score = data.res.scores['Overall Coding Score']
  let total_problem = data.res.scores['Total Problem Solved']
  let monthly_score = data.res.scores['Monthly Coding Score']
  let streak = data.res.streak.streak;
  let gStreak = data.res.streak.global_streak;

  let record = "";
  record+=
  `<div class="user-upper">

                            <div class="profile-img">
                                <img class="profile-imgtag" src="${profile_pic}" alt=""/>
                                <span><b>${college_rank}</b> Rank</span>
                            </div>
                            <div class="profile-details">
                              <span><b>${username}</b></span>
                              <span>${Institution}</span>
                              <span>${Language_Used}</span>
                              <span>${streak} / ${gStreak}</span>
                            </div>
                        </div>
                        <div class="user-lower">
                            <div class="score-card">
                                <h5 class="score-name">Coding Score</h5>
                                <h5 class="score-value"><b>${overall_score}</b></h5>
                            </div><div class="score-card">
                                <h5 class="score-name">Total Problems</h5>
                                <h5 class="score-value"><b>${total_problem}</b></h5>
                            </div><div class="score-card">
                                <h5 class="score-name">Monthly Score</h5>
                                <h5 class="score-value"><b>${monthly_score}</b></h5>
                            </div>
                        </div>`


  document.getElementById("user-data").innerHTML = record
  pop.style.display = "block";
  // pop.classList.add("open-popup")

  window.onclick = function (event) {
    if (event.target == pop) {
      pop.style.display = "none";
    }
  };
};

fetchRanks(currentPage);
