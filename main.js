function main(){
  console.log('script actually ran!');
  prof_map ={}

  function getRating(){
    var grade = this.response.getElementsByClassName("grade")[0].innerHTML;
    prof_map[this.professor] = grade;

  }

  function reqListener(){
    var response = this.response;
    var list = response.getElementsByClassName("listing");
    if (list.length < 1){
      prof_map[this.professor] = "N/A"
      return
    }
    var rating_url = list[0].children[0].href;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getRating);
    xhr.responseType="document";
    xhr.professor = this.professor;
    xhr.open("GET", rating_url, true);
    xhr.send();
  }

  var table = document.getElementById('listViewData');
  table.addEventListener('DOMSubtreeModified', function(e){
    var class_list = (table.children[1].children);
    for (var i=0; i < class_list.length; i++){
      var row = class_list[i];
      var professor = row.children[3].innerHTML;
      professor = professor.trim().split(" ");
      var query=professor[0].slice(0,-1) + '+' + professor[1];
      if (!prof_map.hasOwnProperty(query)){
        var url = "https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=Bucknell&schoolID=&query=" + query;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', reqListener);
        xhr.responseType="document";
        xhr.professor = query;
        xhr.open("GET", url, true);
        xhr.send();
      }
      row.addEventListener('mouseover', function(e){
        showPopup(e, prof_map[query]);
      });
    }
  });
}

function showPopup(e, rating){
  var page = document.getElementsByClassName('container-fluid')[0];
  var popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerText = rating;
  page.appendChild(popup);
}
main();
