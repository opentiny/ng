import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './AppComponent';
import { IndexComponent } from './IndexComponent';
import { ButtonTestModule } from './button/ButtonTestModule';

@NgModule({
  imports: [
    ButtonTestModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(
      [
        { path: '', component: IndexComponent }, // 路由地址为空
        { path: '**', component: IndexComponent } // 路由地址找不到。注意：放在数组最后
      ],
      { useHash: true } // 使用#路由
    )
  ],
  declarations: [AppComponent, IndexComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
