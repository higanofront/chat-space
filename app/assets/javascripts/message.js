$(function(){ 

    var buildHTML = function(message) {
      if (message.content && message.image) {
        //data-idが反映されるようにしている
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="main__contents__message-date__message-tolker">` +
              message.user_name +
            `</div>` +
        `<div class="main__contents__message-date__message-info">` +
          message.created_at +
        `</div>` +
          `</div>` +
        `<div class="main__contents__message-date__message-date">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `  </div>`
      } else if (message.content) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="main__contents__message-date__message-tolker">` +
              message.user_name +
            `</div>` +
            `<div class="main__contents__message-date__message-info">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="main__contents__message-date__message-date">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
          `</div>` +
        `</div>`
      } else if (message.image) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="main__contents__message-date__message-tolker">` +
              message.user_name +
            `</div>` +
            `<div class="main__contents__message-date__message-info">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<img src="` + message.image + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      };
      return html;
    };

$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){

    var html = buildHTML(data);
    $('.main__contents').append(html);
    $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
    $("#new_message")[0].reset();
   
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
   })
   .always(function() {
    $(".main__footer__send").prop("disabled", false);
   })
})


var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $('.message:last').data("message-id");
  console.log(last_message_id)
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: "api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
    var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    //メッセージが入ったHTMLに、入れ物ごと追加
    $('.main__contents').append(insertHTML);
    $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
    $("#new_message")[0].reset();
    $(".main__footer__send").prop("disabled", false);


    }
  })
    

    .fail(function() {
      console.log('error');
  });

  
}
//$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}
});


