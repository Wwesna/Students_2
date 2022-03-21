$(document).ready(function() {
   $("#tabs").tabs();
   $("#tabs").css("left", "300px");
});

let students = []
let id_current = 0

function load_from_site() {
  let xhr = new XMLHttpRequest();
  xhr.open ('Get', 'http://217.71.129.139:4003/students.php');
  xhr.send();
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert ('Oшибка ${xhr.status}: ${xhr.statusText}');
    }
    else {
        students = JSON.parse(xhr.responseText)['response']
    }
  }
    xhr.onerror = function () {
      alert("Запрос не удался");
    };
}

let mas_group = new Array()
function utilization_data(){
    let tr = document.getElementById('tr')
    for (let i = 0; i < students.length; i++){
        let group =  students[i].group
        if  (mas_group.indexOf(group) == -1){
          mas_group.push(group) 
          let th = document.createElement('th')
          let gh = document.createElement('button')
          gh.textContent = group
          th.appendChild(gh)
          tr.appendChild(th)
          gh.classList.add(group)
          gh.classList.add("data_group") }
  }
}

function average(nums) {
      if(Array.isArray(nums)) {
        let num = nums.reduce((a, b) => (a + b)) / nums.length;
        return num.toFixed(1);
      }
    }
  

function upload_stud_info(){
  let gh_group = document.querySelectorAll('.data_group')
gh_group.forEach.call(gh_group,function(el){
  $(el).click(function(el){
      this.classList.add('upload_stud_info')
      let string = document.getElementById('string')
      var student_container = $('.upload_stud_info').text();
      $('.remove').remove();
      for (let i = 0; i < students.length; i++){
        let group =  students[i].group
        let id =  students[i].id
        let name =  students[i].name
        let surname =  students[i].surname
        let scores =  students[i].scores
        scores_scr = average(students[i].scores)
        if (student_container == group){
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let td5 = document.createElement('td')
        td1.textContent = id
        td2.textContent = name
        td3.textContent = surname
        td4.textContent = scores
        td5.textContent = scores_scr
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        string.appendChild(tr)
        tr.classList.add('remove')
      }
    }
    this.classList.remove('upload_stud_info')
  })
})
}



