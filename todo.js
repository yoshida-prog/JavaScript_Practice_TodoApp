let todoArray = [];
let todoId = 0;
const buttonName1 = '作業中';
const buttonName2 = '完了';
const buttonName3 = '削除';

function addTodo(){
  let newTodo = addForm.todoComment.value;
  // 空文字のみの時はリストに追加しないようにする
  if(newTodo.match(/\S/g)){
    // テキストボックスに入力した内容を配列に追加・IDを決定
    todoArray.push(newTodo);
    // 入力内容を表示する準備
    // あらかじめ用意されているdivタグ内に、ID・内容・ボタン2つをセットにして格納する用のdivタグ(newDiv)を作成
    const todoListDiv = document.getElementById('todoList');
    const newDiv = document.createElement('div');
    newDiv.className = 'todo';
    newDiv.id = todoId;
    // IDと内容はspanタグに格納
    const todoIdTxtBox = document.createElement('span');
    const todoIdTxt = document.createTextNode(todoId);
    todoIdTxtBox.id = 'ID'+todoId;
    todoIdTxtBox.appendChild(todoIdTxt);
    const commentBox = document.createElement('span');
    const comment = document.createTextNode(newTodo);
    commentBox.appendChild(comment);
    // ボタンを2つ作成
    const stateButton = document.createElement('button');
    stateButton.id = 'workingBtn' + todoId;
    stateButton.textContent = buttonName1;
    const deleteButton = document.createElement('button');
    deleteButton.id = 'deleteBtn' + todoId;
    deleteButton.textContent = buttonName3;
    // newDivにID・内容・ボタン2つを追加してあらかじめ用意されていたdivタグに追加
    newDiv.appendChild(todoIdTxtBox);
    newDiv.appendChild(commentBox);
    newDiv.appendChild(stateButton);
    newDiv.appendChild(deleteButton);
    todoListDiv.appendChild(newDiv);
    todoId++;
  }else{
    alert('空文字のみで入力しないでください');
  }
  document.getElementById('todoComment').value = '';
}

// todoの状態を作業中・完了に変更したり、削除したりするメソッド
function changeTodo(e){
  // クリックした要素のidを取得
  // 作業中・完了・削除ボタンいずれかのidと合致していたら処理スタート
  let id = e.target.id;
  let btnValue = e.target.textContent;
  if(btnValue === buttonName1){
    changeWorkingTodo(id);
  }else if(btnValue === buttonName2){
    changeCompleteTodo(id);
  }else if(btnValue === buttonName3){
    deleteTodo(id);
  }
}

// todoを削除するメソッド
function deleteTodo(id){
  // 削除するtodoのidを取得して削除
  let removeId = id.replace('deleteBtn', '');
  document.getElementById(removeId).remove();
  // 削除したtodoのidより後にあるtodoの各要素のid・idナンバーを変更
  while(removeId < todoId-1){
    removeId = String(removeId);
    // 削除したtodo以降にあるIDが振られているspan要素のidタグ・作業中・完了ボタン
    // と同じ値になる変数
    let idNum = 'ID'+ (Number(removeId)+1);
    let completeBtnId = 'completeBtn'+(Number(removeId)+1);
    let workingBtnId = 'workingBtn'+(Number(removeId)+1);
    // 削除したtodo以降にある削除ボタンの新しいidを作成するための変数
    let newBtnId = 'deleteBtn' + removeId;
    // 削除したtodo以降にある削除ボタンのidを取得するための変数
    let deleteBtnNum = newBtnId.replace(removeId, Number(removeId)+1);
    // 削除したtodo以降にあるclass='todo'にあたる要素のidを取得するための変数
    let parentId = Number(removeId) + 1;
    // 変更をかける要素を取得して変更
    // 作業中・完了ボタンはどちらの状態か確認してから変更
    const idDoc = document.getElementById(idNum);
    const btnDoc = document.getElementById(deleteBtnNum);
    const todoDiv = document.getElementById(parentId);
    if(document.getElementById(completeBtnId)){
      const stateBtnDoc = document.getElementById(completeBtnId);
      stateBtnDoc.id = 'completeBtn'+removeId;
    }else if(document.getElementById(workingBtnId)){
      const stateBtnDoc = document.getElementById(workingBtnId);
      stateBtnDoc.id = 'workingBtn'+removeId;
    }
    idDoc.textContent = removeId;
    idDoc.id = 'ID'+removeId;
    btnDoc.id = newBtnId;
    todoDiv.id = removeId;
    removeId++;
  }
  // 新規タスクを追加する際に連番になるようにする
  todoId--;
}

// 作業中ボタンを押した時、完了状態に変更するメソッド
function changeWorkingTodo(id){
  const workingId = id.replace('workingBtn', '');
  const workingBtnDoc = document.getElementById(id);
  workingBtnDoc.id = 'completeBtn'+workingId;
  workingBtnDoc.textContent = buttonName2;
}

// 完了ボタンを押した時、作業中状態に変更するメソッド
function changeCompleteTodo(id){
  const completeId = id.replace('completeBtn', '');
  const completeBtnDoc = document.getElementById(id);
  completeBtnDoc.id = 'workingBtn'+completeId;
  completeBtnDoc.textContent = buttonName1;
}

// クリックイベントでtodoを追加
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addTodo, false);

// クリックイベントでtodoを操作（状態変更・削除）
window.addEventListener('click', changeTodo, false);
