let todos = JSON.parse(localStorage.getItem('todos')) || []

const userName = prompt('사용자 이름 입력 : ') // 사용자 이름 설정

if(userName !== null && userName.trim() !== ''){ //사용자 이름이 null, 공백을 제거한 빈 문자열이 아니면
    document.querySelector('.user-name').textContent = userName.trim()  //user-name의 HTML에 prompt입력 값 삽입
}
else{
    document.querySelector('.user-name').textContent = '게스트' //사용자 이름이 null값이거나 빈 문자열이면 게스트 문자열 삽입
}


wirteTodo()
 /*1. 호이스팅 때문에 함수 호출 가능 
   2. 웹 브라우저 실행 시 기존에 있던 목록들 실행*/ 


function wirteTodo(){  //ul클래스 js-todo-list안에 li목록 input,span,button 기능 넣기 및 사용자 입력 값 화면 출력
    let todoHTML = ''
    todos.forEach(function(item, index){ //itme은 배열안의 객체 키값 접근기능 index는 배열안의 객체 순서 기능
        const isDone = item.completed ? 'done' : '' //CSS 클래스명 기능, item.completed값이 참이면 done 아니면 빈 문자열
        const isChecked = item.completed ? 'checked' : '' //체크박스 버튼 V표시 켜짐, 꺼짐 기능
        todoHTML += `<li class="todo-item">
                        <input type="checkbox" ${isChecked} onclick="toggleTodo(${index})">
                        <span class="item-text ${isDone}">${item.todo} - ${item.date}</span>
                        <button onclick="updateTodo(${index})" class="update-btn">수정</button>
                        <button onclick="deleteTodo(${index})" class="delete-btn">삭제</button>
                    </li>`
    }) //todoHTML 변수안에 updateTodo,delete함수 버튼, span으로 사용자 입력한 배열내의 객체 출력, 완료 여부 체크박스 기능 담기

    document.querySelector('.js-todo-list').innerHTML = todoHTML //js-todo-list 클래스에 todoHTML 변수 값 삽입
}
function enterKey(event) {  //HTML의 onkeydown을 이용하여 Enter키 입력 시 addTodo()함수 실행
    if(event.key == 'Enter'){
        addTodo()
    }
}

function addTodo() { //사용자가 input에 입력한 값들 배열안의 객체에 저장 기능
    const todoElem = document.querySelector('.js-todo-input') //js-todo-input 클래스를 가진 HTML 태그를 가져와서 상수 todoElem에 저장
    const todoWrite = todoElem.value //js-todo-input의 입력값을 todoWirte 상수에 저장

    const dateElem = document.querySelector('.js-date-input') //js-date-input 클래스를 가진 HTML 태그를 가져와서 상수 dateElem에 저장
    const todoDate = dateElem.value //js-date-input의 입력값을 todoDate 상수에 저장

    if(todoWrite.trim() === '' || todoDate.trim() === ''){ //todoWrite와 todoDate의 사용자 입력값이 공백을 제거한 빈 문자열일 경우 
        alert('할 일과 날짜를 모두 적어주세요.') //경고 출력
        todoElem.value = ''  //js-todo-input클래스 입력값 지우고 다시 입력하게 초기화
        dateElem.value = ''  //js-date-input클래스 입력값 지우고 다시 입력하게 초기화

        return //조건이 끝난 후 함수 현 위치에서 즉시 종료
       
    }
    todos.push({ //todos 배열안에 사용자 입력값 객체로 삽입
        todo: todoWrite,
        date: todoDate,
        completed: false
    })
    localStorage.setItem('todos', JSON.stringify(todos))

    wirteTodo() //사용자 입력값 화면 출력 및 li목록안에 다양한 버튼기능 함수호출

    todoElem.value = '' //다음 할 일 입력을 위해 text초기화
    dateElem.value = '' 
}

function toggleTodo(index){ // 배열 내 특정(몇 번째) 객체의 완료 여부(true/false) 상태를 반전하고 화면 선을 토글하는 기능

    todos[index].completed = !todos[index].completed //배열안의 특정 객체 completed 값 반전 후 completed 값 저장
    localStorage.setItem('todos',JSON.stringify(todos))//반전 된 최신 배열안의 객체들을 문자열로 다시 저장
    
    const todoElements = document.querySelectorAll('.item-text') //화면에 있는 할 일목록들을 다 가져와 상수 todoElements에 저장
    const selectedText = todoElements[index] //내가 선택한 배열내의 특정 객체를 가져와 상수 selectedText에 저장
    
    selectedText.classList.toggle('done') //선택한 특정 객체의 클래스가 done이 있다면 빼고 없다면 추가하는 기능
}

function updateTodo(index){ //배열내의 특정(몇번 째) 객체 값 수정
    const newTodo = prompt('수정할 할 일 입력 : ', todos[index].todo) // 수정창을 띄우고 기존 할 일 내용을 미리 채워둠, 사용자가 새로 입력한 값을 상수 newTodo에 저장
    const newDate = prompt('수정할 날짜 입력 : ', todos[index].date)  // 위와 동일

    if(newTodo !== null && newDate !== null) { //사용자가 수정창에서 취소를 누르지 않고 정상적으로 확인을 눌렀을 경우
        todos[index].todo = newTodo.trim() //배열내의 특정 인덱스 객체 키의값 수정할 내용 공백제거 후 객체 키값 저장
        todos[index].date = newDate.trim() ////배열내의 특정 인덱스 객체 키의값 수정할 내용 공백제거 후 객체 키값 저장

        localStorage.setItem('todos',JSON.stringify(todos)) //수정한 내용 문자열형태로 저장
        wirteTodo() //화면 출력 및 다양한 버튼기능 호출
    }
}

function deleteTodo(index) { //배열내의 특정(몇번 째) 객체 삭제

    todos.splice(index, 1) //배열안의 특정 인덱스 1개 삭제 기능
    localStorage.setItem('todos', JSON.stringify(todos))//특정 객체 삭제 후 문자열형태로 저장

    wirteTodo() //화면 출력 및 다양한 버튼기능 호출
}