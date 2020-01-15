$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    
  }

  function addDeleteUser(userName, userId){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${userId}'>  
              <p class='chat-group-user__name'>${userName}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `;
    $(".js-add-user").append(html);
  }
  

  $("#user-search-field").on("keyup", function() {
    
    let input = $("#user-search-field").val();
    // console.log(input);
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();

      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      } 
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  $("#user-search-result").on("click", ".chat-group-user__btn--add" ,function() {
    // ①追加ボタンが押されたら
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");

    $(this).parent().remove();

    // ②HTMLを作成する関数を呼び出す
    addDeleteUser(userName, userId);
  });
  
  $(document).on("click", ".chat-group-user__btn--remove" ,function() {

    $(this).parent().remove();

  });
      

});

  


































// $(function() {
//   $("#group-search-field").on("keyup", function() {
//     let input = $("#group-search-field").val();
//     console.log(input);
//   });
//   $("#user-search-field").on("keyup", function() {
//     let input = $("#user-search-field").val();
//     console.log(input);
//   });
// });

// $.ajax({
//   type: "GET",  //HTTPメソッド
//   url: "/users",      //users_controllerの、indexアクションにリクエストの送信先を設定する
//   data: { keyword: input },
//   dataType: "json"  //テキストフィールドに入力された文字を設定する
// })  
//   .done(function(users) {
//     console.log("成功です");  
//   })
//   .fail(function() {
//     console.log("失敗です");
//   })