let allleftinnerdiv = [];
let LSarray = [];
let LSstring = localStorage.getItem("LSarray");
if (LSstring != null) {
  try {
    LSarray = JSON.parse(LSstring);
  } catch (e) {
    LSarray = [];
  }
}

function saveLocalStorage() {
  localStorage.setItem("LSarray", JSON.stringify(LSarray));
}

function myLS(uppertitle, upperdescription) {
  let task = {
    title: uppertitle,
    description: upperdescription,
    responses: [],
  };
  LSarray.push(task);
  saveLocalStorage();
}

let upperdiv = myupperdiv();
function myupperdiv() {
  let upperdiv = document.createElement("div");
  upperdiv.innerHTML = "<h1>Discussion Portal</h1>";
  upperdiv.style.height = "20%";
  upperdiv.style.color = "white";
  upperdiv.style.padding = "10px";
  upperdiv.style.fontSize = "20px";
  upperdiv.style.fontWeight = "bold";
  upperdiv.style.backgroundColor = "rgba(4, 69, 53, 0.78)";
  return upperdiv;
}

let leftdiv = myleftdiv();
function myleftdiv() {
  let leftdiv = document.createElement("div");
  leftdiv.style.width = "35%";
  leftdiv.style.backgroundColor = "lightgrey";
  leftdiv.style.padding = "10px";
  leftdiv.style.borderRight = "2px solid black";
  leftdiv.style.height = "90vh";
  leftdiv.style.overflowY = "auto";
  leftdiv.style.boxSizing = "border-box";
  leftdiv.style.float = "left";

  let box = document.createElement("div");
  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.gap = "20px";
  box.style.padding = "10px";
  box.style.backgroundColor = "white";

  let newBtn = document.createElement("button");
  newBtn.innerText = "New Question form";
  newBtn.style.padding = "10px";
  newBtn.style.fontSize = "16px";
  newBtn.style.backgroundColor = "#007bff";
  newBtn.style.color = "white";
  newBtn.style.border = "none";
  newBtn.style.borderRadius = "2px";
  newBtn.style.width = "45%";
  newBtn.style.cursor = "pointer";

  newBtn.onclick = function () {
    rightdiv.innerHTML = "";
    document.body.appendChild(myrightdiv());
  };

  box.appendChild(newBtn);

  let searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.placeholder = "search questions...";
  searchBox.style.padding = "10px";
  searchBox.style.fontSize = "16px";
  searchBox.style.width = "45%";
  searchBox.style.boxSizing = "border-box";

  searchBox.addEventListener("input", function () {
    const searchTerm = searchBox.value.toLowerCase();
    allleftinnerdiv.forEach(({ element, title, description }) => {
      const match =
        title.toLowerCase().includes(searchTerm) ||
        description.toLowerCase().includes(searchTerm);
      element.style.display = match ? "block" : "none";
    });
  });

  box.appendChild(searchBox);
  leftdiv.appendChild(box);

  return leftdiv;
}

function myleftinnerdiv(title, description, responses = []) {
  let leftinnerdiv = document.createElement("div");
  let now = new Date();
  let dateTime = now.toLocaleString();

  leftinnerdiv.innerHTML = `<small style="color:white;">${dateTime}</small><h1>${title}</h1><p>${description}</p>`;
  leftinnerdiv.style.backgroundColor = "lightgrey";
  leftinnerdiv.style.borderBottom = "1px solid black";
  leftinnerdiv.style.textAlign = "left";
  leftinnerdiv.style.width = "100%";
  leftinnerdiv.style.cursor = "pointer";
  leftinnerdiv.style.padding = "10px";
  leftinnerdiv.style.marginBottom = "5px";

  leftinnerdiv.onclick = function () {
    rightdiv.innerHTML = "";

    let questionBlock = document.createElement("div");
    let heading = document.createElement("h1");
    heading.innerText = "Question";
    questionBlock.appendChild(heading);
    questionBlock.appendChild(
      myrightinnerdiv1(title, description, leftinnerdiv)
    );

    let responseBlock = document.createElement("div");
    let responseHeading = document.createElement("h1");
    responseHeading.innerText = "Responses";
    responseBlock.appendChild(responseHeading);
    let responseBox = myrightinnerdiv2();

    let taskIndex = LSarray.findIndex(
      (t) => t.title === title && t.description === description
    );
    if (taskIndex > -1) {
      LSarray[taskIndex].responses.forEach((r) => {
        responseBox.appendChild(
          createReplyElement(r, taskIndex, LSarray[taskIndex].responses)
        );
      });
    }

    responseBlock.appendChild(responseBox);
    rightdiv.appendChild(questionBlock);
    rightdiv.appendChild(responseBlock);
    rightdiv.appendChild(myrightinnerdiv3(title, description));
  };

  leftdiv.appendChild(leftinnerdiv);
  allleftinnerdiv.push({ element: leftinnerdiv, title, description });
}

