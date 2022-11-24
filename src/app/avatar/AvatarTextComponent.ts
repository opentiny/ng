import { Component } from '@angular/core';

@Component({
  templateUrl: './avatar-text.html'
})
export class AvatarTextComponent {
  txt:string =  this.trimSpace('Taylor Swift');
  /**
   * 取字符串首字母
   * @param text
   * @returns
   */
  trimSpace(text):string{
    let  res:string = text[0];
    for(let i = 0; i<text.length; i++){
        if(text[i] === ' ' && i !== text.length - 1){
            res = res.concat(text[i+1]);
        }
    }
    return res
  }
}
