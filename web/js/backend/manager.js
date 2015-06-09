/**
 * Created by user on 2015/6/9.
 */
function MyController($scope, $http) {
    $scope.bulletinList = [];
    $scope.editIndex = -1;
    $scope.account = "";
    $scope.password = "";
    $scope.logged = false;
    $scope.changeEditIndex = function (index) {
        if($scope.editIndex!=-1){
            $scope.bulletinList[$scope.editIndex].editing = false;
        }else{
            if($scope.bulletinList[$scope.bulletinList.length-1].editing){
                $scope.bulletinList.pop();
            }
        }
        $scope.editIndex = index;
    };

    $scope.bulletinAdd = function () {
        $scope.changeEditIndex(-1);
        $scope.bulletinList.push({editing:true});
        $scope.editingAction = CONFIG.ADD_ACTION;
    };

    $scope.update = function (index) {
        $scope.changeEditIndex(index);
        $scope.bulletinList[index].editing = true;
        $scope.editingAction = CONFIG.UPDATE_ACTION;
    };

    $scope.remove = function (index) {
        if(confirm("確認刪除此筆資料?")){
            $scope.editingAction = CONFIG.REMOVE_ACTION;
            $scope.save(index);
        }
    };

    $scope.save = function (index) {
        var bulletin = $scope.bulletinList[index];
        console.log(bulletin);
        if(typeof bulletin.title === typeof undefined || bulletin.title==""){
            alert("請輸入title");
        }else if(typeof bulletin.content === typeof undefined || bulletin.content==""){
            alert("請輸入content");
        }else{
            $scope.sendBulletin($scope.editingAction, JSON.stringify($scope.bulletinList[index]));
        }
    };

    $scope.cancel = function (index) {
        $scope.getList();
    };

    $scope.getList = function () {
        var sendData = {};
        sendData.action = CONFIG.LIST_ACTION;
        $http({
            method: "POST",
            url: CONFIG.BULLETIN_ACTION_URL,
            params: sendData
        }).success(function (data, status, headers, config) {
            console.log(data);
            if(data.success){
                $scope.bulletinList = JSON.parse(data.data);
            }else{
                alert(data.msg);
            }

        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    $scope.sendBulletin = function (action, bulletin) {
        var sendData = {};
        sendData.action = action;
        sendData.data = bulletin;
        $http({
            method: "POST",
            url: CONFIG.BULLETIN_ACTION_URL,
            params: sendData
        }).success(function (data, status, headers, config) {
            if(data.success){
                $scope.getList();
            }else{
                alert(data.msg);
            }
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

    $scope.login = function () {
        if($scope.account==""){
            alert("請輸入帳號");
        }else if($scope.password==""){
            alert("請輸入密碼");
        }else{
            var sendData = {};
            sendData.action = CONFIG.LOGIN_ACTION;
            sendData.data = {account:$scope.account,password:$scope.password};
            $http({
                method: "POST",
                url: CONFIG.BULLETIN_ACTION_URL,
                params: sendData
            }).success(function (data, status, headers, config) {
                if(data.success){
                    $scope.getList();
                    $scope.logged = true;
                }else{
                    alert("登入失敗");
                }
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    };
}