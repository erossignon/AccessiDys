/* File: passport.js
 *
 * Copyright (c) 2014
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

describe('Controller: passportContinueCtrl', function() {
  var $scope, controller;

  beforeEach(module('cnedApp'));

  beforeEach(inject(function($controller, $rootScope, $httpBackend, configuration) {
    $scope = $rootScope.$new();
    controller = $controller('passportContinueCtrl', {
      $scope: $scope
    });

    localStorage.setItem('compteId', '533abde21ca6364c2cc5e0fb');

    $scope.dataRecu = {
      loged: true,
      dropboxWarning: true,
      user: {
        __v: 0,
        _id: '5329acd20c5ebdb429b2ec66',
        dropbox: {
          accessToken: 'PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn',
          country: 'MA',
          display_name: 'youbi anas',
          emails: 'anasyoubi@gmail.com',
          referral_link: 'https://db.tt/wW61wr2c',
          uid: '264998156'
        },
        local: {
          email: 'anasyoubi@gmail.com',
          nom: 'youbi',
          password: '$2a$08$xo/zX2ZRZL8g0EnGcuTSYu8D5c58hFFVXymf.mR.UwlnCPp/zpq3S',
          prenom: 'anas',
          role: 'admin'
        }
      },
      __v: 0,
      _id: '5329acd20c5ebdb429b2ec66',
      dropbox: {
        accessToken: 'PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn',
        country: 'MA',
        display_name: 'youbi anas',
        emails: 'anasyoubi@gmail.com',
        referral_link: 'https://db.tt/wW61wr2c',
        uid: '264998156'
      },
      local: {
        email: 'anasyoubi@gmail.com',
        nom: 'youbi',
        password: '$2a$08$xo/zX2ZRZL8g0EnGcuTSYu8D5c58hFFVXymf.mR.UwlnCPp/zpq3S',
        prenom: 'anas',
        role: 'admin'
      }
    };

    $scope.dropboxHtmlSearch = [{
      "revision": 919,
      "rev": "39721729c92",
      "thumb_exists": false,
      "bytes": 121273,
      "modified": "Tue, 01 Apr 2014 08:47:13 +0000",
      "client_mtime": "Tue, 01 Apr 2014 08:47:13 +0000",
      "path": "/manifestPresent.html",
      "is_dir": false,
      "icon": "page_white_code",
      "root": "dropbox",
      "mime_type": "text/html",
      "size": "118.4 KB"
    }, {
      "revision": 924,
      "rev": "39c21729c92",
      "thumb_exists": false,
      "bytes": 17344,
      "modified": "Tue, 01 Apr 2014 08:52:08 +0000",
      "client_mtime": "Tue, 01 Apr 2014 08:52:09 +0000",
      "path": "/test.html",
      "is_dir": false,
      "icon": "page_white_code",
      "root": "dropbox",
      "mime_type": "text/html",
      "size": "16.9 KB"
    }];

    $scope.shareLink = {
      "url": "https://www.dropbox.com/s/ee44iev4pgw0avb/test.html",
      "expires": "Tue, 01 Jan 2030 00:00:00 +0000"
    };

    $scope.indexPage = '<html class="no-js" lang="fr" manifest=""> <!--<![endif]--><head></head><body></body></html>';

    $scope.appcache = "CACHE MANIFEST # 2010-06-18:v2 # Explicitly cached 'master entries'. CACHE: http://dl.dropboxusercontent.com/s/ee44iev4pgw0avb/test.html # Resources that require the user to be online. NETWORK: * ";
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/profile').respond($scope.dataRecu);
    $httpBackend.whenGET(configuration.URL_REQUEST + '/profile').respond($scope.dataRecu);
    $httpBackend.whenPOST('https://api.dropbox.com/1/search/?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn&query=.html&root=sandbox').respond($scope.dropboxHtmlSearch);
    $httpBackend.whenGET(configuration.URL_REQUEST + '/listDocument.appcache').respond($scope.appcache);
    $httpBackend.whenGET(configuration.URL_REQUEST + '/index.html').respond($scope.indexPage);
    $httpBackend.whenPUT('https://api-content.dropbox.com/1/files_put/sandbox/listDocument.appcache?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond($scope.dropboxHtmlSearch);
    $httpBackend.whenPOST('https://api.dropbox.com/1/shares/?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn&path=listDocument.appcache&root=sandbox&short_url=false').respond($scope.shareLink);
    $httpBackend.whenPUT('https://api-content.dropbox.com/1/files_put/sandbox/test.html?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond($scope.dropboxHtmlSearch);


  }));

  it('passportContinueCtrl:init ', inject(function($httpBackend) {
    $scope.init();
    expect($scope.inscriptionStep1).toBe(false);
    expect($scope.inscriptionStep2).toBe(true);
    expect($scope.inscriptionStep3).toBe(false);
    expect($scope.showStep2part2).toBe(false);
    expect($scope.step2).toBe('btn btn-primary btn-circle');
    expect($scope.step1).toBe('btn btn-default btn-circle');
    $httpBackend.flush();
  }));
  it('passportContinueCtrl:toStep3 ', inject(function() {
    $scope.toStep3();
    expect($scope.step3).toBe('btn btn-primary btn-circle');
    expect($scope.step2).toBe('btn btn-default btn-circle');
    expect($scope.showlogin).toBe(false);
    expect($scope.inscriptionStep1).toBe(false);
    expect($scope.inscriptionStep2).toBe(false);
    expect($scope.inscriptionStep3).toBe(true);
  }));
  it('passportContinueCtrl:toStep3 ', inject(function() {
    $scope.toStep4();
    expect($scope.step4).toBe('btn btn-primary btn-circle');
    expect($scope.step3).toBe('btn btn-default btn-circle');
    expect($scope.showlogin).toBe(false);
    expect($scope.inscriptionStep1).toBe(false);
    expect($scope.inscriptionStep2).toBe(false);
    expect($scope.inscriptionStep3).toBe(false);
    expect($scope.inscriptionStep4).toBe(true);
  }));
});