/* Owl Phone Gallery v0.0.1 alpha | VNBStudio.ru */

function OPG(option){
  this.images = null;
  this.init(option);
}

OPG.prototype.init = function(option){
  var self = this;
  this.images = option.images;
  this.build(option.container,function(){
    self.start(option.images);
    self.bindMarks();
    self.keyBind();
  });
};

OPG.prototype.build = function(container,callback){
  var hiddenEl = $('<div/>',{
    'id':"OPG-hiddenEl"
  });
  var markjEl = $('<div/>',{
    'id':'OPG-mark',
  });
  var containerjEl = $('<div/>',{
    'id':'OPG-container',
  });
  var imgContainer = $('<div/>',{
    'id':'OPG-img-container',
  });
  var btnLeft = $('<div/>',{
    'id':'OPG-img-left',
  });
  var show = $('<div/>',{
    'id':'OPG-img-show',
  });
  var btnRight = $('<div/>',{
    'id':'OPG-img-right',
  });
  if(this.images.length>1){
    imgContainer.append(btnLeft).append(show).append(btnRight);
  } else {
    imgContainer.append(show);
  }
  containerjEl.append(imgContainer);
  $(container).append(hiddenEl);
  $(container).append(containerjEl);
  $(container).append(markjEl);
  callback();
};

OPG.prototype.start = function(images){
  var self = this;
  for (var i in images){
    $('#OPG-hiddenEl').append($('<img/>',{
      'src':'img/'+images[i]+'',
      'OPG-data-num':i,
    }));
    $('#OPG-mark').append($('<span/>',{
      'class':'OPG-markDot',
      'OPG-dataMark-num':i,
    }));
  }
  $('#OPG-img-show').css({'background-image':'url("img/'+images[0]+'")','opacity':1}).attr('OPG-data',0);
  $('#OPG-mark .OPG-markDot[OPG-dataMark-num="0"]').addClass('fill');
  if(this.images.length>1){
    this.bindNext(1);
    this.bindPrev(this.images.length-1);
  }
  setTimeout(function(){
      self.checkOrientation(0);
  },20);

};

OPG.prototype.bindNext = function(num){
  var self = this;
  $('#OPG-img-right').unbind('click');
  $('#OPG-img-right').click(function(){
    self.checkOrientation(num);
    $('#OPG-img-show').css({'opacity':0,'background-image':'url("img/'+self.images[num]+'")'}).attr('OPG-data',num).animate({'opacity':1},300);
    $('#OPG-mark .OPG-markDot').removeClass('fill');
    $('#OPG-mark .OPG-markDot[OPG-dataMark-num="'+num+'"]').addClass('fill');
    self.calcStep();
  });
};

OPG.prototype.bindPrev = function(num){
    var self = this;
    $('#OPG-img-left').unbind('click');
    $('#OPG-img-left').click(function(){

      self.checkOrientation(num);
      $('#OPG-img-show').css({'opacity':0,'background-image':'url("img/'+self.images[num]+'")'}).attr('OPG-data',num).animate({'opacity':1},300);
      $('#OPG-mark .OPG-markDot').removeClass('fill');
      $('#OPG-mark .OPG-markDot[OPG-dataMark-num="'+num+'"]').addClass('fill');
      self.calcStep();
    });
};

OPG.prototype.calcStep = function(){
    var num = $('#OPG-img-show').attr('OPG-data');
    if((+num+1)==this.images.length){
      this.bindNext(0);
      this.bindPrev(this.images.length-2);
    } else if(parseInt(num)===0){
      this.bindNext(+num+1);
      this.bindPrev(this.images.length-1);
    } else {
      this.bindNext(+num+1);
      this.bindPrev(num-1);
    }
};

OPG.prototype.checkOrientation = function(num){
 var el = $('#OPG-hiddenEl img[opg-data-num="'+num+'"]');
  var width = el[0].naturalWidth;
  var height = el[0].naturalHeight;
  if(height>width) {
    $('#OPG-container').removeClass('rotate');
  } else {
    $('#OPG-container').addClass('rotate');
  }
};

OPG.prototype.bindMarks = function(){
  var self = this;
  $('#OPG-mark .OPG-markDot').bind('click',function(){
    var num =$(this).attr('opg-datamark-num');
    self.checkOrientation(num);
    $('#OPG-img-show').css({'opacity':0,'background-image':'url("img/'+self.images[num]+'")'}).attr('OPG-data',num).animate({'opacity':1},300);
    $('#OPG-mark .OPG-markDot').removeClass('fill');
    $('#OPG-mark .OPG-markDot[OPG-dataMark-num="'+num+'"]').addClass('fill');
    self.calcStep();
  });
};
OPG.prototype.keyBind = function(){
  $(document).keyup(function(e){
    if(e.keyCode==39){
      $('#OPG-img-right').click();
    }
    if(e.keyCode==37) {
      $('#OPG-img-left').click();
    }
  });
};
$(document).ready(function(){
  var options = {
    'container':'#screen',
    'images':['test1.png','test2.png','test3.png','test4.png','test5.png','test6.png','test7.png','test8.png'],
  };
  new OPG(options);
});
