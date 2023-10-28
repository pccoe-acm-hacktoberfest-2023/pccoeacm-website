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
          tableData += ` <tr>
              <th scope="row">${p * 30 + i + 1}</th>     
              <td><a href="https://auth.geeksforgeeks.org/user/${
                obj.Name
              }" target="_blank">${obj.Name}</a></td>
              <td>${obj.Problems}</td>
              <td>${obj.Score}</td>
            </tr>`;
        }
        
        document.getElementById("table_body").innerHTML = tableData;
       console.log("HIiiiiiiiiiiiiiiii")
        let page = ""
        let  j = 1;
        j = Math.max(j,currentPage-4)
  
        if(j>12){
          
        page += `<li class="page-item"><a onclick="fetchRanks(${1})" class="page-link"href="#">${1}</a></li>`;
        page+=`...`
        }
       for(let i = j; i < (j+12) && i <100;i++){
          page += `<li class="page-item ${ (currentPage+1 == i) ? "active" : ""}"><a onclick="fetchRanks(${i})" class="page-link"href="#">${i}</a></li>`;
        }
        page+=`...`
        page += `<li class="page-item ${ (currentPage+1 == 100) ? "active" : ""}"><a onclick="fetchRanks(${100})" class="page-link"href="#">${100}</a></li>`;
        document.getElementById("paging").innerHTML = page;
  
        console.log("Current Page : "+currentPage)
      });
  };
  
fetchRanks(currentPage)