let rightinnerdiv;
let rightdiv = document.createElement("div");
rightdiv.style.width = "65%";
rightdiv.style.backgroundColor = "#f9f9f9";
rightdiv.style.padding = "20px";
rightdiv.style.overflowY = "auto";
rightdiv.style.boxSizing = "border-box";
rightdiv.style.float = "right";
rightdiv.style.height = "90vh";

function myrightdiv() {
  rightdiv.innerHTML = "";

  let heading = document.createElement("h1");
  heading.innerText = "Welcome to Discussion Portal !";
  rightdiv.appendChild(heading);

  let sub = document.createElement("p");
  sub.innerText = "Enter a subject and question to get started";
  rightdiv.appendChild(sub);

  rightinnerdiv = document.createElement("div");
  rightinnerdiv.style.justifyContent = "end";
  rightinnerdiv.style.height = "350px";
  rightinnerdiv.style.width = "225px";
  rightinnerdiv.style.margin = "1%";

  let input1 = document.createElement("input");
  input1.placeholder = "Subject";
  input1.style.width = "300px";
  input1.style.padding = "10px";
  input1.style.fontSize = "16px";
  input1.style.marginBottom = "10px";

  let input2 = document.createElement("textarea");
  input2.placeholder = "Question";
  input2.style.width = "500px";
  input2.style.height = "100px";
  input2.style.padding = "5px";
  input2.style.fontSize = "16px";
  input2.style.marginTop = "10px";

  let submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.style.marginTop = "10px";
  submitBtn.style.padding = "10px 20px";
  submitBtn.style.backgroundColor = "#007bff";
  submitBtn.style.color = "white";
  submitBtn.style.border = "none";
  submitBtn.style.borderRadius = "5px";
  submitBtn.style.cursor = "pointer";
  submitBtn.style.float = "left";

  submitBtn.onclick = function () {
    let title = input1.value.trim();
    let description = input2.value.trim();
    if (title && description) {
      myleftinnerdiv(title, description);
      myLS(title, description);
      input1.value = "";
      input2.value = "";
    } else {
      alert("Please fill both fields");
    }
  };

  rightinnerdiv.appendChild(input1);
  rightinnerdiv.appendChild(input2);
  rightinnerdiv.appendChild(submitBtn);
  rightdiv.appendChild(rightinnerdiv);

  return rightdiv;
}

function myrightinnerdiv1(title, description, elementToRemove) {
  let rightinnerdiv1 = document.createElement("div");
  rightinnerdiv1.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
  rightinnerdiv1.style.backgroundColor = "lightgrey";
  rightinnerdiv1.style.justifyContent = "end";
  rightinnerdiv1.style.height = "90px";
  rightinnerdiv1.style.width = "100%";
  rightinnerdiv1.style.margin = "1%";

  let resolveBtn = document.createElement("button");
  resolveBtn.innerText = "Resolve";
  resolveBtn.style.marginTop = "10px";
  resolveBtn.style.padding = "10px 20px";
  resolveBtn.style.backgroundColor = "#007bff";
  resolveBtn.style.color = "white";
  resolveBtn.style.border = "none";
  resolveBtn.style.borderRadius = "5px";
  resolveBtn.style.cursor = "pointer";
  resolveBtn.style.float = "right";

  resolveBtn.onclick = function () {
    leftdiv.removeChild(elementToRemove);
    LSarray = LSarray.filter(
      (task) => !(task.title === title && task.description === description)
    );
    saveLocalStorage();
    rightdiv.innerHTML = "";
    document.body.appendChild(myrightdiv());
  };

  rightinnerdiv1.appendChild(resolveBtn);
  return rightinnerdiv1;
}

function myrightinnerdiv2() {
  let rightinnerdiv2 = document.createElement("div");
  rightinnerdiv2.id = "responses";
  rightinnerdiv2.style.backgroundColor = "lightgrey";
  rightinnerdiv2.style.textAlign = "left";
  rightinnerdiv2.style.padding = "5px";
  rightinnerdiv2.style.margin = "1%";
  rightinnerdiv2.style.width = "100%";
  return rightinnerdiv2;
}

