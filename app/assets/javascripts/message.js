$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="main__contents__message-date__message-tolker">
             ${message.user_name}
           </div>
           <div class="main__contents__message-date__message-info">
             ${message.created_at}
           </div>
         </div>
         <div class="main__contents__message-date__message-date">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="main__contents__message-date__message-tolker">
             ${message.user_name}
           </div>
           <div class="main__contents__message-date__message-info">
             ${message.created_at}
           </div>
         </div>
         <div class="main__contents__message-date__message-date">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
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
    $('form')[0].reset();
    $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight}, 200);
    $('.form__submit').prop('disabled', false); 
  })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
     });
  
})
});
