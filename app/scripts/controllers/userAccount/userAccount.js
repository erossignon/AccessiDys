/* File: userAccount.js
 *
 * Copyright (c) 2013-2016
 * Centre National d’Enseignement à Distance (Cned), Boulevard Nicephore Niepce, 86360 CHASSENEUIL-DU-POITOU, France
 * (direction-innovation@cned.fr)
 *
 * GNU Affero General Public License (AGPL) version 3.0 or later version
 *
 * This file is part of a program which is free software: you can
 * redistribute it and/or modify it under the terms of the
 * GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 *
 */

'use strict';

angular.module('cnedApp').controller('UserAccountCtrl', function ($scope, $http, md5, configuration, $location, $rootScope, serviceCheck, ToasterService, UserService) {


    /*global $:false */
    $scope.oneAtATime = true;
    $scope.compte = {};
    $scope.infoModif = false;
    $scope.erreurModif = false;
    $scope.passwordIstheSame = null;
    $scope.affichage = false;
    $scope.modifierPasswordDisplay = false;

    $scope.initial = function () {
        $scope.passwordIstheSame = null;
        serviceCheck.getData()
            .then(function (result) {
                if (result.loged) {
                    if (result.dropboxWarning === false) {
                        $rootScope.dropboxWarning = false;
                        $scope.missingDropbox = false;
                        $rootScope.loged = true;
                        $rootScope.admin = result.admin;
                        if ($location.path() !== '/inscriptionContinue') {
                            $location.path('/inscriptionContinue');
                        }
                    } else {
                        $rootScope.loged = true;
                        $rootScope.admin = result.admin;
                        $scope.objet = result;
                        $scope.compte.email = result.user.local.email;
                        $scope.compte.nom = result.user.local.nom;
                        $scope.compte.password = result.user.local.password;
                        $scope.compte.prenom = result.user.local.prenom;
                        $scope.token = {
                            id: result.user.local.token
                        };
                    }
                }
            });
    };

    // this function updates the account
    $scope.modifierCompte = function () {
        $scope.addErrorField = [];
        $scope.affichage = false;

        if (typeof $scope.compte.nom === 'undefined') {
            $scope.addErrorField.push('Nom : Cette donnée est obligatoire. Merci de compléter le champ.');
            $scope.affichage = true;
        } else {
            if (!$scope.verifyString($scope.compte.nom)) {
                $scope.addErrorField.push('Nom : Le nom contient des caractères spéciaux non autorisé.');
                $scope.affichage = true;
            }
        }


        if (typeof $scope.compte.prenom === 'undefined') {
            $scope.addErrorField.push('Prénom : Cette donnée est obligatoire. Merci de compléter le champ.');
            $scope.affichage = true;
        } else {
            if (!$scope.verifyString($scope.compte.prenom)) {
                $scope.addErrorField.push('Prénom : Le prénom contient des caractères spéciaux non autorisé.');
                $scope.affichage = true;
            }
        }

        if ($scope.addErrorField.length === 0) {
            $scope.userAccount = {
                _id: $scope.objet.user._id,
                local: {
                    email: $scope.compte.email,
                    nom: $scope.compte.nom,
                    prenom: $scope.compte.prenom
                }
            };

            $http.post(configuration.URL_REQUEST + '/modifierInfosCompte', {
                id: localStorage.getItem('compteId'),
                userAccount: $scope.userAccount
            })
                .success(function (data) {
                    $scope.monObjet = data;
                    ToasterService.showToaster('#account-success-toaster', 'account.message.edit.ok');

                });
        }


    };

    $scope.verifyString = function (chaine) {
        var ck_nomPrenom = /^[A-Za-z0-9éèàâîôç\-' ]{1,100}$/;
        if (chaine === null) {
            return false;
        }
        if (!ck_nomPrenom.test(chaine)) {
            return false;
        }
        return true;
    };


    $scope.verifyPassword = function (password) {
        var ck_password = /^[A-Za-z0-9éèàâîôç!@#$%^&*()_]{6,20}$/;

        if (!ck_password.test(password)) {
            return false;
        }
        return true;
    };

    $scope.editPassword = function(){
        UserService.openEditPasswordModal($scope.objet.user._id, $scope.token.id).then(function(){
            ToasterService.showToaster('#account-success-toaster', 'account.message.edit.ok');
        });
    };



});