function createReplyElement(replyObj, taskIndex, parentRepliesArray) {
  let resDiv = document.createElement("div");
  resDiv.style.margin = "10px 0 0 20px";
  resDiv.style.padding = "5px";
  resDiv.style.borderLeft = "2px solid gray";
  resDiv.style.background = "#f2f2f2";

  let meta = document.createElement("small");
  meta.style.color = "gray";
  meta.innerText = replyObj.date;

  let resName = document.createElement("h3");
  resName.innerText = replyObj.name;

  let resComment = document.createElement("p");
  resComment.innerText = replyObj.comment;

  let btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.gap = "8px";
  btnContainer.style.marginTop = "5px";

  let likeBtn = document.createElement("button");
  likeBtn.innerText = `👍 ${replyObj.likes || 0}`;
  likeBtn.onclick = () => {
    replyObj.likes = (replyObj.likes || 0) + 1;
    likeBtn.innerText = `👍 ${replyObj.likes}`;
    saveLocalStorage();
  };

  let dislikeBtn = document.createElement("button");
  dislikeBtn.innerText = `👎 ${replyObj.dislikes || 0}`;
  dislikeBtn.onclick = () => {
    replyObj.dislikes = (replyObj.dislikes || 0) + 1;
    dislikeBtn.innerText = `👎 ${replyObj.dislikes}`;
    saveLocalStorage();
  };

  let replyBtn = document.createElement("button");
  replyBtn.innerText = "💬 Reply";

  let replyForm = document.createElement("div");
  replyForm.style.display = "none";
  replyForm.style.marginTop = "5px";

  let replyNameInput = document.createElement("input");
  replyNameInput.placeholder = "Your Name";
  replyNameInput.style.marginRight = "5px";

  let replyCommentInput = document.createElement("input");
  replyCommentInput.placeholder = "Your Comment";
  replyCommentInput.style.marginRight = "5px";

  let replySubmit = document.createElement("button");
  replySubmit.innerText = "Post Reply";

  replySubmit.onclick = () => {
    if (replyNameInput.value.trim() && replyCommentInput.value.trim()) {
      let newReply = {
        name: replyNameInput.value.trim(),
        comment: replyCommentInput.value.trim(),
        date: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0,
        replies: [],
      };
      replyObj.replies.push(newReply);
      saveLocalStorage();
      resDiv.appendChild(
        createReplyElement(newReply, taskIndex, replyObj.replies)
      );
      replyNameInput.value = "";
      replyCommentInput.value = "";
      replyForm.style.display = "none";
    }
  };

  replyForm.appendChild(replyNameInput);
  replyForm.appendChild(replyCommentInput);
  replyForm.appendChild(replySubmit);

  replyBtn.onclick = () => {
    replyForm.style.display =
      replyForm.style.display === "none" ? "block" : "none";
  };

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "🗑️ Delete";
  deleteBtn.onclick = () => {
    let index = parentRepliesArray.indexOf(replyObj);
    if (index > -1) {
      parentRepliesArray.splice(index, 1);
      saveLocalStorage();
      resDiv.remove();
    }
  };

  btnContainer.appendChild(likeBtn);
  btnContainer.appendChild(dislikeBtn);
  btnContainer.appendChild(replyBtn);
  btnContainer.appendChild(deleteBtn);

  resDiv.appendChild(meta);
  resDiv.appendChild(resName);
  resDiv.appendChild(resComment);
  resDiv.appendChild(btnContainer);
  resDiv.appendChild(replyForm);

  replyObj.replies.forEach((r) => {
    resDiv.appendChild(createReplyElement(r, taskIndex, replyObj.replies));
  });

  return resDiv;
}

function myrightinnerdiv3(title, description) {
  let rightinnerdiv3 = document.createElement("div");
  rightinnerdiv3.style.marginTop = "20px";

  let heading = document.createElement("h2");
  heading.innerText = "Add Response";
  rightinnerdiv3.appendChild(heading);

  let inputName = document.createElement("input");
  inputName.placeholder = "Your Name";
  inputName.style.display = "block";
  inputName.style.marginBottom = "10px";

  let inputComment = document.createElement("textarea");
  inputComment.placeholder = "Your Comment";
  inputComment.style.display = "block";
  inputComment.style.marginBottom = "10px";
  inputComment.style.width = "300px";
  inputComment.style.height = "80px";

  let submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.style.marginTop = "5px";

  submitBtn.onclick = () => {
    if (inputName.value.trim() && inputComment.value.trim()) {
      let taskIndex = LSarray.findIndex(
        (t) => t.title === title && t.description === description
      );
      if (taskIndex > -1) {
        let newResponse = {
          name: inputName.value.trim(),
          comment: inputComment.value.trim(),
          date: new Date().toLocaleString(),
          likes: 0,
          dislikes: 0,
          replies: [],
        };
        LSarray[taskIndex].responses.push(newResponse);
        saveLocalStorage();
        document
          .getElementById("responses")
          .appendChild(
            createReplyElement(
              newResponse,
              taskIndex,
              LSarray[taskIndex].responses
            )
          );
      }
      inputName.value = "";
      inputComment.value = "";
    } else {
      alert("Please fill both fields");
    }
  };

  rightinnerdiv3.appendChild(inputName);
  rightinnerdiv3.appendChild(inputComment);
  rightinnerdiv3.appendChild(submitBtn);

  return rightinnerdiv3;
}

document.body.appendChild(upperdiv);
document.body.appendChild(leftdiv);
document.body.appendChild(myrightdiv());

for (let i = 0; i < LSarray.length; i++) {
  let task = LSarray[i];
  myleftinnerdiv(task.title, task.description, task.responses || []);
}
