angular.module('myChatApp',[]).controller('challengeCtrl', function($scope, challengeSrvc){
  challengeSrvc.getChallenges().then(function(response){
      $scope.challenges = response;
      // response.sort(function(b,a){
      //   return b.order*1 - a.order*1
      // })
      // response.sort(function(b,a){
      //   return b.suborder*1 - a.suborder*1
      // })
      // response.sort(function(b,a){
      //   return b.superOrder*1 - a.superOrder*1
      // })

      $scope.reorder = function(block){
        block.forEach(function(item, index){
          item.suborder = index+1;
        })
      }
      $scope.getSuperBlockOrder = function(superBlock){
        var block = superBlock[Object.keys(superBlock)[0]];
        return block[0].superOrder;
      }

      $scope.orderFunction = function(item){
        console.log(item);
        return item;
      }

      $scope.getBlockOrder = function(block){
        return block[0].order;
      }

      $scope.setAllBlockName = function(fieldValue, block, field){
        block.forEach(function(item){
          item[field] = fieldValue;
          item.dirty = true;
        })
      }

      $scope.save = function(){
        console.log($scope.grouped);
        for (var superBlockName in $scope.grouped){
          for (var blockName in $scope.grouped[superBlockName]){
            for (var i=0;i<$scope.grouped[superBlockName][blockName].length;i++){
              var challenge = $scope.grouped[superBlockName][blockName][i];
              if (challenge.dirty){
                console.log(challenge);
                delete challenge.dirty;
                challengeSrvc.updateChallenge(challenge);
              }
            }
          }
        }
      }

      $scope.setAllSuperBlockName = function(fieldValue, superBlock, field){
        for (blockName in superBlock){
          superBlock[blockName].forEach(function(item){
            item[field] = fieldValue;
            item.dirty = true;
          })
        }
        console.log($scope.grouped);
      }

      $scope.grouped = response.reduce(function(prev, cur){
        if (!prev[cur.superBlock]){
          //prev[cur.superBlock] = {order:cur.superOrder};
          prev[cur.superBlock] = {};
        }
        if(!prev[cur.superBlock][cur.block]){
          prev[cur.superBlock][cur.block] = [];
        }
        prev[cur.superBlock][cur.block].push( cur);
        return prev;
      },{});

      console.log($scope.grouped);

      $scope.blockSort = function(x){
        return x[Object.keys(x)[0]][0].order
      }
  });
})
.service('challengeSrvc',function($http){
  this.getChallenges = function(){
    return $http.get('/admin/challenges').then(function(res){
      console.log(res);
      return res.data
    }, function(err){});
  };

  this.updateChallenge = function(challenge){
    console.log(challenge);
    return $http.put('/admin/challenges', challenge).then(function(res){
      console.log(res);
      return res.data;
    }, function(err){});
  }
})

function bubbleSort(arry){

}
