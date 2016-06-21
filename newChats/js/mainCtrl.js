angular.module("myChats").controller("mainCtrl", function($scope, mainSrvc){
  $scope.test = "Test all the things!!!";

  $scope.addChat = function(chatmessage){
    mainSrvc.addChats(chatmessage).then(function(){
      getData();
      $scope.newChat.message = "";
    });
  }

  function getData(){
    mainSrvc.getChats().then(function(response){
      $scope.chats = response;
    });
  }

  $scope.deleteChats = function(){
    mainSrvc.deleteChats().then(function(){
      getData();
    });

  }

  getData();
})
