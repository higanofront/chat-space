$(function(){ 
    var buildHTML = function(message) {
      if (message.content && message.image) {
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
  last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
    var insertHTML = '';
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    $('.main__contents').append(insertHTML);
    $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
    $("#new_message")[0].reset();
    $(".main__footer__send").prop("disabled", false);
    }
  })
    .fail(function() {
  });
}
// if (document.location.href.match(/\/groups\/\d+\/messages/)) {
//   setInterval(reloadMessages, 7000);
// }
});


