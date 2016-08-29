function main(){
  console.log('script actually ran!');

  function reqListener(){
    var response = this.response;
    var list = response.getElementsByClassName("listing")[0];
    console.log(list.children[0].href);
  }

  var table = document.getElementById('listViewData');
  table.addEventListener('mouseover', function(){
    var class_list = (table.children[1].children);
    console.log(class_list);
    var professor_list=[];
    for (var i=0; i < class_list.length; i++){
      var professor = class_list[i].children[3].innerHTML;
      professor = professor.trim().split(" ");
      console.log(professor);
      var query=professor[0] + '+' + professor[1];
      console.log(query);
      var url = "https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=Bucknell&schoolID=&query=" + query;
      professor_list.push(professor);
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', reqListener);
      xhr.responseType="document";
      xhr.open("GET", url, true);
      xhr.send();
    }
  });
}
main();
