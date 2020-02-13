var A = A || {};

$(document).ready(function () {
    veteransviewModel = (function(){
        var veteransviewModel = function(initDate){
            var self = this;

            self.boxCount = ko.observable(0); /*掘る箱の数*/
            self.veterans = ko.observable(0); /*必要な戦果枚数*/
            self.nowBox = ko.observable(1); /*現在の箱*/
            self.nowVeterans = ko.observable(0); /*現在の戦果枚数*/
            self.hellCheck = ko.observable(true); /*hellを殴るかどうか*/

            self.extreme = ko.observable(); /*EXの数*/
            self.highlevel = ko.observable(); /*HLの数*/
            self.extremeTriger = ko.observable(); /*EX殴るときに必要なトリガー数*/
            self.highlevelTriger = ko.observable(); /*HL殴るときに必要なトリガー数*/
            self.veryhardEX = ko.observable(); /*EX用のトリガー集めに必要なVHの数*/
            self.veryhardHL = ko.observable(); /*HL用のトリガー集めに必要なVHの数*/
            self.hellEX = ko.observable(); /*EXメインで殴ってる時に出現するhellの数*/
            self.hellHL = ko.observable(); /*HLメインで殴ってる時に出現するhellの数*/
        }

    veteransviewModel.prototype.checkVeterans = function(){
      var self = this;

      var needSumVeterans = 0;
      var haveSumVeterans = 0;
      var box = parseInt(self.boxCount());
      var nowBox = parseInt(self.nowBox()) - 1;

      if(box === 1){
          needSumVeterans = 1206;
      }else if(box === 2){
        needSumVeterans = 1206 + 1606;
      }else if(box === 3){
        needSumVeterans = 1206 + 1606 + 2006;
      }else if(box >= 4){
        needSumVeterans = 4818;
        for(var i = 0; i < box - 3; i++){
          needSumVeterans = needSumVeterans + 2118;
        }
      }

      if(nowBox === 1){
          haveSumVeterans = 1206;
      }else if(nowBox === 2){
        haveSumVeterans = 1206 + 1606;
      }else if(nowBox === 3){
        haveSumVeterans = 1206 + 1606 + 2006;
      }else if(nowBox >= 4){
        haveSumVeterans = 4818;
        for(var i = 0; i < nowBox - 3; i++){
          haveSumVeterans = haveSumVeterans + 2118;
        }
      }

      haveSumVeterans = haveSumVeterans + parseInt(self.nowVeterans());
      needSumVeterans = needSumVeterans - haveSumVeterans;

      vhVaterens = 23;
      vhTriger = 1.8;
      vhHellProbability = 0.05;
      exVaterens = 48;
      exNeedTriger = 3;
      exHellProbability = 0.338;
      hlVaterens = 96;
      hlNeedTriger = 5;
      hlHellProbability = 0.374;
      hellVaterens = 100;

      vhGetVaterens = exVaterens + (exNeedTriger / vhTriger * vhVaterens) + (hellVaterens * exHellProbability) + (exNeedTriger / vhTriger * hellVaterens * vhHellProbability);
      hlGetVaterens = hlVaterens + (hlNeedTriger / vhTriger * vhVaterens) + (hellVaterens * hlHellProbability) + (hlNeedTriger / vhTriger * hellVaterens * vhHellProbability);


      if(self.hellCheck() === true){
        self.extreme(Math.ceil(needSumVeterans / vhGetVaterens));
        self.veryhardEX(Math.ceil(self.extreme() * (exNeedTriger / vhTriger)));
        self.extremeTriger(self.extreme() * exNeedTriger);
        self.highlevel(Math.ceil(needSumVeterans / hlGetVaterens));
        self.veryhardHL(Math.ceil(self.highlevel() * (hlNeedTriger / vhTriger)));
        self.highlevelTriger(Math.ceil(self.highlevel() * hlNeedTriger));
        self.hellEX(Math.ceil(self.extreme() * exHellProbability + self.veryhardEX() * vhHellProbability));
        self.hellHL(Math.ceil(self.veryhardHL() * vhHellProbability + self.highlevel() * hlHellProbability));
      }else{
        self.extreme(Math.ceil(needSumVeterans / 82.5));
        self.veryhardEX(Math.ceil(self.extreme() * 1.5));
        self.extremeTriger(self.extreme() * 3);
        self.highlevel(Math.ceil(needSumVeterans / 153.5));
        self.veryhardHL(Math.ceil(self.highlevel() * 2.5));
        self.highlevelTriger(Math.ceil(self.highlevel() * 5));
        self.hellEX(0);
        self.hellHL(0);
      }

      self.veterans(needSumVeterans);
    }

    return veteransviewModel;
  }());
}());
