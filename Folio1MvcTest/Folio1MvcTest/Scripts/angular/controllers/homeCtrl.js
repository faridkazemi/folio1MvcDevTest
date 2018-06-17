(function () {
	angular.module('app').controller('homeCtrl', ['$scope', 'DTOptionsBuilder', 'classService', '$uibModal','$window',
		function ($scope, DTOptionsBuilder, classService, $modal,$window) {
			$scope.DataStatus = 'Loading';
			$scope.dtOptions = DTOptionsBuilder.newOptions()
				.withOption('order', [1, 'asc']);

			$scope.SetSelectedClass = setSelectedClass;
			$scope.AddNewClass = addNewClass;
			$scope.Save = save;
			$scope.Cancel = cancel;
			$scope.UpdateClass = updateClass;
			$scope.DeleteCLass = deleteClass;

			getClasses();
		//----------------------  Implementation  ---------------------
		function getClasses() {

			classService.getClasses(function (data) {
				$scope.model = data;
				$scope.DataStatus = "Loaded";
			});
			}

			function setSelectedClass(selectedClass) {

				$scope.selectedClass = selectedClass;
			}
			function addNewClass() {
				$scope.editingClass = {};

			    $scope.mdlInstance =	$modal.open({
					templateUrl: 'template/editClass.html', 
					backdrop: true, 
					windowClass: 'app-modal-window', 
					controller:  function ($scope) {
						$scope = $scope;
					},
				});//end of modal.open
			}
			function cancel() {
				$scope.$dismiss('cancel');
			}
			function save() {
				if (!$scope.editingClass.Id) {
					$scope.DataStatus = 'Loading';
					$scope.editingClass = {
						Id: 0,
						Name: $scope.editingClass.Name,
						LocationId: $scope.editingClass.Location.Id,
						TeacherId: $scope.editingClass.Teacher.Id,
						Location: null,
						Teacher: null,
						Students: null
					};

					classService.save($scope.editingClass, function (data) {
						$scope.$dismiss('cancel');
						$scope.DataStatus = 'Loaded';
						location.reload();

					});
				}
				else {
					$scope.DataStatus = 'Loading';
					classService.update($scope.editingClass, function (data) {
						$scope.$dismiss('cancel');
						$scope.DataStatus = 'Loaded';
						location.reload();

					});
				}

			}

			function updateClass(selectedClass) {
				$scope.editingClass = selectedClass;

				$scope.mdlInstance = $modal.open({
					templateUrl: 'template/editClass.html',
					backdrop: true,
					windowClass: 'app-modal-window',
					controller: function ($scope) {
						$scope = $scope;
					},
				});//end of modal.open
			}

			function deleteClass (selectedClass){
				classService.delete(selectedClass.Id, function () {
					location.reload();
					//	sweetAlert({
					//	title: "Done!",
					//	text: "The new Class has been created successfully",
					//	type: "success"
					//});
				});
			}


	}]);
})();